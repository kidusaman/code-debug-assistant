// pages/api/debug.js
import { PrismaClient } from '@prisma/client';
import { ESLint } from 'eslint';

const prisma = new PrismaClient();

async function analyzeCode(code) {
  // Create an ESLint instance with auto-fix enabled.
  const eslint = new ESLint({
    useEslintrc: false,
    baseConfig: {
      parserOptions: { ecmaVersion: 2021, sourceType: 'module' },
      env: { es6: true, node: true },
      extends: 'eslint:recommended',
    },
    fix: true, // Enable auto-fix feature.
  });

  // Lint the provided code.
  const results = await eslint.lintText(code);
  const messages = results[0].messages;

  // Use the auto-fixed code if available; fallback to original code.
  const fixedCode = results[0].output || code;

  // Map ESLint messages to an errors array.
  const errors = messages.map(
    (msg) => `Line ${msg.line}: ${msg.message} (${msg.ruleId})`
  );

  return {
    errors,
    fix: fixedCode,
    explanation:
      errors.length > 0
        ? 'ESLint detected issues and applied auto-fixes where possible.'
        : 'No issues detected by ESLint.',
  };
}

/**
 * @openapi
 * /api/debug:
 *   post:
 *     summary: Debug a code snippet
 *     description: Accepts a code snippet, performs analysis to detect common errors, suggests fixes, and explains the solution.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 example: "console.log('hello');"
 *     responses:
 *       200:
 *         description: Analysis result containing any errors, a suggested fix, and an explanation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errors:
 *                   type: array
 *                   items:
 *                     type: string
 *                 fix:
 *                   type: string
 *                 explanation:
 *                   type: string
 *       400:
 *         description: Bad Request – code snippet not provided.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }

  const { code } = req.body;
  if (!code || typeof code !== 'string') {
    return res.status(400).json({ message: "Invalid input: code must be a string." });
  }

  // Perform the ESLint-based analysis with auto-fix.
  const analysis = await analyzeCode(code);

  // Save the debugging query and result to the database.
  try {
    await prisma.debugQuery.create({
      data: {
        code,
        result: JSON.stringify(analysis),
      },
    });
  } catch (error) {
    console.error("Error saving to database:", error);
  }

  return res.status(200).json(analysis);
}

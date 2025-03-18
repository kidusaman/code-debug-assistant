# Code Debug Assistant

A full-stack Next.js application that helps you debug your code by analyzing it with ESLint. This project demonstrates integration between a rich code editor, ESLint-based code analysis, a Node.js API, and Prisma for data persistence.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [License](#license)

## Features

- **Code Analysis:** Uses ESLint to detect errors and auto-fix code issues.
- **Rich Code Editor:** Integrates CodeMirror for syntax highlighting, line numbers, and a better editing experience.
- **API Endpoint:** A Next.js API route that handles code debugging and logs requests using Prisma.
- **Database Integration:** Stores debugging queries and results in a SQLite database via Prisma.
- **Easy Deployment:** Ready for deployment on platforms like Vercel.

## Installation

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/kidusaman/code-debug-assistant.git
   cd code-debug-assistant
2. **Install Dependencies:**
   Use the legacy peer dependency flag to resolve dependency conflicts:

    ```bash
    npm install --legacy-peer-deps
3. **Set Up Environment Variables:**
   If necessary, create a .env file for environment-specific configurations (e.g., database URL). For this project, no extra variables are required by default.
4. **Run the Development Server:**

       ```bash
       npm run dev
   Open http://localhost:3000 in your browser.
## Usage
1. **Paste Your Code:**
On the homepage, paste or type your code into the rich CodeMirror editor.
2. **Analyze Code:**
Click the "Analyze Code" button. The app will send your code to the /api/debug endpoint, which uses ESLint to analyze the code.
3. **Review Results:**
View the list of ESLint errors, auto-fixed code, and a brief explanation of the analysis below the editor.
## Project Structure
code-debug-assistant/
├── pages/
│   ├── index.js         # Frontend UI with CodeMirror integration
│   └── api/
│       └── debug.js     # API endpoint for code analysis
├── prisma/
│   ├── dev.db           # SQLite database file
│   └── schema.prisma    # Prisma schema
├── .npmrc               # Configures npm to use legacy-peer-deps
├── package.json         # Project dependencies and scripts
└── next.config.js       # Next.js configuration

## Deployment

1. **This project can be easily deployed to Vercel:**
2. **Push your code to GitHub.**
   - Import your repository on Vercel:
   - Sign in to Vercel.
   - Click "New Project" and select your GitHub repository.
Follow the prompts (Vercel will auto-detect the Next.js settings).
3. **Deploy:**
   - Vercel will build and deploy your project. A live URL will be provided upon successful deployment.


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

# TaskFlow - React Task Manager Application

A responsive React Task Manager application featuring full CRUD operations, category and status filtering, priority sorting, and automatic LocalStorage persistence.

## Features
- **Task CRUD Operations**: Create, read, inline-edit, toggle completion, and delete tasks.
- **React Hooks Architecture**: Built with `useState`, `useEffect`, and `useMemo`.
- **Smart Filtering & Sorting**: Filter by status (`All`, `Active`, `Completed`), category (`Work`, `Personal`, `Study`, `Urgent`), keyword search, and sort by Creation Date, Priority, or Due Date.
- **Data Persistence**: Automatically saves and loads tasks from browser `localStorage`.

## Project Structure
```text
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── TaskInput.js
│   │   ├── TaskItem.js
│   │   └── TaskList.js
│   ├── App.css
│   ├── App.js
│   └── index.js
├── package.json
└── README.md
```

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm start
   ```

3. **Build for production (Netlify / Vercel):**
   ```bash
   npm run build
   ```

import React, { useState, useEffect, useMemo } from 'react';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './App.css';

const STORAGE_KEY = 'taskflow_react_tasks_v1';

const INITIAL_TASKS = [
  {
    id: 'task-1',
    title: 'Initialize React project with Create React App',
    category: 'Study',
    priority: 'High',
    dueDate: '2026-11-10',
    completed: true,
    createdAt: 1730900000000
  },
  {
    id: 'task-2',
    title: 'Build modular TaskInput, TaskList, and TaskItem components',
    category: 'Work',
    priority: 'High',
    dueDate: '2026-11-12',
    completed: false,
    createdAt: 1730903600000
  },
  {
    id: 'task-3',
    title: 'Configure useEffect hook for LocalStorage persistence',
    category: 'Study',
    priority: 'Medium',
    dueDate: '2026-11-14',
    completed: false,
    createdAt: 1730907200000
  },
  {
    id: 'task-4',
    title: 'Deploy production build to Vercel or Netlify',
    category: 'Urgent',
    priority: 'High',
    dueDate: '2026-11-15',
    completed: false,
    createdAt: 1730910800000
  }
];

function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      return savedTasks ? JSON.parse(savedTasks) : INITIAL_TASKS;
    } catch (error) {
      console.error('Error loading tasks from LocalStorage:', error);
      return INITIAL_TASKS;
    }
  });

  const [statusFilter, setStatusFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');

  // Sync tasks state with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks to LocalStorage:', error);
    }
  }, [tasks]);

  // CRUD Operations
  const addTask = (newTaskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      ...newTaskData,
      completed: false,
      createdAt: Date.now()
    };
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const editTask = (id, updatedFields) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, ...updatedFields } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const clearCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Filtered and Sorted Tasks
  const filteredAndSortedTasks = useMemo(() => {
    const priorityWeight = { High: 3, Medium: 2, Low: 1 };

    return tasks
      .filter((task) => {
        if (statusFilter === 'Active' && task.completed) return false;
        if (statusFilter === 'Completed' && !task.completed) return false;
        if (categoryFilter !== 'All' && task.category !== categoryFilter) return false;
        if (
          searchQuery.trim() !== '' &&
          !task.title.toLowerCase().includes(searchQuery.toLowerCase())
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'priority') {
          return priorityWeight[b.priority] - priorityWeight[a.priority];
        }
        if (sortBy === 'dueDate') {
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate) - new Date(b.dueDate);
        }
        return b.createdAt - a.createdAt;
      });
  }, [tasks, statusFilter, categoryFilter, sortBy, searchQuery]);

  // Task Statistics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, active, rate };
  }, [tasks]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="brand">
          <span className="brand-badge">REACT HOOKS + LOCALSTORAGE</span>
          <h1>TaskFlow Manager</h1>
          <p>Organize, prioritize, and track your daily tasks seamlessly.</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Total</span>
            <strong className="stat-value">{stats.total}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Active</span>
            <strong className="stat-value text-cyan">{stats.active}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Done</span>
            <strong className="stat-value text-emerald">{stats.completed}</strong>
          </div>
          <div className="stat-card">
            <span className="stat-label">Progress</span>
            <strong className="stat-value text-rose">{stats.rate}%</strong>
          </div>
        </div>
      </header>

      <main className="app-main">
        <TaskInput onAddTask={addTask} />

        <section className="controls-bar">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search tasks by keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <div className="status-tabs">
              {['All', 'Active', 'Completed'].map((status) => (
                <button
                  key={status}
                  type="button"
                  className={`tab-btn ${statusFilter === status ? 'active' : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status}
                </button>
              ))}
            </div>

            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              aria-label="Filter by category"
            >
              <option value="All">All Categories</option>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Urgent">Urgent</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort tasks"
            >
              <option value="newest">Sort: Newest First</option>
              <option value="priority">Sort: Highest Priority</option>
              <option value="dueDate">Sort: Due Date</option>
            </select>
          </div>
        </section>

        <TaskList
          tasks={filteredAndSortedTasks}
          onToggleTask={toggleTask}
          onEditTask={editTask}
          onDeleteTask={deleteTask}
          onClearCompleted={clearCompleted}
          completedCount={stats.completed}
        />
      </main>
    </div>
  );
}

export default App;

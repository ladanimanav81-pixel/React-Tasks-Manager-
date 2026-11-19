import React, { useState } from 'react';

function TaskInput({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Work');
  const [priority, setPriority] = useState('Medium');
  const [dueDate, setDueDate] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setError('Please enter a task description.');
      return;
    }

    onAddTask({
      title: title.trim(),
      category,
      priority,
      dueDate: dueDate || new Date().toISOString().split('T')[0]
    });

    setTitle('');
    setError('');
  };

  return (
    <form className="task-input-card" onSubmit={handleSubmit}>
      <div className="form-row-main">
        <input
          type="text"
          className="task-title-input"
          placeholder="What needs to be accomplished?"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (error) setError('');
          }}
        />
        <button type="submit" className="btn-primary">
          + Add Task
        </button>
      </div>

      {error && <p className="error-banner">{error}</p>}

      <div className="form-row-meta">
        <div className="field-item">
          <label>Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Study">Study</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        <div className="field-item">
          <label>Priority</label>
          <select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>

        <div className="field-item">
          <label>Due Date</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
      </div>
    </form>
  );
}

export default TaskInput;

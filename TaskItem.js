import React, { useState } from 'react';

function TaskItem({ task, onToggle, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editCategory, setEditCategory] = useState(task.category);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editDueDate, setEditDueDate] = useState(task.dueDate || '');

  const handleSave = () => {
    if (!editTitle.trim()) return;
    onEdit(task.id, {
      title: editTitle.trim(),
      category: editCategory,
      priority: editPriority,
      dueDate: editDueDate
    });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditTitle(task.title);
    setEditCategory(task.category);
    setEditPriority(task.priority);
    setEditDueDate(task.dueDate || '');
    setIsEditing(false);
  };

  return (
    <li className={`task-item ${task.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <div className="task-edit-mode">
          <input
            type="text"
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            autoFocus
          />
          <div className="edit-controls">
            <select
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Study">Study</option>
              <option value="Urgent">Urgent</option>
            </select>

            <select
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>

            <input
              type="date"
              value={editDueDate}
              onChange={(e) => setEditDueDate(e.target.value)}
            />

            <div className="edit-actions">
              <button type="button" className="btn-save" onClick={handleSave}>
                Save
              </button>
              <button type="button" className="btn-cancel" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="task-view-mode">
          <div className="task-left">
            <input
              type="checkbox"
              className="task-checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.id)}
            />
            <div className="task-info">
              <span className="task-title">{task.title}</span>
              <div className="task-badges">
                <span className={`badge category-${task.category.toLowerCase()}`}>
                  {task.category}
                </span>
                <span className={`badge priority-${task.priority.toLowerCase()}`}>
                  {task.priority} Priority
                </span>
                {task.dueDate && (
                  <span className="badge due-date">Due: {task.dueDate}</span>
                )}
              </div>
            </div>
          </div>

          <div className="task-actions">
            <button
              type="button"
              className="action-btn edit"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              type="button"
              className="action-btn delete"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </li>
  );
}

export default TaskItem;

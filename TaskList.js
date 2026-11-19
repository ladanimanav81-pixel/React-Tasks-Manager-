import React from 'react';
import TaskItem from './TaskItem';

function TaskList({
  tasks,
  onToggleTask,
  onEditTask,
  onDeleteTask,
  onClearCompleted,
  completedCount
}) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <h3>No matching tasks found</h3>
        <p>Add a new task above or adjust your active filters.</p>
      </div>
    );
  }

  return (
    <section className="task-list-section">
      <div className="task-list-header">
        <span>Showing {tasks.length} task(s)</span>
        {completedCount > 0 && (
          <button
            type="button"
            className="btn-clear"
            onClick={onClearCompleted}
          >
            Clear Completed ({completedCount})
          </button>
        )}
      </div>

      <ul className="task-list">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onEdit={onEditTask}
            onDelete={onDeleteTask}
          />
        ))}
      </ul>
    </section>
  );
}

export default TaskList;

import React from 'react'
import Task from './Task';

const Column = ({ column, tasks, onDragOver, onDrop, onDragStart, updateTask, deleteTask }) => {
  return (
    <div
      className="column"
      onDragOver={onDragOver}
      onDrop={(event) => onDrop(event, column.id)}
    >
      <div className="task-list">
        <div className='Todo-title'>{column.title}</div>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            columnId={column.id}
            onDragStart={onDragStart}
            updateTask={updateTask}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
};


export default Column

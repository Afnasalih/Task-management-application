import React, { useState} from 'react'

const Task = ({ task, columnId, onDragStart, updateTask, deleteTask }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [taskData, setTaskData] = useState({ ...task });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();

    const updatedTask = {
      ...task,
      ...taskData,
    };

    updateTask(updatedTask);
    setIsEditing(false);
  };

  return (
    <div className="task">
      {!isEditing ? (
        <>
          <div
            className="task-content"
            draggable
            onDragStart={(event) => onDragStart(event, task.id, columnId)}
          >
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p><strong>Priority:</strong> {task.priority}</p>
            <p><strong>Due Date:</strong> {task.dueDate}</p>
          </div>
          <div className="task-actions">
            <button className="edit-btn" onClick={() => setIsEditing(true)}>Edit</button>
            <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        </>
      ) : (
        <form onSubmit={handleEditSubmit} className="edit-form">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleInputChange}
            required
          />

          <label>Description:</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            required
          />

          <label>Priority:</label>
          <select
            name="priority"
            value={taskData.priority}
            onChange={handleInputChange}
            required
          >
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <div>
          <label>Due Date:</label>
          <input
            type="date"
            name="dueDate"
            value={taskData.dueDate}
            onChange={handleInputChange}
            required
          />
          </div>
          

          <div className='edit-class'>
          <button type="submit">Update Task</button>
          <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
          </div>

         
        </form>
      )}
    </div>
  );
};

export default Task
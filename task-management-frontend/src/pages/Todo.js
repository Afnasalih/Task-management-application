import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Todo.css';
import Column from '../components/Column';

const TaskManagement = () => {
  const [data, setData] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);
  const [sourceColumnId, setSourceColumnId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newTaskData, setNewTaskData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    dueDate: '',
  });
  const [formErrors, setFormErrors] = useState({
    title: '',
    priority: '',
    dueDate: '',
  });

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  if (!data) {
    return <div>Loading...</div>;
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTaskData({ ...newTaskData, [name]: value });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Reset errors
    setFormErrors({ title: '', priority: '', dueDate: '' });

    const errors = {};
    if (!newTaskData.title) {
      errors.title = 'Title is required';
    }
    if (!newTaskData.priority) {
      errors.priority = 'Priority is required';
    }
    if (!newTaskData.dueDate) {
      errors.dueDate = 'Due date is required';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Prevent submission if there are errors
    }

    const newTaskId = `task-${Object.keys(data.tasks).length + 1}`;
    
    const newTask = {
      id: newTaskId,
      title: newTaskData.title,
      description: newTaskData.description,
      priority: newTaskData.priority,
      dueDate: newTaskData.dueDate,
    };

    axios.post('http://localhost:5000/tasks', newTask)
      .then(response => {
        const newColumn = {
          ...data.columns['column-1'],
          taskIds: [...data.columns['column-1'].taskIds, newTaskId],
        };

        const newColumns = {
          ...data.columns,
          'column-1': newColumn,
        };

        const newData = {
          ...data,
          tasks: {
            ...data.tasks,
            [newTaskId]: newTask,
          },
          columns: newColumns,
        };

        setData(newData);
        setShowForm(false);
        setNewTaskData({
          title: '',
          description: '',
          priority: 'Medium',
          dueDate: '',
        });
      })
      .catch(error => console.error('Error adding task:', error));
  };

  const onDragStart = (event, taskId, columnId) => {
    setDraggedTask(taskId);
    setSourceColumnId(columnId);
    event.dataTransfer.effectAllowed = 'move';
  };

  const onDragOver = (event) => {
    event.preventDefault();
  };

  const onDrop = (event, destinationColumnId) => {
    event.preventDefault();

    const sourceColumn = data.columns[sourceColumnId];
    const destinationColumn = data.columns[destinationColumnId];

    const sourceTaskIds = Array.from(sourceColumn.taskIds);
    sourceTaskIds.splice(sourceTaskIds.indexOf(draggedTask), 1);

    const destinationTaskIds = Array.from(destinationColumn.taskIds);
    destinationTaskIds.push(draggedTask);

    const newColumns = {
      ...data.columns,
      [sourceColumnId]: { ...sourceColumn, taskIds: sourceTaskIds },
      [destinationColumnId]: { ...destinationColumn, taskIds: destinationTaskIds },
    };

    const newData = {
      ...data,
      columns: newColumns,
    };

    setData(newData);
    setDraggedTask(null);
    setSourceColumnId(null);
  };

  const updateTask = (updatedTask) => {
    axios.put(`http://localhost:5000/tasks/${updatedTask.id}`, updatedTask)
      .then(response => {
        const newData = {
          ...data,
          tasks: {
            ...data.tasks,
            [updatedTask.id]: updatedTask,
          },
        };

        setData(newData);
      })
      .catch(error => console.error('Error updating task:', error));
  };

  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      axios.delete(`http://localhost:5000/tasks/${taskId}`)
        .then(() => {
          const updatedTasks = { ...data.tasks };
          delete updatedTasks[taskId];

          const updatedColumns = { ...data.columns };
          Object.keys(updatedColumns).forEach((columnId) => {
            updatedColumns[columnId].taskIds = updatedColumns[columnId].taskIds.filter(id => id !== taskId);
          });

          const newData = {
            ...data,
            tasks: updatedTasks,
            columns: updatedColumns,
          };

          setData(newData);
        })
        .catch(error => console.error('Error deleting task:', error));
    }
  };

  return (
    <>
      <div className='Todo-content'>
        <button className="add-task-btn" onClick={() => setShowForm(true)}>Add Task</button>
        <div className="task-management">
          {showForm && (
            <div className="overlay">
              <div className="task-form-container">
                <form className="task-form" onSubmit={handleFormSubmit}>
                  <label>Title:</label>
                  <input
                    type="text"
                    name="title"
                    value={newTaskData.title}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.title && <span className="error">{formErrors.title}</span>}

                  <label>Description:</label>
                  <textarea
                    name="description"
                    value={newTaskData.description}
                    onChange={handleInputChange}
                    required
                  />

                  <label>Priority:</label>
                  <select
                    name="priority"
                    value={newTaskData.priority}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Priority</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  {formErrors.priority && <span className="error">{formErrors.priority}</span>}

                  <label>Due Date:</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={newTaskData.dueDate}
                    onChange={handleInputChange}
                    required
                  />
                  {formErrors.dueDate && <span className="error">{formErrors.dueDate}</span>}

                  <button type="submit">Add Task</button>
                  <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                </form>
              </div>
            </div>
          )}

          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            // Sort tasks by priority
            const sortedTasks = tasks.sort((a, b) => {
              const priorityOrder = { High: 1, Medium: 2, Low: 3 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            });

            return (
              <Column
                key={column.id}
                column={column}
                tasks={sortedTasks}
                onDragOver={onDragOver}
                onDrop={onDrop}
                onDragStart={onDragStart}
                updateTask={updateTask}
                deleteTask={deleteTask}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};




export default TaskManagement;






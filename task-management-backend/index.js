const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

const dataFilePath = './tasks.json';

const readData = () => {
  return JSON.parse(fs.readFileSync(dataFilePath, 'utf-8'));
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');
};

app.get('/tasks', (req, res) => {
  const data = readData();
  res.json(data);
});

app.post('/tasks', (req, res) => {
  const data = readData();
  const newTask = req.body;
  data.tasks[newTask.id] = newTask;
  data.columns['column-1'].taskIds.push(newTask.id);
  writeData(data);
  res.status(201).json(newTask);
});

app.put('/tasks/:taskId', (req, res) => {
  const data = readData();
  const taskId = req.params.taskId;
  const updatedTask = req.body;
  data.tasks[taskId] = updatedTask;
  writeData(data);
  res.json(updatedTask);
});

app.delete('/tasks/:taskId', (req, res) => {
  const data = readData();
  const taskId = req.params.taskId;
  delete data.tasks[taskId];
  Object.keys(data.columns).forEach((columnId) => {
    data.columns[columnId].taskIds = data.columns[columnId].taskIds.filter(id => id !== taskId);
  });
  writeData(data);
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const ProgressPieChart = ({ progress, status }) => {
  let fillColor = '#8884d8'; 

  
  if (status === 'Completed') {
    fillColor = '#4caf50'; 
  } else if (status === 'Delayed') {
    fillColor = '#ff9800'; 
  } else if (status === 'At Risk') {
    fillColor = '#f44336'; 
  }

  const data = [
    { name: 'Completed', value: progress, color: fillColor },
    { name: 'Remaining', value: 100 - progress, color: '#e0e0e0' },
  ];

  return (
    <PieChart width={50} height={50}>
      <Pie
        data={data}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius={10}
        outerRadius={20}
        fill="#8884d8"
        startAngle={90}
        endAngle={-270}
        
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
    </PieChart>
  );
};

const ProjectSummary = () => {
  const projects = [
    { name: 'Nelsa web development', manager: 'Om prakash sao', dueDate: 'May 25, 2023', status: 'Completed', progress: 100 },
    { name: 'Datascale AI app', manager: 'Neilsan mando', dueDate: 'Jun 20, 2023', status: 'Delayed', progress: 70 },
    { name: 'Scale app', manager: 'Antony', dueDate: 'July 20, 2023', status: 'At Risk', progress: 36 },
    { name: 'Media Branding', manager: 'Priya', dueDate: 'April 20, 2023', status: 'Completed', progress: 100 },
   
  ];

  return (
    <section className="project-summary">
      <div className='ps'>
        <div className='psname'>Project Summary</div>
        <div className='pselect'>
          <div><select name="year" id="year" className='date-pie1'>
                <option value="30">Project</option>
                <option value="week">Last 1 week</option>
                <option value="months">Last 3 month</option>
                <option value="year">Last 1 year</option>
            </select></div>
          <div><select name="year" id="year" className='date-pie2'>
                <option value="30">Project Manager</option>
                <option value="week">Last 1 week</option>
                <option value="months">Last 3 month</option>
                <option value="year">Last 1 year</option>
            </select></div>
          <div><select name="year" id="year" className='date-pie1'>
                <option value="30">Status</option>
                <option value="week">Last 1 week</option>
                <option value="months">Last 3 month</option>
                <option value="year">Last 1 year</option>
            </select></div>
        </div>
      </div>
      <table className="summary-table">
        <thead >
          <tr>
            <th>Project</th>
            <th>Manager</th>
            <th>Due date</th>
            <th>Status</th>
            <th>Progress</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index}>
              <td>{project.name}</td>
              <td>{project.manager}</td>
              <td>{project.dueDate}</td>
              <td>
              <div className='status' style={{
                  backgroundColor: 
                    project.status === 'Completed' ? ' rgba(85, 170, 88, 0.189)' 
                    : project.status === 'Delayed' ? 'hsla(36, 100%, 50%, 0.282)' 
                    : project.status === 'At Risk' ? '#f443366a' 
                    : '#ffffff',
                  color:
                   project.status === 'Completed' ? '#4caf79'  
                   : project.status === 'Delayed' ? '#ff9800'
                   : project.status === 'At Risk' ? '#f44336' 
                   : '#ffffff', 
                }}>
                  {project.status}
                </div>
              </td>
              <td className='gpie'>
                <ProgressPieChart progress={project.progress} status={project.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default ProjectSummary;


import React from 'react';
import { PieChart, Pie, Cell } from 'recharts';

const RADIAN = Math.PI / 180;
const data = [
  { name: 'A', value: 30, color: '#22c02a' },
  { name: 'B', value: 30, color: '#d2b825' },
  { name: 'C', value: 30, color: '#e0641c' },
];
const cx = 150;
const cy = 200;
const iR = 80;
const oR = 100;
const value = 50;

const needle = (value, data, cx, cy, iR, oR, color) => {
  let total = 0;
  data.forEach((v) => {
    total += v.value;
  });
  const ang = 180.0 * (1 - value / total);
  const length = (iR + 2 * oR) / 3;
  const sin = Math.sin(-RADIAN * ang);
  const cos = Math.cos(-RADIAN * ang);
  const r = 5;
  const x0 = cx + 5;
  const y0 = cy + 5;
  const xba = x0 + r * sin;
  const yba = y0 - r * cos;
  const xbb = x0 - r * sin;
  const ybb = y0 + r * cos;
  const xp = x0 + length * cos;
  const yp = y0 + length * sin;

  return [
    <circle key="circle" cx={x0} cy={y0} r={r} fill={color} stroke="none" />,
    <path key="path" d={`M${xba} ${yba}L${xbb} ${ybb} L${xp} ${yp} L${xba} ${yba}`} stroke="#none" fill={color} />,
  ];
};

const ProgressChart = () => {
  return (
    <div className='pichart'>
      <div className='pihead'>
      <h3>Overview</h3>
            <select name="year" id="year" className='date-pie'>
                <option value="30">All</option>
                <option value="week">Last 1 week</option>
                <option value="months">Last 3 month</option>
                <option value="year">Last 1 year</option>
            </select>
      </div>
      <div className='pimid'>
      <PieChart width={300} height={250} className='chart'>
      <Pie
        dataKey="value"
        startAngle={180}
        endAngle={0}
        data={data}
        cx={cx}
        cy={cy}
        innerRadius={iR}
        outerRadius={oR}
        fill="#8884d8"
        stroke="none"
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      {needle(value, data, cx, cy, iR, oR, '#000000')}
    </PieChart>
      </div>
      
    <div className='pibottom'>
      <div className='num'>95</div>
      <div className='num1'>26</div>
      <div className='num2'>35</div>
      <div className='num3'>35</div>
    </div>
    </div>
    
  );
};

export default ProgressChart;

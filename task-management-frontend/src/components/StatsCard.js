import React from 'react';

const StatsCard = ({ title, value, change, img, bgColor, raise }) => {
  return (
    <div className="stats-card">
      
      <div className="info">
       <div className="icon" style={{ backgroundColor: bgColor }}>
       <img src={img} alt={title}  className='iclass'/>
        </div>
        <div className='title1'>{title}</div>
        <p>{value}</p>
        <div className='span'>
        <img src={raise} alt={title}  className='rclass'/>
         
         <div className='cc'>{change}</div> 
          
          </div>
      </div>
    </div>
  );
};

export default StatsCard;

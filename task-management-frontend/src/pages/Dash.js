import React from 'react'
import Header from '../components/Header'
import OverviewHeader from '../components/OverView'
import StatsCard from '../components/StatsCard'
import ProjectSummary from '../components/Project'
import ProgressChart from '../components/ProgressChart'
import './Dash.css'
import GRAPH from '../asset/graph.png'
import USER from '../asset/user.png'
import SUIT from '../asset/suitcase.png'
import CLOCK from '../asset/clock.png'
import INCR from '../asset/increase.png'
import DECR from '../asset/decrease.png'


function Dash({ sidebarToggle, setSidebarToggle }) {

  const statsData = [
    {
      title: 'Total revenue',
      value: '$53,009.89',
      change: '12% increase from last month',
      img: GRAPH,
      bgColor:'#cb8cd9',
      raise:INCR 
    },
    {
      title: 'Projects',
      value: '95/100',
      change: '10% decrease from last month',
      img:SUIT,
      bgColor:'#f09d86',
      raise:DECR   
    },
    {
      title: 'Time spent',
      value: '1022/1300 Hrs',
      change: '8% increase from last month',
      img:CLOCK,
      bgColor:'#86c6f0',
      raise:INCR  
    },
    {
      title: 'Resources',
      value: '101/120',
      change: '2% increase from last month',
      img:USER,
      bgColor:'#f0cd86',
      raise:INCR  
    },
  ];
  return (
    <div><Header sidebarToggle={sidebarToggle} setSidebarToggle={setSidebarToggle} />
      <div className="dash1">
        <OverviewHeader />
        <div className="stats-container">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>
        <div className='ptable'>
        <div className='ptlefti'><ProjectSummary /></div>
        <div className='ptright'><ProgressChart /></div>
        </div>
        
        
        
      </div>
    </div>
  )
}

export default Dash
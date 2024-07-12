import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';
import LOGO from '../asset/file.png'
import PLUS from '../asset/arrow.png'
import DASH from '../asset/dashboard.png'
import PHN from '../asset/phone.png'
import APP from '../asset/app.png'

const Sidebar = ({sidebarToggle}) => {
  return (
    <div className={`sidebar ${sidebarToggle ? 'hidden' : 'block'}`}>
      <div className='logo'>
        <img src={LOGO} alt='LOGO' className='lo' />
      </div>
      <div className='new'>
        <div className='ne'>
          <div className='pi'>
            <div className='ro'>
              <img src={PLUS} alt='arrow' className='arr' />
            </div>
          </div>
          <div className='pt'>
            <div className='mi'> Create a new project</div>

          </div>
        </div>
      </div>
      <nav>
        <ul>
          <li><Link to="/dashboard">
            <div className='dash'>
              <div className='ne2'>
                <div className='ic'>
                  <img src={DASH} alt='arrow' className='appi' />
                </div>
                <div className='pt'>
                  <div className='mi2'>Dash</div>
                </div>
              </div>
            </div>

          </Link></li>
          <li><Link to="/todo">
          <div className='dash'>
              <div className='ne2'>
                <div className='ic'>
                  <img src={APP} alt='arrow' className='appi' />
                </div>
                <div className='pt'>
                  <div className='mi2'>ToDo</div>
                </div>
              </div>
            </div>
          </Link></li>
          <li><Link to="/contact">
          <div className='dash'>
              <div className='ne2'>
                <div className='ic'>
                  <img src={PHN} alt='arrow' className='appi' />
                </div>
                <div className='pt'>
                  <div className='mi2'>Contact</div>
                </div>
              </div>
            </div>
          </Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;

import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import BELL from '../asset/bell.png'
import DOWN from '../asset/down.png'
import LEFT from '../asset/left.png'



const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '20px',
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(4),
  marginLeft: 0,
  width: '100px',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '50ch',
    },
    [theme.breakpoints.up('sm')]: {
      width: '30ch',
    },
  },
}));


const Header = ({sidebarToggle, setSidebarToggle}) => {

  return (
    <div className="header">
      <div className={`le ${sidebarToggle ? 'toggled' : ''}`}>
        <div className='h2'>
        <button className='arle'>
          <img src={LEFT} alt='' className='learrow' onClick={()=>setSidebarToggle(!sidebarToggle)}/>
        </button>
        </div>
        <div className='nd'>Dashboard</div>
      </div>
      <div className='ri'>
        <div className='r1'>
          {/* <input type='text' placeholder=''/> */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search for anything...."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
        </div>
        <div className='r2'>
          <div className='bell'>
            <img src={BELL} alt='notification' className='noti'/>
          </div>
        </div>
        <div className='r3'>
        <div className='pro'>
          <div className='imp'>
            <img src='https://t4.ftcdn.net/jpg/06/45/77/79/360_F_645777959_fNnaNoeVO4qxCNPW9MWr3gQlPFSGA9yL.jpg' alt='propic' className='pc'/>
          </div>
          <div className='imn'>
            <div className='n1'>Alex maven</div>
            <div className='n2'>Manger</div>
          </div>
          <div className='imi'>
            <img src={DOWN} alt='' className='di'/>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Header;

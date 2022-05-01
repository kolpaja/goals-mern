import React from 'react';
import './style.scss';

const Header = () => {
  return (
    <div className='header'>
      <div className='header-logo'>GoalSetter</div>
      <nav>
        <ul>
          <li>
            <a href='/login'>Login</a>
          </li>
          <li>
            <a href='/register'>Register</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;

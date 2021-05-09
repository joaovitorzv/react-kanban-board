import React from 'react';
import { Link } from 'react-router-dom';

import './styles.scss'

const Header: React.FC = () => {
  return (
    <header>
      <h1><Link to='/'>Taskei</Link></h1>
    </header>
  );
}

export default Header;
import './style.css';
import '../index.css';
import Logo from '../assets/logo.svg';
import ExitIcon from '../assets/logout-icon.svg';
import { getItem, removeItem } from '../localStorage/localStorage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeaderLogoProps {
  isLoggedIn: boolean;
}

export const HeaderLogo = ({ isLoggedIn }: HeaderLogoProps) => {
  const [logout, setLogout] = useState<boolean>(false);
  const navigate = useNavigate();
  const name = getItem('name');
  
  useEffect(() => {
    if (logout) {
      removeItem('token');
      removeItem('userId');
      removeItem('name');
      navigate('/');
    }
  }, [logout, navigate]);

  return (
    <header>
      <img src={Logo} alt="logo" style={{ width: '169px', height: '45px' }} />

      {isLoggedIn && (
        <div className='profile-area'>
          <strong>{name}</strong>
          <img
            src={ExitIcon}
            alt="Sair"
            onClick={() => setLogout(true)}
          />
        </div>
      )}
    </header>
  );
};
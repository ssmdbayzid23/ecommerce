import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import { ThemeContext } from './Hooks/ThemeContext';
import Login from './Pages/Login';
import Header from './component/Header';

function App() {

  return (
    <div className='body'>
      <Header />
      
      <Login />
    </div>
  );
}

export default App;

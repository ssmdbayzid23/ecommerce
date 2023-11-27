import logo from './logo.svg';
import './App.css';
import { useContext } from 'react';
import { ThemeContext } from './Hooks/ThemeContext';
import Login from './Pages/Login';
import Header from './component/Header';
import {Routes, Route}  from 'react-router-dom'
import Home from './Pages/Home';


function App() {


  
  return (
    <div>
      <Header />
    <Routes>
      <Route path='/' element={< Home />}/> 
      <Route path='/login' element={< Login />}/> 
      
    </Routes>
    </div>
  );
}

export default App;

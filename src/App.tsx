import React, { useState, useEffect } from 'react';
// import Demo1403 from './components/demo1403';
// import Demo2103 from './components/demo2103';
import Login from './components/Login';
import logo from './logo.svg';
import './App.css';
import _Table from './components/Table';
import Dashboard from './components/layouts/dashboard';
function App() {

  return (

    <div>
      {localStorage.getItem('userName') == 'admin' ? <Dashboard />
        : <Login />
      }
      {/* <Demo1403></Demo1403>
      <Demo2103></Demo2103>
      <Login></Login> */}
    </div >
  );
}

export default App;


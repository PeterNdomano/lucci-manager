import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Admin from './Admin';
import Student from './Student';
import 'bootstrap/dist/css/bootstrap.css';
import 'siiimple-toast/dist/style.css';
import $ from 'jquery';
import 'bootstrap';
import 'popper.js';
import './index.css';
import { BrowserRouter, Route, Routes, HashRouter} from 'react-router-dom';

ReactDOM.render(
  <HashRouter basename="/">
    <Routes>
      <Route exact path="/" element={<App/>}></Route>
      <Route exact path="/admin" element={<Admin/>}></Route>
      <Route exact path="/student" element={<Student/>}></Route>
    </Routes>
  </HashRouter>,
  document.getElementById('root')
);

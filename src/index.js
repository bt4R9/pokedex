import React from 'react';
import ReactDOM from 'react-dom';
import Smoothscroll from 'smoothscroll-polyfill';
import './index.css';
import App from './components/App/App';

Smoothscroll.polyfill();

ReactDOM.render(<App />, document.getElementById('root'));

navigator.serviceWorker.register('service-worker.js');

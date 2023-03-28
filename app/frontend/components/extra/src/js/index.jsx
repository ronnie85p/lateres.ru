import React from 'react'
import ReactDOM from 'react-dom/client';
import App from './app';

const container = document.getElementById('extra');
const props = JSON.parse(container?.dataset?.props || '{}');

ReactDOM
    .createRoot(container)
    .render(<App {...props}/>); 
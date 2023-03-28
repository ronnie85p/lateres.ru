import { React, ReactDOM } from './setup'
import App from './App'

const containerId = 'cart';
const container = document.getElementById(containerId);
const props = JSON.parse(container.dataset.props || '{}');

ReactDOM
    .createRoot(container)
    .render(<App {...props}/>);

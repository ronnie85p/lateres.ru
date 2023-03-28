import _ from 'lodash'
import axios from 'axios'
import React from 'react'
import ReactDOM from 'react-dom/client'

import config from '../../../../config/app.config'

global.React = React;
global.ReactDOM = ReactDOM;
global.config = config;
global.axios = axios;
global._ = _;

const { Suspense } = React;
const App = React.lazy(() => import('./app'));

const container = document.getElementById('ordering');
const props = JSON.parse(container.dataset.props || '{}');
const root = ReactDOM.createRoot(container);

root.render(
    <Suspense>
        <App {...props}/>
    </Suspense>
);
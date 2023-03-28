import React from 'react'
import ReactDOM from 'react-dom/client'
import Context from './context'

global.React = React;
global.ReactDOM = ReactDOM;
global.Context = Context;

export {
    React,
    ReactDOM,
    Context
}
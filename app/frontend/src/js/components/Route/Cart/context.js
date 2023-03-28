import { createContext } from "react";

import config from '../../../../config/app.config'
import lang from './lang';

export default createContext({
    config, 
    lang
});
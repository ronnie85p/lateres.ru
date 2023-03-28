const BASE_PATH = __dirname //path.dirname(path.dirname(path.dirname(__dirname))) //'../../../../'
const APP_PATH = BASE_PATH + 'app/'
const ROOT_PATH = APP_PATH + 'webpack/'

export default {
    BASE_PATH, APP_PATH, ROOT_PATH,

    controllerUrl: APP_PATH + 'controller.php',
    connectorUrl: APP_PATH + 'connector.php',
    actionUrl: APP_PATH + 'action.php',

    request: {
        method: 'post',
        responseType: 'json',
        mode: 'no-cors',
        headers: {'X-Requested-With': 'XMLHttpRequest'}
    }
};
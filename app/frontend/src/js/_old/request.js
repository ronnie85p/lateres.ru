const _defaultOptions = {
    ...window.config?.request || {}
}

const _transformRequest = (data, headers, action) => {
    
    if (_.isPlainObject(data) || _.isArray(data)) {
        let fd = new FormData;
        for (let key in data) {
            fd.append(key, data[key])
        }
        data = fd;
    } else if (_.isString(data)) {
        let params = new URLSearchParams(data);
        let fd = new FormData;
        for (let [key, val] of params.entries()) {
            fd.append(key, val);
        }
        data = fd;
    } else if (data instanceof HTMLFormElement && data.tagName === 'FORM') {
        data = new FormData(data)    
    } else {
        data = new FormData;
    }

    data.set('action', action);

    return data;
};

const setOptions = (opts) => {
    _.assign(_defaultOptions, opts)
}

const sendRequest = async (url, action, data={}, options = {}) => {
    options = _.assign({}, _defaultOptions, options, {
        url, 
        data, 
        transformRequest: [
            (data, headers) => _transformRequest(data, headers, action)
        ]
    })

    return axios(options).then(response => response.data)
}

const sendConnector = (action, data = {}, options = {}) => {
    return sendRequest(config.connectorUrl, action, data, options)
}

const sendController = (action, data = {}, options = {}) => {
    return sendRequest(config.controllerUrl, action, data, options)
}

export {
    setOptions,
    sendRequest,
    sendConnector,
    sendController
}
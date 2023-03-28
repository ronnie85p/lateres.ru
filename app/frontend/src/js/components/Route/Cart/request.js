import axios from 'axios'

const { useState } = React; 

const useRequest = (options) => {
    const [isSending, setIsSending] = useState(false);
    const [result, setResult] = useState({});
    const [error, setError] = useState({});

    const defaultOptions = {
        url: '',
        action: '',
        method: 'POST',
        transformRequest: [
            (data, headers) => _transformRequest(data, headers, action)
        ],
        onBeforeSend(data, options) { return true },
        onSuccess(response) { },
        onError(error) { }
    }

    const _options = Object.assign(
        {}, 
        defaultOptions, 
        options
    );

    const _transformRequest = (data, headers) => {
    
        if (typeof data === 'object') {
            let fd = new FormData;
            for (let key in data) {
                fd.append(key, data[key])
            }
            data = fd;
        } else if (typeof data === 'string') {
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
    
        data.set('action', _options.action);
    
        return data;
    }

    const handleBeforeSend = () => {
        setIsSending(true);

        if (onBeforeSend) {
            return onBeforeSend();
        }

        return true;
    }

    const handleSuccess = (response) => {
        setResult(response.data)

        if (onSuccess) {
            onSuccess(response);
        }
    }

    const handleError = (error) => {
        setError(error);

        if (onError) {
            onError(error);
        }
    }

    const handleDone = () => {
        setIsSending(false);

        if (onDone) {
            onDone()
        }
    }

    const send = () => {
        if (!handleBeforeSend()) {
            return false;
        }

        return axios(_options)
                .then(handleSuccess)
                .catch(handleError)
                .finally(handleDone);
    }

    return {
        send,
        isSending,
        error,
        result
    }
}

export { useRequest };
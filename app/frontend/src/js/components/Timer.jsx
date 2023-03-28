const {useEffect, useState} = React;

const Timer = (props) => {
    const [timer, setTimer] = useState(() => {
        return props.startTime;
    })

    const { 
        children,
        onTimeout
    } = props 

    useEffect(() => {
        if (timer > 0) {
            setTimeout(() => {
                setTimer(timer - 1);
            }, 1000)
        } else {
            if (onTimeout) {
                onTimeout({ timer });
            }
        }
    }, [timer]);

    return children({ timer });
}

export default Timer;
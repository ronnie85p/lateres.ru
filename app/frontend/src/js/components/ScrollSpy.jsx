import React, { useEffect } from 'react'

const ScrollSpy = (props) => {
    const { 
        context = document.body,
        target = null, 
        rootMargin = '0px 0px -25%',
        smoothScroll = false,
        threshold = [0.1, 0.5, 1],
        children,
        onInitScrollSpy = () => {},
        onActivateScroll = () => {}
    } = props

    const initScrollSpy = () => {
        const scrollSpy = new bootstrap.ScrollSpy(context, { 
            target, 
            rootMargin, 
            smoothScroll, 
            threshold 
        });

        let scrollElem = document.querySelector(target)
        bootstrap.ScrollSpy.getOrCreateInstance(scrollElem).refresh()

        // const instance = bootstrap.ScrollSpy.getInstance();
        // if (instance) {
        //     instance.addEventListener('activate.bs.scrollspy', 
        //         onActivateScroll);
        // }
        console.log('scrollSpy', target, document.querySelector(target))
        // onInitScrollSpy({ scrollSpy, instance });
    }

    useEffect(() => {
        initScrollSpy();

    }, [target]);

    return <>
        {children}
    </>
}

export default ScrollSpy
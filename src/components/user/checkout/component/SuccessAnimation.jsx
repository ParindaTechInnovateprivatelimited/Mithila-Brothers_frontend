import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const SuccessAnimation = () => {
    
    const animationContainer = useRef(null);

    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'https://lottie.host/aadb854d-75bb-4019-803e-9d1318269184/67Q19PzqzR.json',
        });

        return () => animation.destroy();
    }, []);

    return <div className="h-40 w-40 mx-auto" ref={animationContainer}></div>;
};

export default SuccessAnimation;

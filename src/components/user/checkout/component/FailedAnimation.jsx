import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

const FailedAnimation = () => {
    
    const animationContainer = useRef(null);

    useEffect(() => {
        const animation = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: 'svg',
            loop: false,
            autoplay: true,
            path: 'https://lottie.host/0e17c116-1f23-4a8e-bd25-ad5216bfb94b/toDfETmS7N.json',
        });

        return () => animation.destroy();
    }, []);

    return <div className="h-40 w-40 mx-auto" ref={animationContainer}></div>;
};

export default FailedAnimation;

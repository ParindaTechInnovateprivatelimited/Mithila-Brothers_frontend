import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const PageTracker = () => {
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const lastPage = localStorage.getItem('lastPage');

        if (lastPage && location.pathname === '/') {
            navigate(lastPage, { replace: true });
        } else {
            localStorage.setItem('lastPage', location.pathname);
        }
    }, [location, navigate]);

    return null;
};

export default PageTracker;

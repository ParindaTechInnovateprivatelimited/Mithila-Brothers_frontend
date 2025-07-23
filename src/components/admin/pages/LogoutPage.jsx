import React, { useState } from 'react'
import Logout from '../../user/user_profile/user_profile_component/Logout'
import {  useNavigate } from 'react-router-dom';

const LogoutPage = () => {
    const [ ,setIsLogoutPopupOpen] = useState(false);


    const navigate = useNavigate();
    // const location = useLocation();  // Get the current location to track the previous page
    
    // Store the previous page path
    // const previousPage = location.state?.from?.pathname || '/';

    const handleLogout = () => {
        alert('Logged Out')
        window.location.reload();
    };

    const handleClosePopup = () => {
        setIsLogoutPopupOpen(false);
        navigate('dashboard');
    };

    return (
        <div>
            <Logout
                isOpen={true}
                onClose={handleClosePopup}
                onConfirm={handleLogout}
            />
        </div>
    )
}

export default LogoutPage

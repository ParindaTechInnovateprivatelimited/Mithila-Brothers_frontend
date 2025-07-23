import React from 'react';
import Modals from '../../shared/Modal';
import Login from '../auth/Login';
import Register from '../auth/Register';

const ModalWrapper = ({ open, handleClose, isLogin, switchToRegister, switchToLogin }) => {
    return (
        <Modals isOpen={open} closeModal={handleClose} handleClose={handleClose} contentLabel="Login Modal">
            {isLogin ? (
                <Login switchToRegister={switchToRegister} />
            ) : (
                <Register switchToLogin={switchToLogin} />
            )}
        </Modals>
    );
};

export default ModalWrapper;

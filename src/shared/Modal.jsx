import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const Modals = ({ isOpen, handleClose, contentLabel, children }) => {

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
    };
    return (
        <Modal
            style={customStyles}
            isOpen={isOpen}
            contentLabel={contentLabel}
            className="modal z-50"
            overlayClassName="overlay"
            ariaHideApp={false}
        >
            <button
                onClick={handleClose}
                className="absolute top-[30px] right-[30px] text-gray-700 text-center bg-[#E5E5E5] h-[40px] w-[40px] rounded-full hover:text-gray-900 text-xl"
            >
                &times;
            </button>
            <div className="p-5 bg-white rounded-lg">
                {children}
            </div>
        </Modal>
    );
};

export default Modals;

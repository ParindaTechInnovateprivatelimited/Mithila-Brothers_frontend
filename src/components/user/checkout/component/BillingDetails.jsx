import React, { useState } from 'react';
import Modals from '../../../../shared/Modal';
import Address from '../../profile/component/Address';
import { useSelector } from 'react-redux';

const BillingDetails = ({ onProceed }) => {

    const addresses = useSelector((state) => state.addresses);
    const savedAddresses = addresses.data


    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClick = () => {
        handleOpen();
    };

    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);
    const [, setIsAddingNewAddress] = useState(false);

    const handleAddressSelect = (index) => {
        const selectedAddress = savedAddresses[index];
        onProceed(selectedAddress);
        setSelectedAddressIndex(index);
        setIsAddingNewAddress(false);
    };

    return (
        <>
            <div className="billing-details mx-auto lg:mx-0 lg:w-[400px] xl:w-[527px] rounded-md max-w-md">
                <ul className="mb-4 space-y-2">
                    {savedAddresses.map((address, index) => (
                        <li
                            key={index}
                            className={`cursor-pointer shadow-md drop-shadow-sm rounded px-4 p-2 ${selectedAddressIndex === index ? 'bg-primary text-white rounded' : ''}`}
                            onClick={() => handleAddressSelect(index)}
                        >
                            <h4 className='font-semibold'>{address?.firstName} {address?.lastName}</h4>
                            <p className='text-sm'>
                                {address?.addressLine1}, {address?.addressLine2 ? `${address?.addressLine2}, ` : ''} {address?.city}, {address?.state}, {address?.code}
                            </p>
                            <p className=" font-bold mt-1 text-sm">{address?.phone}, {address?.email}</p>
                        </li>
                    ))}
                </ul>

                <button
                    className="bg-primary text-white py-[16px] px-[20px] sm:px-[48px] text-base font-normal rounded mb-2 w-full sm:w-auto"
                    onClick={handleClick}
                >
                    Add New Billing Address
                </button>

                <Modals isOpen={open} closeModal={handleClose} handleClose={handleClose} contentLabel="Address Add">
                    <Address setOpen={setOpen} />
                </Modals>
            </div>
        </>
    );
};

export default BillingDetails;

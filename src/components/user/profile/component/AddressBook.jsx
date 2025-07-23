import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { deleteAddress, fetchAddresses } from '../../../../redux/slices/addressSlice';
import { ImBin } from "react-icons/im";
import Modals from '../../../../shared/Modal';
import Address from './Address';

const AddressBook = () => {
    const dispatch = useDispatch();
    const [selectedAddressIndex, setSelectedAddressIndex] = useState(null);

    const addresses = useSelector((state) => state.addresses.data) || [];
    const error = useSelector((state) => state.addresses.error);
    const loading = useSelector((state) => state.addresses.loading);

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

    useEffect(() => {
        dispatch(fetchAddresses());
    }, [dispatch]);

    const handleDeleteAddress = async (e, addressId) => {
        e.stopPropagation();
        try {
            await toast.promise(
                dispatch(deleteAddress(addressId)).unwrap(),
                {
                    loading: 'Deleting Address...',
                    success: (response) => `${response.message}`,
                    error: (error) => `${error.message}`,
                }
            );
            dispatch(fetchAddresses());
        } catch (error) {
            console.log(error);
            dispatch(fetchAddresses());
        }
    };

    const handleAddressSelect = (index) => {
        setSelectedAddressIndex(index);
    };

    return (
        <>
            <div className='p-2 sm:p-5 w-full py-[40px] font-TenorSans'>
                <div className="flex justify-between">
                    <h2 className="text-xl sm:text-2xl mb-5 text-primary font-medium font-Poppins leading-7 ">My Address</h2>
                    <button onClick={handleClick} className='text-xl sm:text-2xl mb-5 text-primary font-medium font-Poppins leading-7'>Add</button>
                </div>
                <div className=' h-[350px] no-scrollbar overflow-scroll'>
                    {loading ? (
                        <p className='text-center'>Loading...</p>
                    ) : error ? (
                        <p className="text-primary">Error: {error}</p>
                    ) : addresses.length > 0 ? (
                        <ul className="mb-4 space-y-2 mt-5 text-white">
                            {addresses?.map((address, index) => (
                                <li
                                    key={address?._id}
                                    className={`cursor-pointer bg-primary flex justify-between py-5  px-4 ${selectedAddressIndex === index ? 'bg-primary text-white rounded' : ''}`}
                                    onClick={() => handleAddressSelect(index)}
                                >
                                    <div>
                                        <h4 className='font-semibold mb-2'>{address?.firstName} {address?.lastName}</h4>
                                        <p className='text-sm'>
                                            {address?.addressLine1}, {address?.addressLine2 ? `${address?.addressLine2}, ` : ''} {address?.city}, {address?.state}, {address?.code}
                                        </p>
                                        <p className=" font-bold mt-1 text-sm">{address?.phone}, {address?.email}</p>
                                    </div>
                                    <button
                                        className="bg-transparent text-[white] px-2 py-1 rounded mt-2 float-end"
                                        onClick={(e) => handleDeleteAddress(e, address?._id)}
                                    >
                                        <ImBin />
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className='font-TenorSans text-center'>No addresses found.</p>
                    )}
                </div>
                <Modals isOpen={open} closeModal={handleClose} handleClose={handleClose} contentLabel="Address Add">
                    <Address setOpen={setOpen} />
                </Modals>
            </div>
        </>
    );
};

export default AddressBook;

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateUserData } from '../../../../redux/slices/authSlice';

import toast from 'react-hot-toast';

const MyProfile = () => {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.auth.user);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPinValid, setIsPinValid] = useState(true);
    const [loading, setLoading] = useState(false)

    const [formData, setFormData] = useState({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        pincode: user.pincode || '',
        address: user.address || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'pincode' ? parseInt(value, 10) || '' : value
        });

        if (name === 'phone') {
            setIsPhoneValid(value.length === 10);
        }
        if (name === 'pincode') {
            setIsPinValid(value.length === 6);
        }

    };

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'phone' && value.length > 10) {
            e.target.value = value.slice(0, 10);
        }
        if (name === 'pincode' && value.length > 6) {
            e.target.value = value.slice(0, 6);
        }
    };

    const handleSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        try {
            await toast.promise(
                dispatch(updateUserData(formData)).unwrap(),
                {
                    loading: 'Updating User Data...',
                    success: (response) => `${response.data.message}`,
                    error: (err) => `${err}`,
                }
            );
            await dispatch(fetchUserData()).unwrap();

            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.error('Error during user data update or fetch:', error);
        }
    };

    const handleReset = () => {
        setFormData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            phone: user.phone || '',
            pincode: user.pincode || '',
            address: user.address || '',
        });
    };


    return (
        <>
            {/* <ToastContainer /> */}
            {loading && (
                <div className="loading-overlay">
                    <div className="text-white font-Poppins text-xl">Loading...</div>
                </div>
            )}
            <div className={`${loading ? 'opacity-50' : ''}`}>
                <div className=' w-full px-5 sm:px-[40px] md:px-[80px] py-[20px] md:py-[40px] font-Poppins'>
                    <h2 className="text-xl sm:text-2xl mb-5 text-primary font-medium font-Poppins leading-7 ">Edit Your Profile</h2>
                    <div className="space-y-3">
                        <form className='gap-5' onSubmit={handleSubmit}>
                            <div className='grid grid-cols-1 sm:grid-cols-2 gap-x-[50px] font-normal text-sm gap-y-[24px]'>
                                <div className='flex flex-col'>
                                    <label htmlFor="firstName" className='mb-1'>First Name</label>
                                    <input
                                        placeholder={user.firstName}
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        className='bg-[#F5F5F5] text-black/40 w-full h-[40px] sm:h-[50px] px-3 sm:px-5 outline-none'
                                        value={formData.firstName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="lastName" className='mb-1'>Last Name</label>
                                    <input
                                        placeholder={user.lastName}
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        className='bg-[#F5F5F5] text-black/40 w-full h-[40px] sm:h-[50px] px-3 sm:px-5 outline-none'
                                        value={formData.lastName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="email" className='mb-1'>E-mail</label>
                                    <input
                                        placeholder={user.email}
                                        type="email"
                                        name="email"
                                        id="email"
                                        className='bg-[#F5F5F5] text-black/40 w-full h-[40px] sm:h-[50px] px-3 sm:px-5 outline-none'
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="phone" className='mb-1'>Phone</label>
                                    <input
                                        placeholder={user.phone}
                                        type="number"
                                        name="phone"
                                        id="phone"
                                        minLength="10"
                                        maxLength="10"
                                        pattern="\d*"
                                        onInput={handleInput}
                                        className='bg-[#F5F5F5] spinner text-black/40 w-full h-[40px] sm:h-[50px] px-3 sm:px-5 outline-none'
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                    {!isPhoneValid && (
                                        <p className='text-primary text-[12px] text-start'>
                                            Number must be at least 10 digits
                                        </p>
                                    )}
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="pincode" className='mb-1'>Pincode</label>
                                    <input
                                        placeholder={user.pincode}
                                        type="number"
                                        name="pincode"
                                        id="pincode"
                                        onInput={handleInput}
                                        className='bg-[#F5F5F5] spinner text-black/40 w-full h-[40px] sm:h-[50px] px-3 sm:px-5 outline-none'
                                        maxLength="6"
                                        pattern="\d*"
                                        value={formData.pincode}
                                        onChange={handleChange}
                                    />
                                    {!isPinValid && (
                                        <p className='text-primary text-[12px] text-start'>
                                            Pincode must be at least 6 digits
                                        </p>
                                    )}
                                </div>
                                <div className='flex flex-col'>
                                    <label htmlFor="address" className='mb-1'>Address</label>
                                    <input
                                        placeholder={user.address}
                                        type="text"
                                        name="address"
                                        id="address"
                                        className='bg-[#F5F5F5] text-black/40 w-full h-[40px] sm:h-[50px] px-3 sm:px-5 outline-none'
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                            {/* Uncomment if password fields are needed */}
                            {/* <div className='grid grid-cols-1 md:grid-cols-1 gap-5 mt-5'>
                        <div className='flex flex-col'>
                            <label htmlFor="password" className='mb-1'>Password Changes</label>
                            <input
                                type="password"
                                name="currentPassword"
                                placeholder='Current Password'
                                id="currentPassword"
                                className='bg-[#F5F5F5] text-black/40 w-full h-[50px] px-5 outline-none'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <input
                                type="password"
                                name="newPassword"
                                placeholder='New Password'
                                id="newPassword"
                                className='bg-[#F5F5F5] text-black/40 w-full h-[50px] px-5 outline-none'
                            />
                        </div>
                        <div className='flex flex-col'>
                            <input
                                type="password"
                                name="confirmNewPassword"
                                placeholder='Confirm New Password'
                                id="confirmNewPassword"
                                className='bg-[#F5F5F5] text-black/40 w-full h-[50px] px-5 outline-none'
                            />
                        </div>
                    </div> */}
                            <div className='mt-[24px] justify-end flex gap-5'>
                                <button type="button" onClick={handleReset} className=' text-sm font-normal leading-normal'>Cancel</button>
                                <button type="submit" className=' py-[16px] px-[30px] sm:px-[48px] bg-primary text-xs text-white sm:text-sm font-normal leading-normal rounded'>Save Changes</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyProfile;

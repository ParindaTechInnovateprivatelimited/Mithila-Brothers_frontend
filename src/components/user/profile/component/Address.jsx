import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addAddresses, fetchAddresses } from '../../../../redux/slices/addressSlice';

const Address = ({setOpen}) => {
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPinValid, setIsPinValid] = useState(true);
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [formData, setFormData] = useState({
        "firstName": '',
        "lastName": '',
        "email": '',
        "phone": '',
        "addressLine2": '',
        "addressLine1": '',
        "city": '',
        "state": '',
        "code": ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({ ...formData, [e.target.name]: e.target.value });

        if (name === 'phone') {
            setIsPhoneValid(value.length === 10);
        }
        if (name === 'code') {
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


    const handleAddAddress = async (e) => {
        try {
            setLoading(true)
            e.preventDefault();
            await dispatch(addAddresses(formData)).unwrap();
            dispatch(fetchAddresses());
            setLoading(false)
            setOpen(false)
        } catch (error) {
            setError(error.message)
        }
    };


    return (
        <div className='font-Inter'>
            <h2 className='text-black text-3xl font-normal text-center pb-2'>Add Address</h2>
            <form onSubmit={handleAddAddress} className='text-lg font-light text-center'>
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                />
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                />
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="email"
                    name="email"
                    onInput={handleInput}
                    placeholder="Email Address*"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="tel"
                    name="phone"
                    placeholder="Phone Number*"
                    minLength="10"
                    maxLength="10"
                    pattern="\d*"
                    onInput={handleInput}
                    value={formData.phone}
                    onChange={handleChange}
                    required
                />
                {!isPhoneValid && (
                    <p className='text-primary text-[12px] text-start'>
                        Number must be at least 10 digits
                    </p>
                )}
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="text"
                    name="addressLine1"
                    placeholder="Street Address*"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="text"
                    name="addressLine2"
                    placeholder="Apartment, floor, etc. (optional)"
                    value={formData.address}
                    onChange={handleChange}
                />
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="text"
                    name="city"
                    placeholder="Town/City*"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="text"
                    name="state"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="number"
                    name="code"
                    minLength="6"
                    maxLength="6"
                    pattern="\d*"
                    placeholder="Pincode"
                    value={formData.code}
                    onChange={handleChange}
                    required
                />
                {!isPinValid && (
                    <p className='text-primary text-[12px] text-start'>
                        Pincode must be at least 6 digits
                    </p>
                )}
                <button type="submit" disabled={loading} className='mt-[23px] text-lg font-semibold bg-primary text-white rounded-xl px-10 py-1'>
                    {loading ? 'Adding...' : 'Add'}
                </button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
};

export default Address;

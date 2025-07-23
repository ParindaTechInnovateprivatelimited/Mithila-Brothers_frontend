import React, { useState, useEffect } from 'react';

const UserDetailsModal = ({ onSubmit, user }) => {
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPinValid, setIsPinValid] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        pincode: '',
        address: '',
    });

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                phone: user.phone || '',
                pincode: user.pincode || '',
                address: user.address || '',
            });
        }
    }, [user]);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        const response = onSubmit(formData);
        console.log(response);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className='text-black text-3xl font-Poppins font-semibold text-center pb-2'>Additional Details</h2>
                <form onSubmit={handleSubmit} className='text-xl text-center'>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        className='w-full border-b mt-[15px] outline-none'
                        required
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        className='w-full border-b mt-[15px] outline-none'
                        required
                    />
                    <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        className='w-full border-b mt-[15px] outline-none'
                        required
                    />
                    <input
                        type="number"
                        name="pincode"
                        placeholder="Pincode"
                        minLength="6"
                        maxLength="6"
                        pattern="\d*"
                        inputMode="numeric"
                        value={formData.pincode}
                        onInput={handleInput}
                        onChange={handleChange}
                        className='w-full border-b mt-[15px] outline-none'
                        required
                    />
                    {!isPinValid && (
                        <p className='text-primary text-[12px] text-start'>
                            Pincode must be at least 6 digits
                        </p>
                    )}
                    <input
                        type="number"
                        name="phone"
                        placeholder="Phone Number"
                        inputMode="numeric"
                        value={formData.phone}
                        onChange={handleChange}
                        onInput={handleInput}
                        minLength="10"
                        maxLength="10"
                        pattern="\d*"
                        className='w-full border-b mt-[15px] outline-none'
                        required
                    />
                    {!isPhoneValid && (
                        <p className='text-primary text-[12px] text-start'>
                            Number must be at least 10 digits
                        </p>
                    )}
                    <div className="text-center">
                        <button type="submit" className='mt-[23px] text-lg font-semibold bg-primary hover:bg-primary/80 text-white rounded-xl px-10 py-1'>
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserDetailsModal;

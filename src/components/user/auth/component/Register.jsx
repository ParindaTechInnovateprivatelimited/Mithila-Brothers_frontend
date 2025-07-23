import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, googleLogin, fetchUserData, updateUserData } from '../../../../redux/slices/authSlice';
import UserDetailsModal from '../../../../shared/UserDetailsModal';
import { useNavigate } from 'react-router-dom';

const Register = ({ switchToLogin }) => {
    const [showModal, setShowModal] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPinValid, setIsPinValid] = useState(true);
    const [formData, setFormData] = useState({
        "firstName": '',
        "lastName": '',
        "email": '',
        "password": '',
        "phone": '',
        "address": '',
        "pincode": ''
    });

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'pincode' ? parseInt(value, 10) : value
        });

        if (name === 'phone') {
            setIsPhoneValid(value.length === 10);
        }
        if (name === 'pincode') {
            setIsPinValid(value.length === 6);
        }

    };

    const navigate = useNavigate();
    useEffect(() => {
        if (user) {
            if (user.phone === null) {
                setShowModal(true);
            } else {
                window.location.reload()
            }
        }
    }, [user, navigate]);
    const handleRegister = (e) => {
        e.preventDefault();
        dispatch(registerUser(formData));

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

    const handleGoogleLogin = async () => {
        await dispatch(googleLogin()).unwrap();
        setTimeout(() => {
            dispatch(fetchUserData());
        }, 100);
    };
    const handleModalSubmit = (details) => {
        try {
            const res = dispatch(updateUserData(details))
                .then(result => {
                    if (result?.error) {
                        console.error('Error:', result.error.message);
                        setShowModal(true);
                    } else {
                        setShowModal(false);
                    }
                    return result;
                })
                .catch(error => {
                    console.error('Caught error:', error.message);
                    setShowModal(true);
                    throw error;
                });

            return res;
        } catch (error) {
            console.error('Caught error in try/catch:', error.message);
            setShowModal(true);
            throw error;
        }
    };


    return (
        <div className='font-PlayfairDisplay'>
            <h2 className='text-black text-4xl font-extrabold text-center pb-2'>Register</h2>
            <form onSubmit={handleRegister} className='text-xl text-center'>
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
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="tel"
                    name="phone"
                    placeholder="Phone"
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
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                />
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="number"
                    name="pincode"
                    minLength="6"
                    maxLength="6"
                    pattern="\d*"
                    onInput={handleInput}
                    placeholder="Pincode"
                    value={formData.pincode}
                    onChange={handleChange}
                    required
                />
                {!isPinValid && (
                    <p className='text-primary text-[12px] text-start'>
                        Pincode must be at least 6 digits
                    </p>
                )}
                <input
                    className='w-full border-b mt-[15px] outline-none'
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type="submit" disabled={loading} className='mt-[23px] text-lg font-semibold bg-primary text-white rounded-xl px-10 py-1'>
                    {loading ? 'Loading...' : 'Register'}
                </button>
                {error && <p>{error}</p>}
            </form>
            <h2 className="mt-4 text-[#969ab8] text-[15px] text-center">
                Already Have an Account?{' '}
                <button onClick={switchToLogin} className="text-[15px] text-primary">
                    Log In
                </button>
                <p className='font-extrabold text-[#C1C1C1]'>-OR-</p>
            </h2>
            <button onClick={handleGoogleLogin} disabled={loading} className='mt-3 text-[#928f8f] border-2 flex m-auto gap-1 px-2 py-1 rounded-lg'>
                <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="google logo" className='h-8 w-8' />
                <p className='m-auto text-sm sm:text-base'> Continue with Google</p>
            </button>
            {showModal && <UserDetailsModal user={user} onSubmit={handleModalSubmit} onClose={() => setShowModal(false)} />}
        </div>
    );
};

export default Register;

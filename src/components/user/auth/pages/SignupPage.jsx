import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, googleLogin, fetchUserData, updateUserData } from '../../../../redux/slices/authSlice';
import UserDetailsModal from '../../../../shared/UserDetailsModal';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import banner from '../../../../assets/images/banner.jpg'


const Register = () => {
    const [showModal, setShowModal] = useState(false);
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [isPinValid, setIsPinValid] = useState(true);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        address: '',
        pincode: ''
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
            <Navigate to="/" />
        }
    }, [user, navigate]);


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
                .then((result) => {
                    if (result?.error) {
                        console.error('Error:', result.error.message);
                        setShowModal(true);
                    } else {
                        setShowModal(false);
                    }
                    return result;
                })
                .catch((error) => {
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
        <div className='font-Inter xl:min-h-screen flex flex-col   xl:mt-[60px] xl:mb-[140px] xl:pr-[135px] lg:pr-[100px] md:pr-[60px] pr-[20px] md:flex-row justify-center items-center'>
            {/* Left Side Image */}
            <div className='hidden md:block md:flex-1   justify-center items-center'>
                <img
                    src={banner}
                    alt="Banner"
                    className='w-full  max-w-[805px] h-[781px] max-h-[781px] object-cover'
                />
            </div>

            {/* Right Side Form */}
            <div className='md:flex-1 max-w-md bg-white rounded-lg p-6 '>
                <h2 className='text-black text-3xl sm:text-4xl font-medium pb-[16px]'>Join Mithila Brothers Family</h2>
                <p className="font-Poppins pb-4">Create your account to enjoy easy shopping, save your favorites, and track
                your orders.</p>
                <form onSubmit={handleRegister} className='text-lg text-center space-y-3'>
                    <input
                        className='w-full border-b border-gray-300 py-2 outline-none'
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className='w-full border-b border-gray-300 py-2 outline-none'
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className='w-full border-b border-gray-300 py-2 outline-none'
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className='w-full border-b border-gray-300 py-2 outline-none'
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        maxLength="10"
                        pattern="\d*"
                        onInput={handleInput}
                        value={formData.phone}
                        onChange={handleChange}
                        required
                    />
                    {!isPhoneValid && (
                        <p className='text-primary text-sm text-left'>
                            Number must be 10 digits
                        </p>
                    )}
                    <input
                        className='w-full border-b border-gray-300 py-2 outline-none'
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className='w-full border-b border-gray-300 py-2 outline-none'
                        type="number"
                        name="pincode"
                        maxLength="6"
                        pattern="\d*"
                        onInput={handleInput}
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        required
                    />
                    {!isPinValid && (
                        <p className='text-primary text-sm text-left'>
                            Pincode must be 6 digits
                        </p>
                    )}
                    <input
                        className='w-full border-b border-gray-300 py-2 outline-none'
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" disabled={loading} className='w-full  text-lg font-normal bg-primary text-white rounded py-2'>
                        {loading ? 'Loading...' : 'Create Account'}
                    </button>
                    {error && <p className='text-primary mt-2'>{error}</p>}
                </form>
                <div className="mt-4 text-gray-600 text-sm text-center">
                    Already Have an Account?{' '}
                    <Link to='/login' className="text-[15px] text-primary">
                        Log In
                    </Link>
                    <p className='font-extrabold text-gray-400'>-OR-</p>
                </div>
                <button onClick={handleGoogleLogin} disabled={loading} className='mt-3 w-full flex items-center justify-center border-2 border-gray-300 rounded-lg py-2 text-gray-600'>
                    <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google logo" className='h-6 w-6 mr-2' />
                    <span>Continue with Google</span>
                </button>
                {showModal && <UserDetailsModal user={user} onSubmit={handleModalSubmit} onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
};

export default Register;

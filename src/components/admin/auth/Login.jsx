import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, googleLogin, fetchAdminUserData } from '../../../redux/slices/adminAuthSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.adminAuth);

    useEffect(() => {
        if (user) {
            navigate('/admin')
            window.location.reload()
        }
    }, [user, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    const handleGoogleLogin = async () => {
        try {
            await dispatch(googleLogin()).unwrap();
            setTimeout(() => {
                dispatch(fetchAdminUserData());
            }, 100);
        } catch (error) {
            console.error('Error during Google login:', error);
        }
    };

    return (
        <div className='font-Inter h-screen flex flex-col md:flex-row justify-center items-center'>
            {/* Left Side Image */}
            {/* <div className='hidden md:block md:flex-1   justify-center items-center'>
                <img
                    src="https://s3-alpha-sig.figma.com/img/75f3/94c0/a1c7dc5b68a42239311e510f54d8cd59?Expires=1727654400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Ab025zzSUDGVGnvbUWy3PIqqTtzUi-ctofARlXTdEmLFNZUNqwvf35J8~1W-SIc5eKAjXB0Eh52IA4Td-kRjfBdPHXb0zbxn4Z4NagKBBS9UjP0fyLt9k61iqnWwWaquNeGhrq3tnBMFKgCP-L2WW5EqqbixZRgzhWo9y0y~h2CpZNMEoeY~uTZp7ZR27Ijk1~icsqXV~R-kZMZH0fmwryu~B1vnVzB5fjZDgLXWgdO3XKbUu7wlWJnW0fAIbLDwB1u2yBvGzMM4p8oBPmvuy9~~Zw8Cl86xJMLFUbmWHjkgHw3XhbSZfQNVzSZZ-N6Roehl5IQWfU2elWyms1CVfQ__" // Replace with your image URL
                    alt="Banner"
                    className='w-full  max-w-[805px] h-[781px] max-h-[781px] object-cover'
                />
            </div> */}

            {/* Right Side Form */}
            <div className='md:flex-1 shadow-xl backdrop-blur-lg mx-5 sm:mx-0 shadow-slate-300 max-w-md bg-white rounded-lg p-6 '>
                <h2 className='text-black text-3xl font-medium pb-[16px]'>Login to Admin Dashboard</h2>
                <p className="font-Poppins pb-4">Enter your email and password below.</p>
                <form onSubmit={handleLogin} className='text-lg text-center'>
                    <input
                        className='w-full border-b outline-none'
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        className='w-full border-b mt-[15px] outline-none'
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <div>
                        <button type="submit" disabled={loading} className='mt-[20px] text-lg font-semibold bg-primary text-white rounded px-10 py-1'>
                            {loading ? 'Loading...' : 'Login'}
                        </button>
                        {error && <p className='text-red-600'>{error}</p>}
                    </div>
                </form>
                <button onClick={handleGoogleLogin} disabled={loading} className='mt-3 text-[#928f8f] border-2 flex m-auto gap-1 px-2 py-1 rounded-lg'>
                    <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="google logo" className='h-8 w-8' />
                    <p className='m-auto'> Continue with Google</p>
                </button>
            </div>
        </div>
    );
};

export default Login;

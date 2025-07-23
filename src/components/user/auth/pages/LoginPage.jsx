import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, googleLogin, updateUserData, fetchUserData } from '../../../../redux/slices/authSlice';
import UserDetailsModal from '../../../../shared/UserDetailsModal';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import banner from '../../../../assets/images/banner.jpg'

const LoginPage = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showModal, setShowModal] = useState(false);

    const dispatch = useDispatch();
    const { loading, error, user } = useSelector((state) => state.auth);

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

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
    };

    const handleGoogleLogin = async () => {
        try {
            await dispatch(googleLogin()).unwrap();
            setTimeout(() => {
                dispatch(fetchUserData());
            }, 100);
        } catch (error) {
            console.error('Error during Google login:', error);
        }
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
                <h2 className='text-black text-3xl sm:text-4xl font-medium pb-[16px]'>Welcome Back!</h2>
                <p className="font-Poppins pb-4">Please enter your details to continue shopping..</p>
                <form onSubmit={handleLogin} className='text-lg text-center space-y-4'>
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
                <button type="submit" disabled={loading} className='mt-[23px] text-lg font-semibold bg-primary text-white rounded px-10 py-1'>
                    {loading ? 'Loading...' : 'Login'}
                </button>
                {error && <p>{error}</p>}
            </form>
            <h2 className="mt-4 text-[#969ab8] text-[15px] text-center font-['poppins']">
                Don’t have an account?{' '}
                <Link to='/register' className="text-[15px] text-primary">
                Sign Up
                </Link>
                <p className='font-extrabold text-[#C1C1C1]'>-OR-</p>
            </h2>
            <button onClick={handleGoogleLogin} disabled={loading} className='mt-3 text-[#928f8f] border-2 flex m-auto gap-1 px-2 py-1 rounded-lg'>
                <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="google logo" className='h-8 w-8' />
                <p className='m-auto'> Continue with Google</p>
            </button>
            {showModal && <UserDetailsModal user={user} onSubmit={handleModalSubmit} onClose={() => setShowModal(false)} />}
            </div>
        </div>
    );
};

export default LoginPage;

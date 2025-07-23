import React from 'react'
import { Toaster } from 'react-hot-toast'
import { Route, Routes } from 'react-router-dom'

import LoginRoute from '../routes/LoginRoute'
import PrivateRoute from '../routes/PrivateRoute'

import Apps from '../../color'
import ProductFilterPage from '../../shared/ProductFilter'
import CategoryPage from '../Productpage'
import Cart from './cart/pages/Cart'
import Checkout from './checkout/pages/Checkout'
import ProductList from './product/component/ProductList'
import UserProfile from './profile/pages/UserProfile'

import About from './home/pages/About'
import ContactUs from './home/pages/ContactUs'
import Footer from './home/pages/Footer'
import Header from './home/pages/Header'

import LandingPage from './home/pages/LandingPage'

import LoginPage from './auth/pages/LoginPage'
import SignupPage from './auth/pages/SignupPage'

import Wishlist from './profile/pages/WishList'

import Error404 from '../../shared/Error404'
import ProductDetails from './product/pages/ProductDetail'
import OrderDetailsPage from './profile/component/order_component/OrderDetails'
import Policy from './home/pages/Policy'
import TermsAndConditions from './home/pages/TermsAndConditions'




const User = () => {

    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <Toaster />
            <main className={`flex-grow mt-32 sm:mt-24`}>
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route
                        path="/my-account/*"
                        element={
                            <PrivateRoute>
                                <UserProfile />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/register"
                        element={
                            <LoginRoute>
                                <SignupPage />
                            </LoginRoute>
                        }
                    />
                    <Route
                        path="/login"
                        element={
                            <LoginRoute>
                                <LoginPage />
                            </LoginRoute>
                        }
                    />
                    <Route path="*" element={<Error404 />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/privacy-policy" element={<Policy />} />
                    <Route path="/terms-of-use" element={<TermsAndConditions />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/:categoryId" element={<ProductFilterPage />} />
                    <Route path="/:categoryId/:subCategoryId" element={<ProductFilterPage />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/color" element={<Apps />} />
                    <Route path="/trending" element={<ProductList category="trending" />} />
                    <Route path="/category/:category" element={<CategoryPage />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/new-arrivals" element={<ProductList category="new-arrivals" />} />
                    <Route path="/embroidered-abaya" element={<ProductList category="embroidered-abaya" />} />
                    <Route path="/:categoryId/:subCategoryId/:id" element={<ProductDetails />} />
                    <Route path="/cart/checkout" element={<Checkout />} />
                    
                    <Route path="detail" element={<OrderDetailsPage />} />
                </Routes>
            </main>
            <Footer />
        </div>
    )
}

export default User

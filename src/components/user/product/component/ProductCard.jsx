import { useState } from 'react';
import toast from 'react-hot-toast';
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { fetchCartItems } from '../../../../redux/slices/cartSlice';
import { addItemToCart } from '../../../../services/cartService';
import Modals from '../../../../shared/Modal';
import Login from '../../auth/component/Login';
import Register from '../../auth/component/Register';

// Enhanced Skeleton Loader Component
const ProductCardSkeleton = () => {
  return (
    <div className="max-w-[140px] sm:max-w-[270px] sm:w-[270px] font-Poppins relative mx-auto">
      <div>
        <div className='group font-Poppins relative sm:h-[280px] border-black overflow-hidden'>
          {/* Image Skeleton with shimmer effect */}
          <div className="sm:w-[270px] rounded bg-gray-200 w-[165px] max-h-[200px] h-[180px] sm:max-h-[300px] sm:h-[280px] mb-1 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
          </div>
          
          {/* Badge Skeleton */}
          <div className="absolute ml-2 mt-2 sm:mt-3 sm:ml-3 w-12 h-6 bg-gray-200 rounded animate-pulse"></div>
          
          {/* Heart Icon Skeleton */}
          <div className="absolute sm:h-[35px] h-[25px] w-[25px] sm:w-[35px] ml-2 right-2 sm:right-3 mt-2 sm:mt-3 rounded-full bg-gray-200 animate-pulse"></div>
        </div>
      </div>

      {/* Title Skeleton with shimmer */}
      <div className="relative overflow-hidden">
        <div className="h-4 bg-gray-200 rounded mt-2 mb-2 w-3/4 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>
      
      {/* Price Skeleton with shimmer */}
      <div className="relative overflow-hidden">
        <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
      </div>
    </div>
  );
};

const ProductCard = ({ product, data }) => {

  const dispatch = useDispatch();
  const { categoryId, subCategoryId } = useParams();

  const [selectedSize] = useState(product.size[0]);

  const [quantity,] = useState(1);

  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);



  const switchToRegister = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const user = useSelector((state) => state.auth.user);
  const value = product || data;


  let finalPrice = value.price;

  if (value.offer) {
    var percentageOffer = value.offer?.offerType === 'percentOff' && value.offer?.percentOff ? value.offer : null;
    var offerPrice = value.offer?.offerType === 'offerPrice' && value.offer?.offerPrice ? value.offer : null;
  }


  if (offerPrice) {
    finalPrice = offerPrice.offerPrice;
  } else if (percentageOffer) {
    finalPrice = value.price - (value.price * (percentageOffer.percentOff / 100));
  }


  const generateLink = () => {
    if (categoryId && subCategoryId) {
      return `/${categoryId}/${subCategoryId}/${value._id}`;
    } else if (categoryId) {
      return `/${categoryId}/${value.subCategoryId}/${value._id}`;
    } else if (subCategoryId) {
      return `/${value.categoryId}/${subCategoryId}/${value._id}`;
    } else {
      return `/${value.categoryId}/${value.subCategoryId}/${value._id}`;
    }
  };


  const handleAddToCart = async () => {
    if (!user) {
      handleOpen();
      return;
    }

    if (!value.inStock) {
      toast.success("Product is not available")
      console.log('Product is not available');
      return;
    }
    try {
      setIsAddingToCart(true);
      // const res = await addItemToCart(products.product._id, quantity, selectedSize);
      await toast.promise(
        addItemToCart(value._id, quantity, selectedSize),
        {
          loading: 'Adding to Cart...',
          success: (response) => `${response.message}`,
          error: (err) => `Error adding item to cart: ${err}`,
        }
      );
      dispatch(fetchCartItems())
    } catch (error) {
      console.error('Error adding item to cart:', error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  const isLiked = value.isLiked;

  return (
    <div className="max-w-[140px] sm:max-w-[270px] sm:w-[270px] font-Poppins relative mx-auto">
      <div>
        <div className='group font-Poppins relative sm:h-[280px] border-black overflow-hidden'>
          <Link to={generateLink()}>
            {percentageOffer && !offerPrice && (
              <div className='absolute ml-2 mt-2 sm:mt-3 sm:ml-3 font-Poppins bg-primary text-[#f9f9f9] text-xs sm:text-xs font-light rounded leading-[18px] px-3 py-1 flex items-center justify-center'>
                {percentageOffer.percentOff}%
              </div>
            )}

            {isLiked && (
              <div className='absolute sm:h-[35px] h-[25px] w-[25px] sm:w-[35px] ml-2 right-2 sm:right-3 mt-2 sm:mt-3 rounded-full bg-[#f9f9f9] text-black text-xs font-bold flex items-center justify-center'>
                <CiHeart className='text-lg sm:text-2xl' />
              </div>
            )}
            <img
              src={value?.images[0]?.url}
              alt={value?.productName}
              className="sm:w-[270px] rounded bg-[#F5F5F5] w-[165px] max-h-[200px] h-[180px] sm:max-h-[300px] sm:h-[280px] object-cover object-top mb-1"
            />
          </Link>


          {/* Add to Cart button that slides up */}
          <div className='absolute bottom-0 rounded-b left-0 right-0 font-Poppins bg-black text-white text-center  opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-in-out'>
            <button onClick={handleAddToCart} disabled={!value.inStock || isAddingToCart}  className={`text-sm py-2 w-full h-full sm:text-base ${value.inStock || isAddingToCart ? '': 'cursor-not-allowed'}`}>{product.inStock ? (isAddingToCart ? 'Adding...' : 'Add to Cart') : 'Out of Stock'}</button>
          </div>


          <Modals isOpen={open} closeModal={handleClose} handleClose={handleClose} contentLabel="Login Modal">
            {isLogin ? (
              <Login switchToRegister={switchToRegister} />
            ) : (
              <Register switchToLogin={switchToLogin} />
            )}
          </Modals>
        </div>

      </div>

      <h2 className="text-base font-Poppins text-start sm:mt-[10px] font-normal leading-normal line-clamp-1 ">{value.productName}</h2>
      {
        offerPrice ? (
          <div>
            <p className="mb-0 text-start text-base font-Poppins text-primary">
              &#8377;{offerPrice.offerPrice.toFixed(2)}
              <span className='opacity-50 text-black text-base line-through ml-2'>&#8377;{value.price.toFixed(2)}</span>
            </p>
          </div>
        ) : (
          <p className=" text-start text-base leading-normal font-Poppins text-primary line-clamp-1">
            &#8377;{finalPrice?.toFixed(2)}
            {value.price !== finalPrice && (
              <span className='opacity-50 text-black text-base line-through ml-2'>
                &#8377;{value.price.toFixed(2)}
              </span>
            )}
            {value.inStock ? (
              <span className="text-start leading-normal text-green-500 text-xs font-Poppins ml-2">In Stock</span>
            ) : (
              <span className="text-start leading-normal text-primary text-xs font-Poppins ml-2">Out of Stock</span>
            )}
          </p>
        )
      }
    </div >
  );
};

export { ProductCardSkeleton };
export default ProductCard;

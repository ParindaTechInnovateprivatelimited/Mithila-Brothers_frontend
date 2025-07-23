import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { HiArrowPath } from "react-icons/hi2";
import { IoMdHeart, IoMdHeartEmpty } from "react-icons/io";
import { TbTruckDelivery } from "react-icons/tb";

import { fetchCartItems } from '../../../../redux/slices/cartSlice';
import { fetchProduct, fetchProductByColor } from '../../../../redux/slices/productSlice';
import { addToWishlist, getWishlist, removeFromWishlist } from '../../../../redux/slices/wishListSlice';
import { addItemToCart } from '../../../../services/cartService';
import Breadcrumbs from '../../../../shared/Breadcrumbs';
import SimilarProductsPage from '../../../../shared/SimilarProduct';
import ProductReviews from '../../../../shared/StarRating';

import toast from 'react-hot-toast';
import { fetchReview } from '../../../../redux/slices/reviewSlice';
import Modals from '../../../../shared/Modal';
import Login from '../../auth/component/Login';
import Register from '../../auth/component/Register';
import ProductDetailsAndReviews from '../review_component/ProductDetailsAndReviews';
import ProductImageGallery from '../../../../shared/ProductImageGallery';


const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const products = useSelector((state) => state.products.selectedProduct);
  const loading = useSelector((state) => state.products.selectedProduct.isLoading);
  const error = useSelector((state) => state.products.selectedProduct.error);
  const wishlistItems = useSelector((state) => state.wishlist.wishlistItems.data);
  const wishlistLoading = useSelector((state) => state.wishlist.loading);
  const user = useSelector((state) => state.auth.user);

  // console.log(products)

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');

  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState('');

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [, setLocalWishlist] = useState([]);
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


  useEffect(() => {
    const loadData = async () => {
      await dispatch(fetchProduct(id));
      await dispatch(fetchReview(id))
      await dispatch(getWishlist()).then(({ payload }) => {
        setLocalWishlist(payload);
      });
    };
    loadData();
  }, [id, dispatch]);


  useEffect(() => {
    if (products.product?._id) {
      setSelectedColor(products.product.color.name || '');
      setSelectedSize(products.product.size?.[0] || '');
      setMainImage(products.images?.[0]?.url || '');
      setIsInWishlist(products.product.isLiked || false);
    }
  }, [products, wishlistItems, wishlistLoading]);

  if (error || !products.product?._id) return <div className="loading-overlay">
  <div className="text-white font-TenorSans text-xl">Please Wait Product is Loading...</div>
</div>;


  const handleAddToCart = async () => {
    if (!user) {
      handleOpen();
      return;
    }

    if (!products.product.inStock) {
      toast.success("Product is not available")
      console.log('Product is not available');
      return;
    }

    try {

      setIsAddingToCart(true);

      await toast.promise(
        addItemToCart(products.product._id, quantity, selectedSize),
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

  const handleQuantityChange = (amount) => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity + amount));
  };


  const handleWishlistToggle = async () => {

    if (!user) {
      handleOpen();
      return;
    }

    try {
      if (isInWishlist) {
        await toast.promise(
          dispatch(removeFromWishlist(id)),
          {
            loading: 'Removing from Wishlist...',
            success: (response) => `${response.payload.message}`,
            error: (err) => `Error in Removing: ${err}`,
          }
        );
        await dispatch(getWishlist());
      } else {
        await toast.promise(
          dispatch(addToWishlist(id)),
          {
            loading: 'Adding to Wishlist...',
            success: (response) => `${response.payload.message}`,
            error: (err) => `Error in Adding: ${err}`,
          }
        );
        await dispatch(getWishlist());
      }
      const resultAction = await dispatch(fetchProduct(id));
      if (fetchProduct.fulfilled.match(resultAction)) {
        const updatedProduct = resultAction.payload;
        if (updatedProduct && updatedProduct.product) {
          setSelectedColor(updatedProduct.product.color.name || '');
          setSelectedSize(updatedProduct.product.size?.[0] || '');
          setMainImage(updatedProduct.images?.[0]?.url || '');
          setIsInWishlist(updatedProduct.product.isLiked || false);
        }
      } else {
        toast.error('Failed to fetch the updated product')
        console.error('Failed to fetch the updated product');
      }
    } catch (error) {
      toast.error('Error updating wishlist')
      console.error('Error updating wishlist:', error);
    }
  };

  const percentageOffer = products.product.offer?.offerType === 'percentOff' && products.product.offer?.percentOff ? products.product.offer : null;
  const offerPrice = products.product.offer?.offerType === 'offerPrice' && products.product.offer?.offerPrice ? products.product.offer : null;

  // const percentageOffer = products.product?.offer?.find(o => o.offerType === 'percentOff' && o.percentOff);
  // const offerPrice = products.product?.offer?.find(o => o.offerType === 'offerPrice' && o.offerPrice);

  let finalPrice = products.product.price;
  if (offerPrice) {
    finalPrice = offerPrice.offerPrice;
  } else if (percentageOffer) {
    finalPrice = products.product.price - (products.product.price * (percentageOffer.percentOff / 100));
  }

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    fetchProductDetailsByColor(color);
  };


  const fetchProductDetailsByColor = async (color) => {
    const productName = products.product.productName;
    try {
      const response = await dispatch(fetchProductByColor({ color, productName }));
      const updatedProduct = response.payload;
      if (updatedProduct) {
        navigate(`/${updatedProduct.product.categoryId}/${updatedProduct.product.subCategoryId}/${updatedProduct.product._id}`);
      }
    } catch (error) {
      console.error('Error fetching product details by color:', error);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="text-white font-TenorSans text-xl">Loading...</div>
        </div>
      )}
      <div className={`${loading ? 'opacity-50' : ''} xl:px-[135px] lg:px-[100px] md:px-[60px] px-[20px]`}>
        <div className=' md:my-[40px] lg::my-[70px]'>
          <Breadcrumbs productName={products.product.productName} />
        </div>

        <div className="lg:flex font-TenorSans md:justify-between lg:gap-x-[70px] border-black">
          <ProductImageGallery
            images={products.images}
            productName={products.product.productName}
            mainImage={mainImage}
            onImageChange={setMainImage}
          />
          <div className="flex mx-auto lg:w-[40%]  borer flex-col items-end border-black">
            <div className="w-full ">
              <h1 className="text-3xl">{products.product.productName}</h1>
              <div className=' align-middle py-auto flex gap-3 mb-1'>
                <ProductReviews reviews={products.product.rating} />
                <span className="text-sm my-auto text-gray-500 mt-2 font-Poppins">({products.product.reviewCount} Reviews) |</span>
                <span className={`text-sm my-auto mt-2 font-Poppins ${products.product.inStock ? 'text-green-500' : 'text-primary'}`}>
                  {products.product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              {offerPrice ? (
                <div>
                  <p className="text-2xl font-normal font-TenorSans leading-normal mb-[24px] tracking-wide">
                    &#8377;{offerPrice.offerPrice.toFixed(2)}
                    <span className='text-[#808080] text-[15px] line-through ml-2'>&#8377;{products.product.price.toFixed(2)}</span>
                  </p>
                </div>
              ) : (
                <p className="text-2xl font-normal font-TenorSans leading-normal mb-[24px] tracking-wide">
                  &#8377;{finalPrice.toFixed(2)}
                  {products.product.price !== finalPrice && (
                    <span className='text-[#808080] text-[15px] line-through ml-2'>
                      &#8377;{products.product.price.toFixed(2)}
                    </span>
                  )}
                </p>
              )}
              {/* <p className =" font-TenorSans border-gray-600 "><span className='font-extrabold'>Material:</span> Satin</p>
              <p className=" font-TenorSans border-gray-600 "><span className='font-extrabold'>Fabric:</span> Jersey</p>
              <p className=" font-TenorSans border-gray-600 "><span className='font-extrabold'>Additional Info:</span> Abaya comes with hijab</p> */}
              <div className="mb-5 mt-2 font-TenorSans line-clamp-3 " dangerouslySetInnerHTML={{ __html: products.product.description }}>
                {/* <span className='font-extrabold'>Description:</span> */}
                {/* {products.product.description} */}
                </div>
              <div className="mb-4 pt-5 flex border-t border-gray-600 gap-4">
                <div className="block">Colours:</div>
                <div className=" border-black flex flex-wrap gap-3">
                  {products.colors.map((color) => (
                    <button
                      key={color.colorCode}
                      className={`rounded-full shadow-md backdrop-blur-xl shadow-black/20 w-5 h-5 ${selectedColor === color.name ? 'ring-2 ring-black border border-white' : ''}`}
                      style={{ backgroundColor: color.colorCode }}
                      onClick={() => handleColorSelect(color.name)}
                    >
                      {/* Optional: Add text or icon here */}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                {products.product.size && products.product.size?.length > 0 && (
                  <div className='flex gap-4'>
                    <div className="block mb-2">Size:</div>
                    <div id='size' className="flex space-x-2 flex-wrap gap-2">
                      {products.product.size.map((size, index) => (
                        <button
                          key={index}
                          className={` border-black px-3 h-8 rounded font-TenorSans border ${selectedSize === size ? 'bg-primary text-white border border-none' : 'bg-transparent text-black'}`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className='sm:space-x-2 space-y-4 sm:space-y-0 sm:flex'>
                <div className="flex items-center">
                  <button onClick={() => handleQuantityChange(-1)} className="px-3 py-2 border text-md text-black border-[#00000080] focus:bg-primary focus:text-white focus:border-primary font-bold rounded-l">&#8722;</button>
                  <input
                    min="1"
                    type="number"
                    id="quantity"
                    name="quantity"
                    value={quantity}
                    disabled
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="border-y spinner rounded-none outline-none border-[#00000080] bg-transparent p-2 w-20 text-center"
                  />
                  <button onClick={() => handleQuantityChange(1)} className="px-3 py-[9px] bg-primary text-white text-6 border-[#00000080] font-bold rounded-r">&#43;</button>
                </div>
                <div className='space-x-2 flex'>
                  <button
                    onClick={handleAddToCart}
                    className={`py-2 px-4 rounded h-[44px] text-sm w-full sm:w-[125px] ${products.product.inStock ? 'bg-primary text-white' : 'bg-primary text-white cursor-not-allowed opacity-50'}`}
                    disabled={!products.product.inStock || isAddingToCart}
                  >
                    {products.product.inStock ? (isAddingToCart ? 'Adding...' : 'Add to Cart') : 'Out of Stock'}
                  </button>

                  {wishlistLoading ? (
                    <button onClick={handleWishlistToggle} className={`border h-[44px] text-lg border-[#00000080] rounded px-2 text-black`}>
                      <IoMdHeartEmpty className="text-3xl" />
                    </button>
                  ) : (
                    <button onClick={handleWishlistToggle} className={`border h-[44px] text-lg border-[#00000080] rounded px-2 ${isInWishlist ? 'text-primary ' : 'text-black'}`}>
                      {isInWishlist ? <IoMdHeart className="text-3xl " /> : <IoMdHeartEmpty className="text-3xl" />}
                    </button>
                  )}
                </div>
                <Modals isOpen={open} closeModal={handleClose} handleClose={handleClose} contentLabel="Login Modal">
                  {isLogin ? (
                    <Login switchToRegister={switchToRegister} />
                  ) : (
                    <Register switchToLogin={switchToLogin} />
                  )}
                </Modals>
              </div>

              {/* Banner offer Ad Code Here  Do Not Remove This */}

              <div className='border mt-5 py-[24px] border-black rounded'>
                <div className='flex border-b border-black gap-2 px-[16px] pb-[16px]'>
                  <TbTruckDelivery className='w-10 h-10' />
                  <div>
                    <h1 className='text-black text-base font-normal font-TenorSans leading-normal'>Free Delivery</h1>
                    <p className='text-black text-xs font-normal underline leading-[18px]'>Enter your postal code for Delivery Availability</p>
                  </div>
                </div>
                <div className='flex gap-2 px-[16px] pt-[16px]'>
                  <HiArrowPath className='w-10 h-10' />
                  <div>
                    <h1 className='text-black text-base font-normal font-TenorSans leading-normal'>Return Delivery</h1>
                    <p className='text-black text-xs font-normal leading-[18px]'>Free 30 Days Delivery Returns. <span className='underline'>Details</span></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Review and description  */}
        <div>
          <ProductDetailsAndReviews productId={products.product._id}/>
        </div>
        <div className='mt-5 sm:mt-12 sm:mb-[120px]'>
          <SimilarProductsPage categoryId={products.product.categoryId} subCategoryId={products.product.subCategoryId} />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;



// const getColorValue = (colorName) => {
//   switch (colorName) {
//     case "Shiny Green":
//       return "#66FF66";
//     case "Royal Blue":
//       return "#4169E1";
//     case "Cobalt Blue":
//       return "#0047AB";
//     case "Deep Black":
//       return "#000000";
//     case "Platinum Grey":
//       return "#E5E4E2";
//     case "Snow White":
//       return "#FFFAFA";
//     case "Copper":
//       return "#B87333";
//     case "Midnight Blue":
//       return "#191970";
//     case "Emerald Green":
//       return "#50C878";
//     case "Wine Red":
//       return "#722F37";
//     case "Teal":
//       return "#008080";
//     case "Mint Green":
//       return "#98FF98";
//     case "Butterfly White":
//       return "#F8F8FF";
//     case "Pastel Pink":
//       return "#FFD1DC";
//     case "Cream":
//       return "#FFFDD0";
//     case "Sky Blue":
//       return "#87CEEB";
//     case "Lavender":
//       return "#E6E6FA";
//     case "Charcoal":
//       return "#36454F";
//     case "Steel Blue":
//       return "#4682B4";
//     case "Navy Blue":
//       return "#000080";
//     case "Turquoise":
//       return "#40E0D0";
//     case "Maroon":
//       return "#800000";
//     case "Blush Pink":
//       return "#FF6FFF";
//     case "Bronze":
//       return "#CD7F32";
//     case "White":
//       return "#FFFFFF";
//     case "Forest Green":
//       return "#228B22";
//     case "Ivory":
//       return "#FFFFF0";
//     case "Peach":
//       return "#FFDAB9";
//     default:
//       return "#FFFFFF";
//   }
// };

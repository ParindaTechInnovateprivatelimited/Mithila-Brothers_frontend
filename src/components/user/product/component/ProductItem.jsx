import React from 'react';
import { useDispatch } from 'react-redux';
import { selectProduct } from '../redux/productSlice';
import { useHistory } from 'react-router-dom';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    dispatch(selectProduct(product));
    history.push(`/product/${product.id}`);
  };

  return (
    <div className="product-item border p-4" onClick={handleClick}>
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <h3 className="mt-2 text-xl">{product.name}</h3>
      <p className="text-gray-700">${product.price}</p>
    </div>
  );
};

export default ProductItem;

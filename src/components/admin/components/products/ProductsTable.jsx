import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct } from "../../../../services/adminProducts";
import { fetchProducts } from "../../../../redux/slices/adminSlice";
import UpdateProductModal from "./UpdateProductModal";


const ProductsTable = () => {
	const dispatch = useDispatch();

	const products = useSelector((state) => state.adminData.products.data);
	const loading = useSelector((state) => state.adminData.products.loading);

	const [searchTerm, setSearchTerm] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState(null);


	const filteredProducts = products.filter(
		(product) =>
			product?.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
			product?.categoryId?.name?.toLowerCase().includes(searchTerm.toLowerCase())
	);
	const handleDelete = async (productId) => {
		try {
			await toast.promise(
				deleteProduct(productId),
				{
					loading: 'Deleting Product...',
					success: (response) => `${response.message}`,
					error: (err) => `${err.message}`,
				}
			)
			const result = await dispatch(fetchProducts()).unwrap();
			if (result) {
				console.log('Products refetched successfully');
			}
		} catch (error) {
			console.error('Delete Error:', error);
		}
	};

	useEffect(() => {
		dispatch(fetchProducts())
	}, [dispatch]);

	if (loading) {
		return <div className="loading-overlay">
		<div className="text-white font-TenorSans text-xl">Loading...</div>
	  </div>
	}
	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
	};

	const showDeleteToast = (id) => {
		toast((t) => (
			<div className="flex flex-col items-center p-3 space-y-4">
				<p className="text-md">Are you sure you want to Delete the Product?</p>
				<div className="flex space-x-4">
					<button
						className="px-5 py-2 bg-primary text-white rounded"
						onClick={() => {
							handleDelete(id);
							toast.dismiss(t.id);
						}}
					>
						Delete
					</button>
					<button
						className="px-5 py-2 bg-gray-300 rounded"
						onClick={() => toast.dismiss(t.id)}
					>
						Cancel
					</button>
				</div>
			</div>
		), {
			duration: 5000,
			position: 'top-center',
		});
	};

	const openModal = (product) => {
		setSelectedProduct(product);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedProduct(null);
	};
	return (
		<>
			<UpdateProductModal isOpen={isModalOpen} onClose={closeModal} product={selectedProduct} />
			<motion.div
				className='bg-white backdrop-blur-md shadow-lg rounded-xl p-6 mb-8'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.2 }}
			>
				<div className='flex justify-between items-center mb-6'>
					<h2 className='text-xl font-normal text-black'>Products</h2>
					<div className='relative'>
						<input
							type='text'
							placeholder='Search Products...'
							className='bg-gray-100 border text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
							value={searchTerm}
							onChange={handleSearch}
						/>
						<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
					</div>
				</div>

				<div className='overflow-x-auto h-[500px] overflow-auto no-scrollbar'>
					<table className='min-w-full divide-y divide-gray-700'>
						<thead>
							<tr>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Name
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Category
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Price
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Stock
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Sales
								</th>
								<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
									Actions
								</th>
							</tr>
						</thead>

						<tbody className='divide-y divide-gray-300'>
							{filteredProducts.map((product) => (
								<motion.tr
									key={product._id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}
								>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-normal line-clamp-1 text-[#555F7E] flex gap-2 items-center'>
										<img
											src={product?.images[0]?.url}
											alt='Product img'
											className='size-10 rounded-full'
										/>
										<span className="max-w-[200px]">
											{product?.productName}
										</span>
									</td>

									<td className='px-6 py-4 whitespace-nowrap text-sm text-[#555F7E]'>
										{product?.categoryId?.name}
									</td>

									<td className='px-6 py-4 whitespace-nowrap text-sm text-[#555F7E]'>
										₹{product?.price?.toFixed(2)}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-[#555F7E]'>{product?.stock}</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-[#555F7E]'>{product?.saleValue || 0}</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-[#555F7E]'>
										<button onClick={() => openModal(product)} className='text-indigo-400 hover:text-indigo-300 mr-2'>
											<Edit size={18} />
										</button>
										<button onClick={() => showDeleteToast(product._id)} className='text-red-400 hover:text-red-300'>
											<Trash2 size={18} />
										</button>
									</td>
								</motion.tr>
							))}
						</tbody>
					</table>
				</div>
			</motion.div>
		</>
	);
};
export default ProductsTable;

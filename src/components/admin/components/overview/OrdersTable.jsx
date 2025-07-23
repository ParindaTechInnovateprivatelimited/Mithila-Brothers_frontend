import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Eye } from "lucide-react";
import { useSelector } from "react-redux";


const formatDate = (date) => {
	const d = new Date(date);
	const year = d.getFullYear();
	const month = String(d.getMonth() + 1).padStart(2, '0');
	const day = String(d.getDate()).padStart(2, '0');

	return `${year}-${month}-${day}`;
};

const OrdersTable = () => {
	const orders = useSelector((state) => state.adminData.orders.data);
	const loading = useSelector((state) => state.adminData.orders.loading);

	const [searchTerm, setSearchTerm] = useState("");
	const [filteredOrders, setFilteredOrders] = useState(orders);

	if (loading) {
		return <div className="loading-overlay">
		<div className="text-white font-TenorSans text-xl">Loading...</div>
	  </div>
	}

	const handleSearch = (e) => {
		const term = e.target.value.toLowerCase();
		setSearchTerm(term);
		const filtered = orders.filter(
			(order) => order?._id.toLowerCase().includes(term) || order?.shippingAddress.firstName.toLowerCase().includes(term)
		);
		setFilteredOrders(filtered);
	};

	return (
		<motion.div
			className='bg-white backdrop-blur-md font-Inter shadow-lg rounded-xl p-6 '
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.4 }}
		>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-medium text-black'>Latest Orders</h2>
				<div className='relative'>
					<input
						type='text'
						placeholder='Search orders...'
						className='bg-gray-100 border text-black placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary'
						value={searchTerm}
						onChange={handleSearch}
					/>
					<Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
				</div>
			</div>

			<div className='overflow-x-auto h-[500px] no-scrollbar'>
				<table className='min-w-full divide-y divide-gray-700'>
					<thead className=" sticky">
						<tr>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Order ID
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Customer
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Total
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Status
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Date
							</th>
							<th className='px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider'>
								Actions
							</th>
						</tr>
					</thead>
					<tbody className='divide divide-y divide-gray-300 '>
						
							{filteredOrders.map((order) => (
								<motion.tr
									key={order._id}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									transition={{ duration: 0.3 }}

								>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-normal text-[#555F7E]'>
										{order?._id.toUpperCase()}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-normal text-[#555F7E]'>
										{order?.shippingAddress?.firstName} {order?.shippingAddress?.lastName}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm font-normal text-[#555F7E]'>
										₹{order?.totalAmount?.toFixed(2)}
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-[#555F7E]'>
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${order?.status === "Delivered"
												? "bg-green-100 text-green-800"
												: order?.status === "Processing"
													? "bg-yellow-100 text-yellow-800"
													: order?.status === "Shipped"
														? "bg-blue-100 text-blue-800"
														: order?.status === "Received"
															? "bg-black/50 text-white"
															: "bg-red-100 text-red-800"
												}`}
										>
											{order?.status}
										</span>
									</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-[#555F7E]'>{formatDate(order?.createdAt)}</td>
									<td className='px-6 py-4 whitespace-nowrap text-sm text-[#555F7E]'>
										<button className='text-indigo-400 hover:text-indigo-300 mr-2'>
											<Eye size={18} />
										</button>
									</td>
								</motion.tr>
							))}
					</tbody>
				</table>
			</div>
		</motion.div>
	);
};
export default OrdersTable;

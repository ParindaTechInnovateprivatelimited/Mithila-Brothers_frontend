import { CheckCircle, Clock, IndianRupee, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import DailyOrders from "../components/orders/DailyOrders";
import OrderDistribution from "../components/orders/OrderDistribution";
import OrdersTable from "../components/orders/OrdersTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAdminStats, fetchOrders } from "../../../redux/slices/adminSlice";


const OrdersPage = () => {
	const stats = useSelector((state) => state.adminData.stats.data);
	const loading = useSelector((state) => state.adminData.stats.loading);

	const dispatch = useDispatch()
	useEffect(() => {
            dispatch(fetchAdminStats())
            dispatch(fetchOrders())
    }, [dispatch]);

	if (loading) {
		return <div className="loading-overlay">
		<div className="text-white font-TenorSans text-xl">Loading...</div>
	  </div>
	}
	return (
		<div className='flex-1 relative z-0 overflow-auto'>
			<Header title={"Orders"} />

			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Orders' icon={ShoppingBag} value={stats?.totalOrders} color='#6366F1' />
					<StatCard name='Pending Orders' icon={Clock} value={stats?.pendingOrders} color='#F59E0B' />
					<StatCard
						name='Completed Orders'
						icon={CheckCircle}
						value={stats?.completedOrders}
						color='#10B981'
					/>
					<StatCard name='Total Revenue' icon={IndianRupee} value={`₹${stats?.overallTotalSales?.toFixed(2)}`} color='#EF4444' />
				</motion.div>

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<DailyOrders />
					<OrderDistribution />
				</div>
				<OrdersTable />
			</main>
		</div>
	);
};
export default OrdersPage;

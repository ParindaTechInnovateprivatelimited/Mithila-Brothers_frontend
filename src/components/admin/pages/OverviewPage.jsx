import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import { motion } from "framer-motion";

import Header from "../components/common/Header";
import StatCard from "../components/common/StatCard";
import SalesOverviewChart from "../components/overview/SalesOverviewChart";
import CategoryDistributionChart from "../components/overview/CategoryDistributionChart";
import SalesChannelChart from "../components/overview/SalesChannelChart";
import OrdersTable from "../components/overview/OrdersTable";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchAdminStats, fetchOrders } from "../../../redux/slices/adminSlice";

const OverviewPage = () => {
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
		<div className='flex-1 overflow-auto relative z-0'>
			<Header title='Overview' className="sticky top-0 z-20 bg-white shadow-md" />
			<main className='max-w-7xl mx-auto py-6 px-4 lg:px-8'>
				{/* STATS */}
				<motion.div
					className='grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 1 }}
				>
					<StatCard name='Total Sales' icon={Zap} value={`₹${stats?.overallTotalSales?.toFixed(2)}`} color='#6366F1' />
					<StatCard name='Total Users' icon={Users} value={stats?.totalUsers} color='#8B5CF6' />
					<StatCard name='Total Products' icon={ShoppingBag} value={stats?.totalProducts} color='#EC4899' />
					<StatCard name='Orders' icon={BarChart2} value={stats?.totalOrders} color='#10B981' />
				</motion.div>

				{/* CHARTS */}

				<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8'>
					<SalesOverviewChart />
					<CategoryDistributionChart />
					<SalesChannelChart />
				</div>
				<OrdersTable />
			</main>
		</div>
	);
};
export default OverviewPage;

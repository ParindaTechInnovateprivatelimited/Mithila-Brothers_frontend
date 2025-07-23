import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const salesData = [
	{ name: "Jul", sales: 4200 },
	{ name: "Aug", sales: 3800 },
	{ name: "Sep", sales: 5100 },
	{ name: "Oct", sales: 4600 },
	{ name: "Nov", sales: 5400 },
	{ name: "Dec", sales: 7200 },
	{ name: "Jan", sales: 6100 },
	{ name: "Feb", sales: 5900 },
	{ name: "Mar", sales: 6800 },
	{ name: "Apr", sales: 6300 },
	{ name: "May", sales: 7100 },
	{ name: "Jun", sales: 7500 },
];

const SalesOverviewChart = () => {
	return (
		<motion.div
			className='bg-white backdrop-blur-md shadow-lg rounded-xl p-6'
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: 0.2 }}
		>
			<h2 className='text-lg font-medium mb-4 text-black'>Sales Overview</h2>

			<div className='h-80'>
				<ResponsiveContainer width={"100%"} height={"100%"}>
					<LineChart data={salesData}>
						{/* <CartesianGrid strokeDasharray='3 3' stroke='#4B5563' /> */}
						<XAxis dataKey={"name"} stroke='#9ca3af' />
						<YAxis stroke='#9ca3af' />
						<Tooltip
						contentStyle={{
								backgroundColor: "rgba(255, 255, 255)",
								border: "none",
								boxShadow:"0 10px 60px 0px rgba(0, 0, 0, 0.5)",
								borderRadius:"10px"
							}}
							itemStyle={{ color: "gray" }}
						/>
						<Line
							type='monotone'
							dataKey='sales'
							stroke='#DB4444'
							strokeWidth={2}
							dot={{ fill: "#DB4444", strokeWidth: 1, r: 0 }}
							activeDot={{ r: 6, strokeWidth: 1 }}
						/>
					</LineChart>
				</ResponsiveContainer>
			</div>
		</motion.div>
	);
};
export default SalesOverviewChart;

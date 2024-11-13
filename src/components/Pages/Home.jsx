import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  PieChart,
  Pie,
  ResponsiveContainer,
} from "recharts";

const salesData = [
  { name: "Jan", Bill: 2400, Sale: 2400 },
  { name: "Feb", Bill: 1398, Sale: 2210 },
  { name: "Mar", Bill: 9800, Sale: 2290 },
  { name: "Apr", Bill: 3908, Sale: 2000 },
  { name: "May", Bill: 4800, Sale: 2181 },
  { name: "Jun", Bill: 3800, Sale: 2500 },
  { name: "Jul", Bill: 4300, Sale: 2100 },
];

const stockData = [
  { name: "Gold", stock: 400 },
  { name: "Silver", stock: 300 },
  { name: "Diamond", stock: 200 },
  { name: "Platinum", stock: 150 },
];

const revenueData = [
  { name: "Gold", revenue: 40000 },
  { name: "Silver", revenue: 30000 },
  { name: "Diamond", revenue: 20000 },
  { name: "Platinum", revenue: 15000 },
];

const products = [
  {
    name: "Gold Necklace",
    price: "₹50,000",
    image:
      "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcQ92Hbiq9i024o819vaip3Il1Bmw3WdUdo-QmjP-lUfMeGQLVRcbyoMJ5VW8bKn20eKUxyEWtZMTuNQI05ELpxRvZ2kUhrKCXFySc6xDRA62FP4mVs2J9CdmTE",
    stock: 50,
  },
  {
    name: "Silver Ring",
    price: "₹10,000",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRflZGCLmPbjOjWyeJHZTsp67VINH-Vq5Tc0ajnlPlCW8hGclGumtWVMwLS5TOJLXzDmcN_pCTZ2bk9rBIUHQKiMJ8R4FMLO11uUj9IdGXH-zz1mCfBPUR2sRg", // Silver Ring
    stock: 120,
  },
  {
    name: "Diamond Earrings",
    price: "₹1,00,000",
    image:
      "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcRg7vuQzBpg4K-JBblb7aiLwHrDDrJTjLKSVCqY03qEXri-teksvFQfTPRMXEG-w2oxDfwtivA6IS_19W73n157jFgnKCb072xvJ7kIdW3_A4aZXglD7l21xQ", // Diamond Earrings
    stock: 20,
  },
  {
    name: "Platinum Bracelet",
    price: "₹75,000",
    image:
      "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcRBbnrSsqgfQIUvKfxZe6ihAe4GrX6XYrUNcRQNkZ7V6-0BvlH-Y59-H3eFYAm_kvZX_CvpEYDgjVdSLiN_3jp0-psk1-AlZmNnPWmnacM", // Platinum Bracelet
    stock: 30,
  },
];

function Home() {
  return (
    <div className="p-8 mt-8 mx-auto bg-gradient-to-r from-blue-50 to-white rounded-lg shadow-lg max-w-screen-xl">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4 text-gray-800">
          Jwelery Management Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Track your sales, stock, and revenue in real-time with this
          comprehensive dashboard.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Today's Bill Count */}
        <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Today's Bill Count
          </h2>
          <p className="text-4xl font-bold text-gray-900">₹ 25</p>
        </div>

        {/* Today's Sale */}
        <div className="bg-gradient-to-r from-green-200 to-green-400 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Today's Sale</h2>
          <p className="text-4xl font-bold text-green-700">₹ 1,250.00</p>
        </div>

        {/* Today's Top Selling Product */}
        <div className="bg-gradient-to-r from-pink-200 to-pink-400 p-6 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            Today's Top Selling Product
          </h2>
          <p className="text-4xl font-bold text-pink-700">Gold Necklace</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {/* Sales Trend Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Sales Trend
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="Bill" stroke="#8884d8" />
                <Line type="monotone" dataKey="Sale" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stock Levels Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Stock Levels
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stockData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="stock" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Breakdown Chart */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">
            Revenue Breakdown
          </h2>
          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip />
                <Legend />
                <Pie
                  data={revenueData}
                  dataKey="revenue"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#8884d8"
                  label
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Product List with Images */}

      <div className="mt-12 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Product List
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.name}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg cursor-pointer"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover transition-transform transform hover:scale-110"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 mb-2">{product.price}</p>
                <p className="text-gray-500">Stock: {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;

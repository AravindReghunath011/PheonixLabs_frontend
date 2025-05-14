"use client";
import { useEffect, useState } from "react";
import {
  ChevronRight,
  Bell,
  User,
  LogOut,
  Settings,
  ChevronDown,
  Package,
  Calendar,
  Activity,
  Clock,
  TrendingDown,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function PatientDashboard() {
  const [user,setUser] = useState({})
  const [activeTab, setActiveTab] = useState("overview");
  const router = useRouter();
  
  useEffect(() => {
  let token = localStorage.getItem('token');
 
  axios.get('http://localhost:5000/api/users/get-user-data', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(res => {
    // handle response
    console.log(res.data.data.user);
    if(!res.data.data.user.is_profile_completed){
      router.push("/userdetails");
    }
    setUser(res.data.data.user)
  })
  .catch(err => {
    // handle error
    console.error(err);
  });
}, []);


const handleSignOut =()=>{
  localStorage.removeItem('token')
  router.push('/login')
}

  // Sample data
  const userData = {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    startDate: "March 15, 2025",
    goalWeight: "150 lbs",
    currentWeight: "175 lbs",
    initialWeight: "195 lbs",
    nextShipment: "May 20, 2025",
    medication: "WeightEase 2.5mg",
    weightData: [
      { date: "Jan 15", weight: 195 },
      { date: "Feb 01", weight: 192 },
      { date: "Feb 15", weight: 188 },
      { date: "Mar 01", weight: 185 },
      { date: "Mar 15", weight: 182 },
      { date: "Apr 01", weight: 179 },
      { date: "Apr 15", weight: 177 },
      { date: "May 01", weight: 175 },
    ],
    shipments: [
      {
        id: "SHP-2354",
        date: "May 20, 2025",
        status: "Scheduled",
        medication: "WeightEase 2.5mg",
        tracking: "",
      },
      {
        id: "SHP-2129",
        date: "Apr 20, 2025",
        status: "Delivered",
        medication: "WeightEase 2.5mg",
        tracking: "TRK93840283",
      },
      {
        id: "SHP-1950",
        date: "Mar 20, 2025",
        status: "Delivered",
        medication: "WeightEase 2.0mg",
        tracking: "TRK74829104",
      },
      {
        id: "SHP-1782",
        date: "Feb 20, 2025",
        status: "Delivered",
        medication: "WeightEase 1.5mg",
        tracking: "TRK58291033",
      },
    ],
  };

  // Calculate progress percentage
  const totalWeightToLose =
    userData.initialWeight.split(" ")[0] - userData.goalWeight.split(" ")[0];
  const weightLostSoFar =
    userData.initialWeight.split(" ")[0] - userData.currentWeight.split(" ")[0];
  const progressPercentage = Math.round(
    (weightLostSoFar / totalWeightToLose) * 100
  );

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-white shadow-md p-6 flex flex-col">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-blue-600">Acme Health</h1>
          <p className="text-gray-500 text-sm">Patient Dashboard</p>
        </div>

        <nav className="flex-grow">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("overview")}
                className={`flex items-center w-full p-3 rounded-lg ${
                  activeTab === "overview"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Activity size={18} className="mr-3" />
                <span>Overview</span>
                {activeTab === "overview" && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("progress")}
                className={`flex items-center w-full p-3 rounded-lg ${
                  activeTab === "progress"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <TrendingDown size={18} className="mr-3" />
                <span>My Progress</span>
                {activeTab === "progress" && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("shipments")}
                className={`flex items-center w-full p-3 rounded-lg ${
                  activeTab === "shipments"
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Package size={18} className="mr-3" />
                <span>Shipments</span>
                {activeTab === "shipments" && (
                  <ChevronRight size={16} className="ml-auto" />
                )}
              </button>
            </li>
            
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-100">
          <ul className="space-y-2">
           
            <li>
              <button onClick={handleSignOut} className="flex items-center w-full p-3 rounded-lg text-gray-600 hover:bg-gray-100">
                <LogOut size={18} className="mr-3" />
                <span>Sign Out</span>
              </button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            {activeTab === "overview" && "Dashboard Overview"}
            {activeTab === "progress" && "Weight Loss Progress"}
            {activeTab === "shipments" && "Medication Shipments"}
            {activeTab === "appointments" && "My Appointments"}
          </h2>
          <div className="flex items-center space-x-4">
            
            <div className="flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                {user?.name?.slice(0,1)}
              </div>
              <div className="ml-3 relative group">
                <button className="flex items-center text-gray-700">
                  <span className="mr-1">{user.name}</span>
                  
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 hidden ">
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Account Settings
                  </a>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Welcome & Summary Section */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Welcome back, Sarah!
                </h3>
                <div className="flex flex-wrap -mx-4">
                  <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                    <div className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <TrendingDown
                          size={18}
                          className="text-blue-500 mr-2"
                        />
                        <span className="text-gray-500 text-sm">
                          Current Weight
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-2xl text-gray-600 font-bold">
                          {user.current_weight_kg} kg
                        </span>
                        <span className="text-blue-500 text-sm">
                          -{2} kg
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-4 mb-4 md:mb-0">
                    <div className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Package size={18} className="text-blue-500 mr-2" />
                        <span className="text-gray-500 text-sm">
                          Next Shipment
                        </span>
                      </div>
                      <div className="flex justify-between items-baseline">
                        <span className="text-lg text-gray-600 font-semibold">
                          {userData.nextShipment}
                        </span>
                        <span className="text-blue-500 text-sm">In 8 days</span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full md:w-1/3 px-4">
                    <div className="border border-gray-100 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Activity size={18} className="text-blue-500 mr-2" />
                        <span className="text-gray-500 text-sm">
                          Progress to Goal
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm text-gray-500">
                            {progressPercentage}% Complete
                          </span>
                          <span className="text-sm text-gray-500">
                            {user.goal_weight_kg}kg
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-500 rounded-full h-2"
                            style={{ width: `${progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Progress Chart */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-800">
                    Weight Progress
                  </h3>
                  <button className="text-blue-600 text-sm flex items-center">
                    View Details <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                <div className="h-64 relative">
                  {/* Simplified Chart Representation */}
                  <div className="absolute inset-0 flex items-end">
                    {userData.weightData.map((data, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className="w-full bg-blue-100 rounded-t-sm relative"
                          style={{
                            height: `${
                              (200 -
                                (data.weight -
                                  userData.goalWeight.split(" ")[0])) /
                              2
                            }px`,
                            marginLeft: "2px",
                            marginRight: "2px",
                          }}
                        >
                          <div className="absolute bottom-0 w-full bg-blue-500 h-1"></div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 rotate-45 origin-left">
                          {data.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Current Medication */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Current Medication
                  </h3>
                  <button className="text-blue-600 text-sm flex items-center">
                    Request Refill <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                <div className="flex items-center p-4 border border-blue-100 rounded-lg bg-blue-50">
                  <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Package size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">
                      {userData.medication}
                    </h4>
                    <p className="text-sm text-gray-500">
                      Take once daily with water before breakfast
                    </p>
                  </div>
                  <div className="ml-auto">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                      View Details
                    </button>
                  </div>
                </div>
              </div>

              {/* Upcoming Shipment */}
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-800">
                    Upcoming Shipment
                  </h3>
                  <button className="text-blue-600 text-sm flex items-center">
                    View All Shipments{" "}
                    <ChevronRight size={16} className="ml-1" />
                  </button>
                </div>
                <div className="border border-gray-200 rounded-lg">
                  <div className="p-4 flex items-center">
                    <div className="h-10 w-10 rounded-full bg-amber-100 flex items-center justify-center text-amber-600">
                      <Clock size={20} />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-800">
                        Shipment #{userData.shipments[0].id}
                      </h4>
                      <p className="text-sm text-gray-500">
                        Scheduled for {userData.shipments[0].date}
                      </p>
                    </div>
                    <div className="ml-auto">
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                        {userData.shipments[0].status}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Progress Tab */}
          {activeTab === "progress" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-800">
                    Weight Loss Journey
                  </h3>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm">
                      3 Months
                    </button>
                    <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-lg text-sm">
                      6 Months
                    </button>
                    <button className="px-3 py-1 text-gray-500 hover:bg-gray-100 rounded-lg text-sm">
                      All Time
                    </button>
                  </div>
                </div>

                <div className="h-64 relative mb-6">
                  {/* Detailed Chart Representation */}
                  <div className="absolute inset-0 flex items-end">
                    {userData.weightData.map((data, index) => (
                      <div
                        key={index}
                        className="flex-1 flex flex-col items-center"
                      >
                        <div
                          className="w-full bg-blue-500 opacity-80 rounded-t-sm relative"
                          style={{
                            height: `${
                              (200 -
                                (data.weight -
                                  userData.goalWeight.split(" ")[0])) /
                              1.5
                            }px`,
                            marginLeft: "4px",
                            marginRight: "4px",
                          }}
                        >
                          <div className="absolute top-0 transform -translate-y-6 text-xs font-medium">
                            {data.weight} lbs
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          {data.date}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="text-gray-500 text-sm mb-1">
                      Starting Weight
                    </div>
                    <div className="text-xl font-bold">
                      {userData.initialWeight}
                    </div>
                    <div className="text-xs text-gray-500">
                      {userData.startDate}
                    </div>
                  </div>
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <div className="text-blue-700 text-sm mb-1">
                      Current Weight
                    </div>
                    <div className="text-xl font-bold">
                      {userData.currentWeight}
                    </div>
                    <div className="text-xs text-blue-700">
                      -{weightLostSoFar} lbs (-
                      {Math.round(
                        (weightLostSoFar /
                          userData.initialWeight.split(" ")[0]) *
                          100
                      )}
                      %)
                    </div>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <div className="text-green-700 text-sm mb-1">
                      Goal Weight
                    </div>
                    <div className="text-xl font-bold">
                      {userData.goalWeight}
                    </div>
                    <div className="text-xs text-green-700">
                      {userData.currentWeight.split(" ")[0] -
                        userData.goalWeight.split(" ")[0]}{" "}
                      lbs to go
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Body Measurements
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="border border-gray-100 rounded-lg p-3">
                    <div className="text-gray-500 text-sm mb-1">BMI</div>
                    <div className="text-xl font-bold">28.2</div>
                    <div className="text-xs text-green-600">
                      -2.6 since start
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-3">
                    <div className="text-gray-500 text-sm mb-1">Body Fat %</div>
                    <div className="text-xl font-bold">32%</div>
                    <div className="text-xs text-green-600">
                      -5% since start
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-3">
                    <div className="text-gray-500 text-sm mb-1">Waist (in)</div>
                    <div className="text-xl font-bold">34"</div>
                    <div className="text-xs text-green-600">
                      -3" since start
                    </div>
                  </div>
                  <div className="border border-gray-100 rounded-lg p-3">
                    <div className="text-gray-500 text-sm mb-1">Hip (in)</div>
                    <div className="text-xl font-bold">42"</div>
                    <div className="text-xs text-green-600">
                      -2" since start
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Shipments Tab */}
          {activeTab === "shipments" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-800">
                    Medication Shipments
                  </h3>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Shipment ID
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Medication
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Tracking
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {userData.shipments.map((shipment, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {shipment.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {shipment.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {shipment.medication}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                shipment.status === "Delivered"
                                  ? "bg-green-100 text-green-800"
                                  : shipment.status === "Scheduled"
                                  ? "bg-amber-100 text-amber-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {shipment.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {shipment.tracking ? (
                              <a
                                href="#"
                                className="text-blue-600 hover:underline"
                              >
                                {shipment.tracking}
                              </a>
                            ) : (
                              <span className="text-gray-400">
                                Not available yet
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h3 className="text-lg font-medium text-gray-800 mb-4">
                  Medication Information
                </h3>
                <div className="p-5 border border-blue-100 rounded-lg bg-blue-50">
                  <div className="flex items-start">
                    <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      <Package size={24} />
                    </div>
                    <div className="ml-4">
                      <h4 className="font-semibold text-gray-800">
                        {userData.medication}
                      </h4>
                      <p className="text-sm text-gray-500 mt-1">
                        Your current prescription is WeightEase 2.5mg. Take one
                        pill daily in the morning with water, before breakfast.
                        This medication helps manage weight by reducing appetite
                        and has been prescribed as part of your personalized
                        weight management program.
                      </p>
                      <div className="mt-4 flex space-x-3">
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                          Medication Guide
                        </button>
                        <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                          Side Effects
                        </button>
                        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                          Contact Provider
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Appointments Tab */}
          {activeTab === "appointments" && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-800">
                    Upcoming Appointments
                  </h3>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                    Schedule New
                  </button>
                </div>

                <div className="border border-blue-100 rounded-lg bg-blue-50 p-5 flex items-center mb-6">
                  <div className="h-14 w-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    <Calendar size={24} />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">
                      Monthly Check-in with Dr. Martinez
                    </h4>
                    <p className="text-sm text-gray-500">
                      May 25, 2025 • 10:30 AM • Virtual Visit
                    </p>
                  </div>
                  <div className="ml-auto space-x-3">
                    <button className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm">
                      Reschedule
                    </button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm">
                      Join Call
                    </button>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <h4 className="bg-gray-50 px-6 py-3 text-sm font-medium text-gray-700">
                    Past Appointments
                  </h4>
                  <div className="divide-y divide-gray-200">
                    <div className="p-6 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <Calendar size={20} />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h5 className="font-medium text-gray-800">
                          Monthly Check-in with Dr. Martinez
                        </h5>
                        <p className="text-sm text-gray-500">
                          April 25, 2025 • 10:30 AM • Virtual Visit
                        </p>
                      </div>
                      <div className="ml-auto">
                        <button className="px-4 py-2 text-blue-600 bg-white border border-blue-100 rounded-lg text-sm">
                          View Summary
                        </button>
                      </div>
                    </div>
                    <div className="p-6 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                          <Calendar size={20} />
                        </div>
                      </div>
                      <div className="ml-4">
                        <h5 className="font-medium text-gray-800">
                          Monthly Check-in with Dr. Martinez
                        </h5>
                        <p className="text-sm text-gray-500">
                          March 25, 2025 • 10:30 AM • Virtual Visit
                        </p>
                      </div>
                      <div className="ml-auto">
                        <button className="px-4 py-2 text-blue-600 bg-white border border-blue-100 rounded-lg text-sm">
                          View Summary
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

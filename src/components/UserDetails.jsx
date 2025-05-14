"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UserDetails() {
  const router = useRouter()
  const [userData, setUserData] = useState({
    name: "",
    age: "",
    height_cm: "",
    biological_sex: "",
    start_weight_kg: "",
    current_weight_kg: "",
    goal_weight_kg: "",
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Convert numeric strings to numbers
    const dataToSubmit = {
      ...userData,
      age: userData.age ? Number(userData.age) : undefined,
      height_cm: userData.height_cm ? Number(userData.height_cm) : undefined,
      start_weight_kg: userData.start_weight_kg ? Number(userData.start_weight_kg) : undefined,
      current_weight_kg: userData.current_weight_kg ? Number(userData.current_weight_kg) : undefined,
      goal_weight_kg: userData.goal_weight_kg ? Number(userData.goal_weight_kg) : undefined,
    };
    
    console.log("Submitting profile data:", dataToSubmit);

    const token = localStorage.getItem('token'); // Adjust key name as per your storage

axios.post(
  'https://pheonixlabs-backend.onrender.com/api/users/update-profile',
  { ...userData },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
)
.then(res => {
  router.push("/");
  console.log('Profile updated:', res.data);
})
.catch(err => {
  console.error('Error updating profile:', err);
});
    
    // Here you would typically make an API call to save the data
    // For example:
    // await fetch('/api/user/profile', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(dataToSubmit)
    // });
    
    // For now, we'll just simulate success
    
    // Redirect to dashboard or next step
  };

  const nextStep = (e) => {
    e.preventDefault();
    setCurrentStep(prev => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const renderFormStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Personal Information</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                value={userData.name}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Enter your full name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Age
              </label>
              <input
                type="number"
                name="age"
                value={userData.age}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Enter your age"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Biological Sex
              </label>
              <select
                name="biological_sex"
                value={userData.biological_sex}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
              >
                <option value="">Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Body Measurements</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Height (cm)
              </label>
              <input
                type="number"
                name="height_cm"
                value={userData.height_cm}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Enter your height in centimeters"
                step="0.1"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Starting Weight (kg)
              </label>
              <input
                type="number"
                name="start_weight_kg"
                value={userData.start_weight_kg}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Enter your starting weight in kilograms"
                step="0.1"
                min="0"
              />
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Weight Goals</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Weight (kg)
              </label>
              <input
                type="number"
                name="current_weight_kg"
                value={userData.current_weight_kg}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Enter your current weight in kilograms"
                step="0.1"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Goal Weight (kg)
              </label>
              <input
                type="number"
                name="goal_weight_kg"
                value={userData.goal_weight_kg}
                onChange={handleChange}
                className="block w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                placeholder="Enter your goal weight in kilograms"
                step="0.1"
                min="0"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-center text-3xl font-extrabold text-gray-900">
          Complete Your Profile
        </h1>
        <p className="mt-2 text-center text-sm text-gray-600">
          Let's set up your health profile to personalize your experience
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
        <div className=" py-8 px-4  sm:px-10">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-blue-600">Step {currentStep} of {totalSteps}</span>
              <span className="text-sm font-medium text-blue-600">{Math.round((currentStep / totalSteps) * 100)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              ></div>
            </div>
          </div>

          <form onSubmit={currentStep > totalSteps ? handleSubmit : nextStep}>
            {renderFormStep()}
            
            <div className="mt-8 flex justify-between">
              {currentStep > 1 ? (
                <button
                  type="button"
                  onClick={prevStep}
                  className="py-3 px-4 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Back
                </button>
              ) : (
                <div></div> // Empty div for spacing
              )}
              
              {currentStep < totalSteps ? (
                <button
                  type="button"
                  onClick={nextStep}
                  className="py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Next
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Complete Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
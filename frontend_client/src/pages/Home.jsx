// import React, { useEffect, useState } from "react";
// import { getCurrentUser, userLogout } from "../api/auth.js";
// import { useNavigate } from "react-router-dom";

// const Home = () => {
//   const [userData, setUserData] = useState(null);
//   const navigate = useNavigate();
//   async function getDAta() {
//     const res = await getCurrentUser();
//     console.log(res);
//   }

//   return (
//     <div>
//       <button onClick={getDAta}>hello</button>
//     </div>
//   );
// };

// export default Home;
import React, { useState } from "react";
import { getCurrentUser, userLogout } from "../api/auth.js";
import { useNavigate } from "react-router-dom";
// import { userLogout } from "../api/auth.js";

const Home = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  async function getDAta() {
    const res = await getCurrentUser();
    console.log(res);
    setUserData(res?.user || null);
  }

  async function handleLogout() {
    await userLogout();
    navigate("/signup");
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <header className="bg-white shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-indigo-600">Designish</h1>
        <div className="flex gap-3">
          <button
            onClick={getDAta}
            className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg transition"
          >
            Hello
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
          Welcome {userData?.name ? userData.name : "to Our Platform"} 🎉
        </h2>
        <p className="text-gray-600 max-w-lg mb-10">
          This platform helps you manage tasks efficiently, track goals, and
          stay organized. Explore our features below!
        </p>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-indigo-600">
              🚀 Fast Performance
            </h3>
            <p className="text-gray-600">
              Our system is optimized for speed, giving you a smooth experience.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-indigo-600">
              🔒 Secure Data
            </h3>
            <p className="text-gray-600">
              Your data is encrypted and stored safely with the latest security
              practices.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition">
            <h3 className="text-lg font-semibold mb-2 text-indigo-600">
              📊 Easy Tracking
            </h3>
            <p className="text-gray-600">
              Track your progress and stay updated with intuitive dashboards.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
          <p className="text-sm">
            © {new Date().getFullYear()} My Website. All rights reserved.
          </p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;

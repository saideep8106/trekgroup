import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function Landing() {

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 text-white">

      {/* Navbar */}

      <nav className="flex justify-between items-center px-12 py-6">

        <h1 className="text-2xl font-bold">TrekERP</h1>

        <div className="space-x-6">
          <Link to="/login" className="hover:text-gray-200">Login</Link>
          <Link
            to="/signup"
            className="bg-white text-indigo-600 px-4 py-2 rounded-lg"
          >
            Get Started
          </Link>
        </div>

      </nav>


      {/* Hero Section */}

      <div className="flex flex-col items-center justify-center text-center mt-32 px-6">

        <motion.h1
          initial={{ opacity:0, y:-40 }}
          animate={{ opacity:1, y:0 }}
          transition={{ duration:0.8 }}
          className="text-5xl font-bold mb-6"
        >
          Smart ERP for Modern Businesses
        </motion.h1>

        <motion.p
          initial={{ opacity:0 }}
          animate={{ opacity:1 }}
          transition={{ delay:0.5 }}
          className="text-lg max-w-xl"
        >
          Manage projects, finances, clients and teams in one powerful platform.
        </motion.p>

        <motion.div
          initial={{ opacity:0, scale:0.8 }}
          animate={{ opacity:1, scale:1 }}
          transition={{ delay:0.8 }}
          className="mt-10 space-x-4"
        >
          <Link
            to="/signup"
            className="bg-white text-indigo-700 px-6 py-3 rounded-lg font-semibold"
          >
            Start Free
          </Link>

          <Link
            to="/login"
            className="border border-white px-6 py-3 rounded-lg"
          >
            Login
          </Link>
        </motion.div>

      </div>

    </div>
  );
}
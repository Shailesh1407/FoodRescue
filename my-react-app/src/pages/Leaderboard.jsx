import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import { Card } from "../component/ui/card";
import { motion } from "framer-motion";

const Dashboard = () => {
  const [totals, setTotals] = useState({ donors: 0, ngos: 0, volunteers: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);

    const unsubscribeDonors = onSnapshot(
      query(collection(db, "users"), where("user_type", "==", "donor")),
      snapshot => setTotals(prev => ({ ...prev, donors: snapshot.size }))
    );

    const unsubscribeNGOs = onSnapshot(
      query(collection(db, "users"), where("user_type", "==", "ngo")),
      snapshot => setTotals(prev => ({ ...prev, ngos: snapshot.size }))
    );

    const unsubscribeVolunteers = onSnapshot(
      query(collection(db, "users"), where("user_type", "==", "volunteer")),
      snapshot => {
        setTotals(prev => ({ ...prev, volunteers: snapshot.size }));
        setLoading(false);
      }
    );

    return () => {
      unsubscribeDonors();
      unsubscribeNGOs();
      unsubscribeVolunteers();
    };
  }, []);

  if (loading) return <div className="text-center mt-20 text-lg text-gray-400 animate-pulse">Loading stats...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto text-center">

        {/* Header */}
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-wide">Contributors Dashboard</h1>

        {/* Intro */}
        <p className="text-gray-600 mb-2 text-lg md:text-xl">Celebrating donors, NGOs, and volunteers who fight food waste and help those in need.</p>
        <p className="text-gray-500 mb-12 text-md md:text-lg">This dashboard highlights the collective impact of our community in real-time.</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[ 
            { value: totals.donors, label: "Total Donors", color: "from-green-400 to-teal-400" },
            { value: totals.ngos, label: "Total NGOs", color: "from-blue-400 to-indigo-400" },
            { value: totals.volunteers, label: "Total Volunteers", color: "from-purple-400 to-pink-400" }
          ].map((stat, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: idx * 0.15, duration: 0.5 }}
              className="bg-white shadow-lg p-6 rounded-xl hover:scale-105 hover:shadow-2xl transition-transform duration-300"
            >
              <div className="text-4xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-gray-500 mt-2 font-medium">{stat.label}</div>
              <div className={`w-12 h-1 rounded-full mt-4 mx-auto bg-gradient-to-r ${stat.color}`}></div>
            </motion.div>
          ))}
        </div>

        {/* Storytelling Section */}
        <div className="mt-8 space-y-6 text-left text-gray-700">
          {[
            { icon: "🌟", text: "Each donor contributes not just resources, but hope. NGOs provide a platform for change, and every volunteer amplifies our mission." },
            { icon: "💡", text: "Together, we create a ripple effect, turning surplus food into nourishment and wasted resources into meaningful support." },
            { icon: "🤝", text: "Stay engaged, spread the word, and encourage others to join. Every new contributor strengthens our impact." },
            { icon: "💬", text: "“Alone we can do so little; together we can do so much.” – Helen Keller", italic: true }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03, backgroundColor: "rgba(0,128,128,0.05)" }}
              className={`flex items-start gap-4 p-5 rounded-xl border-l-4 border-teal-300 transition-all duration-300 ${item.italic ? "italic text-gray-500" : "bg-white/50 backdrop-blur-sm"}`}
            >
              <span className="text-teal-400 text-2xl mt-1">{item.icon}</span>
              <p className="text-gray-700 text-md md:text-lg">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-gray-500 text-sm md:text-base">
          <p>All data is updated in real-time from our contributors database.</p>
          <p>Keep contributing to make a positive impact!</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Leaf } from "lucide-react";
import { Button } from "../ui/button";
import { auth } from "../../firebase"; 
import { onAuthStateChanged, signOut } from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion"; // for animations

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navigation = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "FAQ", href: "/faq" },
    { name: "Dashboard", href: "/leaderboard" },
  ];

  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/"); 
  };

  // Animation variants for staggered mobile menu
  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: (i) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1 } }),
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/30 border-b border-gray-200 shadow-md transition-all duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 hover:scale-105 transition-transform duration-300"
          >
            <motion.div
              className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-700 rounded-lg flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Leaf className="w-6 h-6 text-white" />
            </motion.div>
            <span className="font-bold text-2xl text-gray-900 tracking-wide">FoodRescue AI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                  isActive(item.href)
                    ? "text-green-600 after:w-full"
                    : "text-gray-500 hover:text-green-600"
                }`}
              >
                {item.name}
                {/* Animated gradient underline */}
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-gradient-to-r from-green-400 to-green-700 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {user ? (
              <Button
                size="sm"
                className="ml-6 bg-gradient-to-r from-red-500 to-red-700 text-white hover:scale-105 hover:shadow-xl transition-transform duration-300"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <Link to="/login" className="ml-6">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-green-700 text-white hover:scale-105 hover:shadow-xl transition-transform duration-300"
                >
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-gray-700 hover:text-green-600 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="flex flex-col space-y-2 mt-4">
                {navigation.map((item, index) => (
                  <motion.div
                    key={item.name}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={menuVariants}
                  >
                    <Link
                      to={item.href}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${
                        isActive(item.href)
                          ? "bg-green-600 text-white"
                          : "text-gray-500 hover:text-gray-900 hover:bg-gray-100"
                      }`}
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}

                {user ? (
                  <motion.div custom={navigation.length} initial="hidden" animate="visible" variants={menuVariants}>
                    <Button
                      className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-700 text-white hover:scale-105 hover:shadow-xl transition-transform duration-300"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div custom={navigation.length} initial="hidden" animate="visible" variants={menuVariants}>
                    <Link
                      to="/login"
                      onClick={() => setIsOpen(false)}
                      className="mt-4"
                    >
                      <Button className="w-full bg-gradient-to-r from-green-500 to-green-700 text-white hover:scale-105 hover:shadow-xl transition-transform duration-300">
                        Sign In
                      </Button>
                    </Link>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;

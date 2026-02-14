import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaBars, FaTimes, FaCalendarAlt } from 'react-icons/fa';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [scrolled, setScrolled] = useState(false);
    const [isOpen, setIsOpen] = useState(false); // Mobile menu state

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass shadow-sm py-2' : 'bg-transparent py-4'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to={user ? "/events" : "/login"} className="text-2xl font-bold text-gray-800 flex items-center gap-2 group">
                    <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg text-white group-hover:scale-105 transition-transform">
                        <FaCalendarAlt />
                    </div>
                    <span className="bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600 tracking-tight">Eventify</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {user ? (
                        <>
                            <Link to="/events" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">Discover</Link>
                            <Link to="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium transition-colors relative after:content-[''] after:absolute after:w-0 after:h-0.5 after:bg-blue-600 after:left-0 after:-bottom-1 after:transition-all hover:after:w-full">My Dashboard</Link>
                            <div className="flex items-center gap-4 pl-4 border-l border-gray-200">
                                <span className="text-sm font-semibold text-gray-500">Hi, {user.name}</span>
                                <button
                                    onClick={handleLogout}
                                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-full font-medium transition-all hover:shadow-inner text-sm"
                                >
                                    Log Out
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/login" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Log In</Link>
                            <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium transition-all shadow-lg shadow-blue-200 hover:shadow-xl hover:-translate-y-0.5 transform">Sign Up</Link>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 focus:outline-none text-2xl">
                        {isOpen ? <FaTimes /> : <FaBars />}
                    </button>
                </div>
            </div>

            {/* Mobile Dropdown */}
            {isOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-6 flex flex-col space-y-4 animate-fade-in-down glass">
                    <Link to="/events" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium hover:text-blue-600">Discover</Link>
                    {user ? (
                        <>
                            <Link to="/dashboard" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium hover:text-blue-600">My Dashboard</Link>
                            <button onClick={handleLogout} className="text-left text-red-500 font-medium hover:text-red-600">Log Out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setIsOpen(false)} className="text-gray-600 font-medium hover:text-blue-600">Log In</Link>
                            <Link to="/register" onClick={() => setIsOpen(false)} className="text-blue-600 font-medium">Sign Up</Link>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;

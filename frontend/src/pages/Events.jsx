import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import EventCard from '../components/EventCard';
import { FaSearch, FaFilter, FaMapMarkerAlt, FaPlus, FaCalendarAlt, FaGlobe } from 'react-icons/fa';
import AuthContext from '../context/AuthContext';

const Events = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState('');
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [tags, setTags] = useState('');
    const [status, setStatus] = useState('');
    const [isVirtual, setIsVirtual] = useState('');
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const fetchEvents = async () => {
            setLoading(true);
            try {
                const params = {
                    search,
                    category,
                    location,
                    tags,
                    status,
                    isVirtual,
                    page: 1
                };
                if (date) params.date = date;

                const query = new URLSearchParams(params).toString();
                const res = await axios.get(`http://localhost:5000/api/events?${query}`);
                setEvents(res.data.events);
                setPagination(res.data.pagination);
            } catch (error) {
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        const timer = setTimeout(() => {
            fetchEvents();
        }, 300); // Debounce search

        return () => clearTimeout(timer);
    }, [search, category, location, date, tags, status, isVirtual]);

    return (
        <div className="container mx-auto px-6 py-8 md:py-12">
            {/* Header Section */}
            <div className="text-center mb-12">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight">
                        Find Your Next <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">Experience</span>
                    </h1>
                    {user && (
                        <button
                            onClick={() => navigate('/create-event')}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                            <FaPlus /> Create Event
                        </button>
                    )}
                </div>
                <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                    Discover amazing events happening near you. From tech conferences to music festivals, we have it all.
                </p>

                {/* Enhanced Search & Filter Bar */}
                <div className="bg-white rounded-2xl shadow-xl p-4 md:p-6 max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                        <div className="relative">
                            <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search events..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all placeholder-gray-400"
                            />
                        </div>

                        <div className="relative">
                            <FaFilter className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                            <select
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="">All Categories</option>
                                <option value="Technology">Technology</option>
                                <option value="Music">Music</option>
                                <option value="Art">Art</option>
                                <option value="Business">Business</option>
                                <option value="Education">Education</option>
                            </select>
                        </div>

                        <div className="relative">
                            <FaMapMarkerAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="relative">
                            <FaCalendarAlt className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                            <FaGlobe className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full pl-10 pr-8 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="">All Status</option>
                                <option value="upcoming">Upcoming</option>
                                <option value="ongoing">Ongoing</option>
                                <option value="completed">Completed</option>
                            </select>
                        </div>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Tags (comma separated)"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={isVirtual}
                                onChange={(e) => setIsVirtual(e.target.value)}
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all appearance-none cursor-pointer"
                            >
                                <option value="">All Events</option>
                                <option value="false">In-Person</option>
                                <option value="true">Virtual</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Event Grid */}
            {loading ? (
                <div className="space-y-8">
                    <div className="flex justify-center items-center mb-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                        <span className="ml-3 text-gray-600">Loading amazing events...</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="bg-gray-200 h-96 rounded-2xl animate-pulse"></div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="space-y-8">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            {events.length} Events Found
                        </h2>
                        {pagination && (
                            <div className="text-sm text-gray-500">
                                Page {pagination.currentPage} of {pagination.totalPages} • {pagination.totalEvents} total events
                            </div>
                        )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {events.map(event => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination && pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-4 mt-8">
                            <button
                                onClick={() => {
                                    const newPage = Math.max(1, pagination.currentPage - 1);
                                    // Update page in fetch
                                }}
                                disabled={pagination.currentPage <= 1}
                                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            
                            <span className="text-gray-500">
                                Page {pagination.currentPage} of {pagination.totalPages}
                            </span>
                            
                            <button
                                onClick={() => {
                                    const newPage = Math.min(pagination.totalPages, pagination.currentPage + 1);
                                    // Update page in fetch
                                }}
                                disabled={pagination.currentPage >= pagination.totalPages}
                                className="px-4 py-2 bg-gray-200 text-gray-600 rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            )}

            {!loading && events.length === 0 && (
                <div className="text-center py-20">
                    <div className="bg-gray-100 rounded-full p-6 inline-block mb-4">
                        <FaSearch className="text-4xl text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">No events found</h3>
                    <p className="text-gray-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
                </div>
            )}
        </div>
    );
};

export default Events;

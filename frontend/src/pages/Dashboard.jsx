import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import DashboardEventCard from '../components/DashboardEventCard';
import { FaCalendarAlt, FaTicketAlt, FaClock, FaChartLine, FaTimes } from 'react-icons/fa';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState('');

    const handleCancelRegistration = async (eventId) => {
        if (!window.confirm('Are you sure you want to cancel this event registration?')) {
            return;
        }

        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.delete(`http://localhost:5000/api/events/${eventId}/cancel`, config);
            
            // Remove from local state
            setRegistrations(prev => prev.filter(reg => reg.event._id !== eventId));
            
            // Show success message
            setSuccessMessage('Registration cancelled successfully!');
            setTimeout(() => setSuccessMessage(''), 3000);
        } catch (error) {
            console.error('Error cancelling registration:', error);
            alert('Failed to cancel registration. Please try again.');
        }
    };

    useEffect(() => {
        if (user) {
            const fetchRegistrations = async () => {
                try {
                    const config = { headers: { Authorization: `Bearer ${user.token}` } };
                    const { data } = await axios.get('http://localhost:5000/api/events/my-registrations', config);
                    setRegistrations(data);
                    setLoading(false);
                } catch (error) {
                    console.error(error);
                    setLoading(false);
                }
            };
            fetchRegistrations();
        }
    }, [user]);

    if (!user) return <div className="text-center py-20 text-gray-500">Please log in.</div>;
    if (loading) return <div className="text-center py-20 text-gray-500">Loading dashboard...</div>;

    const today = new Date();
    const upcoming = registrations.filter(r => new Date(r.event.date) >= today);
    const past = registrations.filter(r => new Date(r.event.date) < today);

    // Calculate statistics
    const totalEvents = registrations.length;
    const totalSpent = registrations.reduce((sum, reg) => sum + (reg.event.price || 0), 0);
    const upcomingCount = upcoming.length;
    const pastCount = past.length;

    return (
        <div className="container mx-auto px-6 py-8">
            {/* Success Message */}
            {successMessage && (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg mb-6 animate-fade-in-up">
                    <p className="font-medium">{successMessage}</p>
                </div>
            )}

            <h1 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">My Dashboard</h1>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100/50">
                    <div className="flex items-center">
                        <div className="p-3 bg-blue-100 rounded-full">
                            <FaTicketAlt className="text-blue-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{totalEvents}</p>
                            <p className="text-sm text-gray-500">Total Events</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100/50">
                    <div className="flex items-center">
                        <div className="p-3 bg-green-100 rounded-full">
                            <FaCalendarAlt className="text-green-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{upcomingCount}</p>
                            <p className="text-sm text-gray-500">Upcoming</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100/50">
                    <div className="flex items-center">
                        <div className="p-3 bg-gray-100 rounded-full">
                            <FaClock className="text-gray-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">{pastCount}</p>
                            <p className="text-sm text-gray-500">Past Events</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100/50">
                    <div className="flex items-center">
                        <div className="p-3 bg-purple-100 rounded-full">
                            <FaChartLine className="text-purple-600 text-xl" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold text-gray-800">${totalSpent}</p>
                            <p className="text-sm text-gray-500">Total Spent</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Upcoming Events */}
            <section className="mb-12">
                <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center">
                    <span className="mr-2">📅</span> Upcoming Events
                    <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {upcomingCount} events
                    </span>
                </h2>
                {upcoming.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {upcoming.map(reg => (
                            <DashboardEventCard 
                                key={reg._id} 
                                event={reg.event} 
                                registrationId={reg._id}
                                onCancelRegistration={handleCancelRegistration}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl">
                        <FaCalendarAlt className="text-4xl text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Upcoming Events</h3>
                        <p className="text-gray-500">You haven't registered for any upcoming events yet.</p>
                        <button 
                            onClick={() => window.location.href = '/events'}
                            className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Browse Events
                        </button>
                    </div>
                )}
            </section>

            {/* Past Events */}
            <section>
                <h2 className="text-2xl font-bold text-gray-700 mb-6 flex items-center opacity-75">
                    <span className="mr-2">🕒</span> Past Events
                    <span className="ml-auto text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                        {pastCount} events
                    </span>
                </h2>
                {past.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 opacity-75">
                        {past.map(reg => (
                            <DashboardEventCard 
                                key={reg._id} 
                                event={reg.event} 
                                registrationId={reg._id}
                                onCancelRegistration={handleCancelRegistration}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-xl opacity-75">
                        <FaClock className="text-4xl text-gray-400 mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No Past Events</h3>
                        <p className="text-gray-500">Your past events will appear here once you've attended them.</p>
                    </div>
                )}
            </section>
        </div>
    );
};

export default Dashboard;

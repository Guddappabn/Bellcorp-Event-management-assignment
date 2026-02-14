import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTag, FaDollarSign, FaGlobe } from 'react-icons/fa';

const EventCard = ({ event }) => {
    // Generate a consistent color based on category
    const getCategoryColor = (category) => {
        switch (category) {
            case 'Technology': return 'from-blue-500 to-indigo-600';
            case 'Music': return 'from-purple-500 to-pink-500';
            case 'Art': return 'from-red-400 to-orange-500';
            case 'Business': return 'from-emerald-500 to-teal-600';
            case 'Education': return 'from-yellow-400 to-amber-500';
            default: return 'from-gray-500 to-gray-700';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'upcoming': return 'text-green-600 bg-green-100';
            case 'ongoing': return 'text-blue-600 bg-blue-100';
            case 'completed': return 'text-gray-600 bg-gray-100';
            case 'cancelled': return 'text-red-600 bg-red-100';
            default: return 'text-gray-600 bg-gray-100';
        }
    };

    return (
        <div className="group bg-white rounded-2xl shadow-lg border border-gray-100/50 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 relative overflow-hidden flex flex-col h-full">
            {/* Visual Header */}
            <div className={`h-32 w-full bg-gradient-to-r ${getCategoryColor(event.category)} relative overflow-hidden`}>
                {event.imageUrl ? (
                    <img 
                        src={event.imageUrl} 
                        alt={event.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300"></div>
                )}
                <div className="absolute bottom-4 left-4 text-white">
                    <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider shadow-sm border border-white/10">
                        {event.category}
                    </span>
                </div>
                {event.isVirtual && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-semibold">
                        <FaGlobe className="mr-1" /> Virtual
                    </div>
                )}
                {event.status && event.status !== 'upcoming' && (
                    <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(event.status)}`}>
                            {event.status}
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-6 flex-grow flex flex-col justify-between">
                <div>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                        {event.name}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                        {event.description}
                    </p>

                    {/* Tags */}
                    {event.tags && event.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                            {event.tags.slice(0, 3).map((tag, index) => (
                                <span key={index} className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                    <FaTag className="mr-1" /> {tag}
                                </span>
                            ))}
                            {event.tags.length > 3 && (
                                <span className="text-xs text-gray-500">+{event.tags.length - 3} more</span>
                            )}
                        </div>
                    )}

                    <div className="space-y-2">
                        <div className="flex items-center text-sm text-gray-500">
                            <FaCalendarAlt className="mr-2 text-gray-400" />
                            <span>{new Date(event.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                            <FaMapMarkerAlt className="mr-2 text-gray-400" />
                            <span className="truncate">{event.location}</span>
                            {event.isVirtual && (
                                <span className="ml-2 text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">Virtual</span>
                            )}
                        </div>
                        {event.price > 0 && (
                            <div className="flex items-center text-sm text-gray-500">
                                <FaDollarSign className="mr-2 text-gray-400" />
                                <span className="font-semibold">{event.price}</span>
                            </div>
                        )}
                        {event.organizer && event.organizer.name && (
                            <div className="flex items-center text-sm text-gray-500">
                                <span className="mr-2">Organizer:</span>
                                <span className="font-medium">{event.organizer.name}</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex flex-col items-start">
                        <div className="flex items-center text-sm font-medium">
                            <FaUsers className={`mr-2 ${event.availableSeats > 0 ? 'text-green-500' : 'text-red-500'}`} />
                            <span className={event.availableSeats > 0 ? 'text-green-600' : 'text-red-600 font-bold'}>
                                {event.availableSeats > 0 ? `${event.availableSeats} Seats Left` : 'Sold Out'}
                            </span>
                        </div>
                        {event.price > 0 && (
                            <div className="text-sm text-gray-500 mt-1">
                                <FaDollarSign className="mr-1" />
                                <span className="font-semibold">{event.price}</span>
                            </div>
                        )}
                    </div>

                    <Link
                        to={`/event/${event._id}`}
                        className="inline-flex items-center justify-center px-4 py-2 bg-gray-50 hover:bg-blue-50 text-blue-600 hover:text-blue-700 font-semibold text-sm rounded-lg transition-colors duration-200 group-hover:bg-blue-600 group-hover:text-white shadow-sm"
                    >
                        View Details
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default EventCard;

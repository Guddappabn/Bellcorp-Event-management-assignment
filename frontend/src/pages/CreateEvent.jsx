import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaTag, FaDollarSign, FaGlobe, FaSave, FaArrowLeft } from 'react-icons/fa';

const CreateEvent = () => {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        date: '',
        location: '',
        category: 'Technology',
        capacity: 50,
        tags: '',
        price: 0,
        isVirtual: false,
        imageUrl: ''
    });
    
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const eventData = {
                ...formData,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                date: new Date(formData.date)
            };

            const config = { 
                headers: { 
                    Authorization: `Bearer ${user.token}`,
                    'Content-Type': 'application/json'
                } 
            };

            const { data } = await axios.post('http://localhost:5000/api/events', eventData, config);
            
            console.log('Event created successfully:', data);
            navigate('/events');
        } catch (err) {
            console.error('Error creating event:', err);
            setError(err.response?.data?.message || 'Failed to create event');
        } finally {
            setLoading(false);
        }
    };

    if (!user) {
        return (
            <div className="text-center py-20">
                <p className="text-gray-500">Please log in to create an event.</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-8 max-w-4xl">
            {/* Header */}
            <div className="flex items-center mb-8">
                <button
                    onClick={() => navigate('/events')}
                    className="mr-4 p-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                    <FaArrowLeft className="text-xl" />
                </button>
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Create New Event</h1>
                    <p className="text-gray-500 mt-1">Fill in the details to create your event</p>
                </div>
            </div>

            {error && (
                <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
                    <p className="font-medium">{error}</p>
                </div>
            )}

            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Event Name */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Name *
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Enter event name"
                            />
                        </div>

                        {/* Description */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Description *
                            </label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Describe your event"
                            />
                        </div>

                        {/* Date */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Date & Time *
                            </label>
                            <input
                                type="datetime-local"
                                name="date"
                                value={formData.date}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category *
                            </label>
                            <select
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="Technology">Technology</option>
                                <option value="Music">Music</option>
                                <option value="Art">Art</option>
                                <option value="Business">Business</option>
                                <option value="Education">Education</option>
                                <option value="Sports">Sports</option>
                                <option value="Food">Food</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* Location */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FaMapMarkerAlt className="inline mr-2" />
                                Location *
                            </label>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                required
                                disabled={formData.isVirtual}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                                placeholder="Event location"
                            />
                        </div>

                        {/* Capacity */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FaUsers className="inline mr-2" />
                                Capacity *
                            </label>
                            <input
                                type="number"
                                name="capacity"
                                value={formData.capacity}
                                onChange={handleChange}
                                required
                                min="1"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="Maximum attendees"
                            />
                        </div>

                        {/* Price */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FaDollarSign className="inline mr-2" />
                                Price
                            </label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                min="0"
                                step="0.01"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="0 (free event)"
                            />
                        </div>

                        {/* Tags */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                <FaTag className="inline mr-2" />
                                Tags
                            </label>
                            <input
                                type="text"
                                name="tags"
                                value={formData.tags}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="tech, conference, networking (comma separated)"
                            />
                        </div>

                        {/* Virtual Event */}
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isVirtual"
                                id="isVirtual"
                                checked={formData.isVirtual}
                                onChange={handleChange}
                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                            />
                            <label htmlFor="isVirtual" className="ml-2 block text-sm text-gray-700">
                                <FaGlobe className="inline mr-2" />
                                Virtual Event
                            </label>
                        </div>

                        {/* Image URL */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Event Image URL
                            </label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                placeholder="https://example.com/event-image.jpg"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/events')}
                        className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex items-center"
                    >
                        {loading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Creating...
                            </>
                        ) : (
                            <>
                                <FaSave className="mr-2" />
                                Create Event
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEvent;

import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';

const EventDetails = () => {
    const { id } = useParams();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        const fetchEvent = async () => {
            try {
                const { data } = await axios.get(`http://localhost:5000/api/events/${id}`);
                setEvent(data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id]);

    const handleRegister = async () => {
        if (!user) {
            navigate('/login');
            return;
        }
        try {
            const config = { headers: { Authorization: `Bearer ${user.token}` } };
            await axios.post(`http://localhost:5000/api/events/${id}/register`, {}, config);
            alert('Registration Successful!');
            navigate('/dashboard');
        } catch (error) {
            alert(error.response.data.message || 'Registration Failed');
        }
    };

    if (loading) return <div className="text-center py-20 text-gray-500">Loading details...</div>;
    if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

    return (
        <div className="container mx-auto px-6 py-8">
            <button onClick={() => navigate(-1)} className="text-blue-500 hover:underline mb-4">← Back</button>
            <div className="bg-white rounded-lg shadow-xl overflow-hidden md:flex">
                <div className="md:w-1/2 bg-gray-200 h-64 md:h-auto flex items-center justify-center text-gray-400 text-3xl font-bold">
                    Event Image
                </div>
                <div className="p-8 md:w-1/2">
                    <div className="uppercase tracking-wide text-sm text-blue-500 font-semibold">{event.category}</div>
                    <h1 className="mt-2 text-4xl font-bold text-gray-900">{event.name}</h1>
                    <p className="mt-4 text-gray-600 leading-relaxed">{event.description}</p>

                    <div className="mt-6 space-y-2 text-gray-700">
                        <div className="flex items-center">
                            <span className="font-bold w-24">Date:</span>
                            <span>{new Date(event.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold w-24">Location:</span>
                            <span>{event.location}</span>
                        </div>
                        <div className="flex items-center">
                            <span className="font-bold w-24">Seats:</span>
                            <span className={event.availableSeats > 0 ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                                {event.availableSeats} / {event.capacity}
                            </span>
                        </div>
                    </div>

                    <div className="mt-8">
                        {user ? (
                            event.availableSeats > 0 ? (
                                <button
                                    onClick={handleRegister}
                                    className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1 w-full md:w-auto"
                                >
                                    Register Now
                                </button>
                            ) : (
                                <button disabled className="bg-gray-400 text-white font-bold py-3 px-8 rounded-lg cursor-not-allowed w-full md:w-auto">
                                    Sold Out
                                </button>
                            )
                        ) : (
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 transition transform hover:-translate-y-1 w-full md:w-auto"
                            >
                                Login to Register
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;

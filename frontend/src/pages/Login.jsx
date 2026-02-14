import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import { FaUser, FaLock, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('demo@test.com');
    const [password, setPassword] = useState('123456');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const result = await login(email, password);
            console.log('Login successful:', result);
            navigate('/events');
        } catch (err) {
            console.error('Login error:', err);
            setError(err.message || 'Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex bg-gradient-to-r from-blue-100 to-white md:bg-gray-100 min-h-screen items-center justify-center">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 w-full max-w-md transform transition-all hover:scale-[1.01] hover:shadow-3xl">
                <div className="text-center mb-10">
                    <div className="bg-blue-100 text-blue-600 rounded-full p-4 inline-block mb-4 shadow-inner ring-4 ring-blue-50">
                        <FaUser className="text-3xl" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 tracking-tight">Welcome Back</h2>
                    <p className="text-gray-500 mt-2">Sign in to continue your discovery</p>
                    
                    {/* Demo Credentials */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
                        <p className="text-xs text-blue-600">Email: demo@test.com</p>
                        <p className="text-xs text-blue-600">Password: 123456</p>
                    </div>
                </div>

                {error && (
                    <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6 flex items-start animate-fade-in-up">
                        <FaExclamationCircle className="mt-1 mr-3 flex-shrink-0" />
                        <span className="text-sm font-medium">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative group">
                        <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm placeholder-gray-400 text-gray-700"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative group">
                        <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all shadow-sm placeholder-gray-400 text-gray-700"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full bg-blue-600 text-white font-bold py-3.5 rounded-xl hover:bg-blue-700 transition transform hover:-translate-y-0.5 shadow-lg shadow-blue-200 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                        {loading ? (
                            <div className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Signing in...
                            </div>
                        ) : 'Sign In'}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-600">
                    <span className="opacity-80">Don't have an account?</span>{' '}
                    <Link to="/register" className="text-blue-600 font-bold hover:text-blue-800 hover:underline transition-colors relative z-10">Sign up now</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;

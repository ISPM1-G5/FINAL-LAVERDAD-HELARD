import './bootstrap.js';
import '../css/app.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';

// Set up axios defaults
axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Welcome page component
function WelcomeApp() {
    const [categories, setCategories] = React.useState([]);
    const [articles, setArticles] = React.useState([]);
    const [email, setEmail] = React.useState('');
    const [message, setMessage] = React.useState('');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        // Fetch categories and articles
        axios.all([
            axios.get('/api/categories'),
            axios.get('/api/latest-articles')
        ])
        .then(axios.spread((catRes, artRes) => {
            setCategories(catRes.data);
            setArticles(artRes.data);
            setLoading(false);
        }))
        .catch(err => {
            console.error('Error fetching data:', err);
            setLoading(false);
        });
    }, []);

    const handleSubscribe = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/subscribe', { email });
            setMessage(response.data.message || 'Subscription successful!');
            setEmail('');
        } catch (err) {
            setMessage(err.response?.data?.message || 'Subscription failed. Please try again.');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-teal-600 to-teal-900">
                <div className="text-white text-2xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-teal-600 to-teal-900">
            <div className="container mx-auto px-4 py-16">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <div className="mb-8 flex justify-center">
                        <div className="relative w-64 h-64">
                            <div className="absolute inset-0 rounded-full border-8 border-teal-800 bg-linear-to-br from-teal-700 to-teal-900 shadow-2xl">
                                <div className="absolute inset-4 rounded-full border-4 border-yellow-400 flex items-center justify-center">
                                    <div className="bg-white rounded-full p-6">
                                        <div className="text-3xl text-teal-900 mb-2">📰</div>
                                        <div className="text-xs font-bold text-yellow-600">LA VERDAD HERALD</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="text-6xl font-serif text-gray-300 mb-4 drop-shadow-lg">La Verdad Herald</h1>
                    <p className="text-xl text-gray-200 mb-8">The Official Higher Education Student Publication of La Verdad Christian College, Inc.</p>
                    <div className="flex gap-4 justify-center">
                        <a href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-xl">
                            Log In
                        </a>
                        <a href="/register" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold transition shadow-lg hover:shadow-xl">
                            Sign Up
                        </a>
                    </div>
                </div>

                {/* Subscription Form */}
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-12 max-w-md mx-auto">
                    <h3 className="text-white text-xl mb-4">Subscribe to Our Newsletter</h3>
                    {message && (
                        <div className={`mb-4 p-3 rounded ${message.includes('successful') ? 'bg-green-500' : 'bg-red-500'} text-white`}>
                            {message}
                        </div>
                    )}
                    <form onSubmit={handleSubscribe}>
                        <div className="flex gap-2">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="flex-1 px-4 py-2 rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
                                required
                            />
                            <button type="submit" className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-2 rounded-lg font-semibold transition">
                                Subscribe
                            </button>
                        </div>
                    </form>
                </div>

                {/* Latest Articles */}
                <div className="mb-12">
                    <h2 className="text-4xl font-bold text-white mb-8 text-center">Latest Articles</h2>
                    {articles.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {articles.map(article => (
                                <div key={article.id} className="bg-white rounded-lg shadow-xl overflow-hidden hover:shadow-2xl transition">
                                    {article.featured_image && (
                                        <img src={`/storage/${article.featured_image}`} alt={article.title} className="w-full h-48 object-cover" />
                                    )}
                                    <div className="p-6">
                                        <h3 className="text-xl font-bold mb-2">
                                            <a href={`/articles/${article.slug}`} className="text-teal-700 hover:text-teal-900">
                                                {article.title}
                                            </a>
                                        </h3>
                                        <p className="text-gray-600 mb-4">{article.excerpt}</p>
                                        <p className="text-sm text-gray-500 mb-4">
                                            By {article.author?.name || 'Unknown'} • {new Date(article.published_at).toLocaleDateString()}
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            {article.categories?.map(cat => (
                                                <span key={cat.id} className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm">
                                                    {cat.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 text-center">
                            <p className="text-white text-lg">No articles yet. Check back soon!</p>
                        </div>
                    )}
                </div>

                {/* Categories */}
                <div>
                    <h2 className="text-4xl font-bold text-white mb-8 text-center">Browse by Category</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {categories.map(category => (
                            <a key={category.id} href={`/category/${category.slug}`} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:bg-white/20 transition transform hover:scale-105">
                                <div className="text-white font-semibold text-lg">{category.name}</div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// Initialize React
document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app');
    if (root) {
        ReactDOM.createRoot(root).render(<WelcomeApp />);
    }
});


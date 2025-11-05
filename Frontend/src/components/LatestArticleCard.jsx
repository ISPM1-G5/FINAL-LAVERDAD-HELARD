import ArticleCard from './ArticleCard'; // Import the reusable card
import { Link } from 'react-router-dom';

// --- MOCK DATA ---
// Later, you will fetch this array from your Laravel API.
const mockArticles = [
  { 
    id: 1, 
    category: 'Feature', 
    title: 'The One Who Held The Light', 
    author: 'Ric-Julius P. Raguindin', 
    date: 'Sep 15, 2025', 
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Lighthouse at night
    excerpt: 'In the quiet coastal town, one man dedicated his life to guiding ships through the stormy nights...'
  },
  { 
    id: 2, 
    category: 'News', 
    title: '30 LVCC SOCIAL WORK PASSERS...', 
    author: 'Mishah S. Gatus', 
    date: 'Sep 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Graduation ceremony
    excerpt: 'Celebrating the achievement of 30 students from La Verdad Christian College who passed the Social Work Licensure Examination...'
  },
  { 
    id: 3, 
    category: 'News', 
    title: 'LVCC SEMINAR EMPOWERS...', 
    author: 'Prince Evert Ross', 
    date: 'Sep 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Seminar or workshop
    excerpt: 'A recent seminar at LVCC focused on empowering students with essential skills for future success...'
  },
  { 
    id: 4, 
    category: 'News', 
    title: 'SDERDDIO APALIT HOLDS...', 
    author: 'Prince Evert Ross', 
    date: 'Sep 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Community event
    excerpt: 'The Student Development and External Relations Department organized an event to foster community engagement...'
  },
  { 
    id: 5, 
    category: 'Opinion', 
    title: 'UPHOLDING PRICELESS TRUTH...', 
    author: 'Prince Evert Ross', 
    date: 'Sep 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Truth or justice theme
    excerpt: 'In a world of misinformation, upholding truth remains a cornerstone of journalistic integrity...'
  },
  { 
    id: 6, 
    category: 'Opinion', 
    title: 'Voice in Silence', 
    author: 'Evangeline T. Espiritu', 
    date: 'Sep 15, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Silence or reflection
    excerpt: 'Exploring the power of unspoken words and the stories they tell in our daily lives...'
  },
  { 
    id: 7, 
    category: 'Sports', 
    title: 'LVCC Basketball Team Wins Championship', 
    author: 'John Doe', 
    date: 'Sep 20, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Basketball game
    excerpt: 'The LVCC basketball team clinched the regional championship with an exciting overtime victory...'
  },
  { 
    id: 8, 
    category: 'Literary', 
    title: 'Poetry Night at the Campus Library', 
    author: 'Jane Smith', 
    date: 'Sep 22, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Books and poetry
    excerpt: 'Students gathered for an evening of spoken word and literary appreciation, showcasing original works...'
  },
  { 
    id: 9, 
    category: 'Features', 
    title: 'Student Innovators Showcase New Projects', 
    author: 'Alex Johnson', 
    date: 'Sep 25, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Innovation or tech project
    excerpt: 'Emerging student inventors presented groundbreaking ideas at the annual innovation fair...'
  },
  { 
    id: 10, 
    category: 'Specials', 
    title: 'Holiday Traditions in the Community', 
    author: 'Maria Garcia', 
    date: 'Sep 28, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Holiday celebration
    excerpt: 'Exploring the unique holiday customs and traditions upheld by the local community...'
  },
  { 
    id: 11, 
    category: 'Art', 
    title: 'Campus Art Exhibition Opens Doors', 
    author: 'Chris Lee', 
    date: 'Oct 1, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Art exhibition
    excerpt: 'A vibrant display of student artwork captivates visitors with diverse styles and themes...'
  },
  { 
    id: 12, 
    category: 'Lifestyle', 
    title: 'Wellness Tips for Busy Students', 
    author: 'Sarah Wilson', 
    date: 'Oct 5, 2025',
    imageUrl: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80', // Wellness or yoga
    excerpt: 'Practical advice on maintaining health and balance amidst academic pressures...'
  },
];
// --- END MOCK DATA ---


export default function LatestArticles() {
  return (
    <section id="articles" aria-labelledby="articles-heading" className="py-20 bg-gray-50 border-t border-gray-200 flex items-center justify-center min-h-screen">
      <div className="max-w-6xl mx-auto px-4 w-full">
        <h2 id="articles-heading" className="text-3xl font-bold text-gray-800 text-center">
          Latest Articles
        </h2>
        <p className="text-gray-600 text-center mt-2 mb-10">
          Sign in to read the full articles.
        </p>
        
        {/* Article Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Loop over the mockArticles array and render a card for each one */}
          {mockArticles.map((article) => (
            <ArticleCard
              key={article.id} // The 'key' prop is essential for React lists
              category={article.category}
              title={article.title}
              author={article.author}
              date={article.date}
              imageUrl={article.imageUrl}
              excerpt={article.excerpt}
            />
          ))}
        </div>
        
        {/* "Sign In" Button */}
        <div className="text-center mt-12">
          <Link
            to="/login" // Link to the login page
            className="bg-gray-700 text-white px-10 py-3.5 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors"
          >
            Sign in to Read More
          </Link>
        </div>
      </div>
    </section>
  );
}
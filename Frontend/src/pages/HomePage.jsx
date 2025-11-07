import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ContentSection from '../components/ContentSection';
import ArticleCard from '../components/DashArticle';
import LatestSection from '../components/LatestSection';
import EmptyState from '../components/EmptyState';
import Navigation from '../components/HeaderLink';



// Placeholder data for the articles
const newsArticles = [
  { id: 1, img: 'https://via.placeholder.com/300x200?text=News+1', title: 'DOST-TAPI presents pre-com, com assistance programs to ...', excerpt: 'Technology Application and Promotion Institute...', category: 'News' },
  { id: 2, img: 'https://via.placeholder.com/300x200?text=News+2', title: 'LVH senior editor lectures on campus journalism at Batangas...', excerpt: 'La Verdad Herald\'s (LVH) senior editor...', category: 'News' },
  { id: 3, img: 'https://via.placeholder.com/300x200?text=News+3', title: 'MCGI-La Verdad tie-up offers free college education anew', excerpt: 'The Members Church of God International (MCGI)...', category: 'News' },
  { id: 4, img: 'https://via.placeholder.com/300x200?text=News+4', title: 'La Verdad remains region’s ‘Best Performing School’', excerpt: 'La Verdad Christian College (LVCC) Apalit...', category: 'News' },
];

const literaryArticles = [
  { id: 1, img: 'https://via.placeholder.com/300x200?text=Literary+1', title: 'The Old Pool\'s Life-Bed', category: 'Literary' },
  { id: 2, img: 'https://via.placeholder.com/300x200?text=Literary+2', title: 'The Scream', category: 'Literary' },
  { id: 3, img: 'https://via.placeholder.com/300x200?text=Literary+3', title: 'The Sun Rises in the East', category: 'Literary' },
  { id: 4, img: 'https://via.placeholder.com/300x200?text=Literary+4', title: 'The Girl in the Story', category: 'Literary' },
];

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <Navigation />

      <main className="container mx-auto px-4 py-8 grow">
        {/* --- Latest Section --- */}
        <LatestSection />

        {/* --- News Section --- */}
        <ContentSection title="NEWS" bgColor="bg-blue-600" viewAllUrl="/#/category/news">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {newsArticles.map(article => (
              <ArticleCard 
                key={article.id}
                imageUrl={article.img}
                title={article.title}
                excerpt={article.excerpt}
                category={article.category}
              />
            ))}
          </div>
        </ContentSection>

        {/* --- Literary Section --- */}
        <ContentSection title="LITERARY" bgColor="bg-green-600" viewAllUrl="/#/category/literary">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
            {literaryArticles.map(article => (
              <ArticleCard 
                key={article.id}
                imageUrl={article.img}
                title={article.title}
                category={article.category}
              />
            ))}
          </div>
        </ContentSection>

        {/* --- Specials Section --- */}
        <ContentSection title="SPECIALS" bgColor="bg-purple-600" viewAllUrl="/#/category/specials">
          {/* You can map over 'specials' articles here just like the sections above */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-4">
             {/* Add ArticleCard components here */}
             <p className="text-gray-500 col-span-4">Specials articles would go here...</p>
          </div>
        </ContentSection>

        {/* --- Opinion Section --- */}
        <ContentSection title="OPINION" bgColor="bg-gray-700" viewAllUrl="/#/category/opinion">
           <div className="mt-4">
             {/* Add Opinion cards here */}
             <p className="text-gray-500">Opinion articles would go here...</p>
           </div>
        </ContentSection>
        
        {/* --- Art Section --- */}
        <ContentSection title="ART" bgColor="bg-indigo-500" viewAllUrl="/#/category/art">
           <div className="mt-4">
             {/* Add Art cards here */}
             <p className="text-gray-500">Art pieces would go here...</p>
           </div>
        </ContentSection>

        {/* --- Features Section --- */}
        <ContentSection title="FEATURES" bgColor="bg-yellow-500" viewAllUrl="/#/category/features">
           <EmptyState categoryName="Features" />
        </ContentSection>

        {/* --- Sports Section --- */}
        <ContentSection title="SPORTS" bgColor="bg-red-600" viewAllUrl="/#/category/sports">
           <EmptyState categoryName="Sports" />
        </ContentSection>

      </main>

      <Footer />
    </div>
  );
}
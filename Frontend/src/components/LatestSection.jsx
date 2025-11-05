import React from 'react';

export default function LatestSection() {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-bold text-gray-800 mb-4 pb-2 border-b-2 border-blue-600">
        Latest
      </h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Article (Left) */}
        <div className="lg:col-span-2 bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
          <img 
            src="https://via.placeholder.com/600x400?text=Editorial+Cartoon" 
            alt="The Ones Who Light Our Path" 
            className="w-full h-auto object-cover"
          />
          <div className="p-6">
            <h3 className="font-bold text-2xl text-gray-800 mb-2">
              The Ones Who Light Our Path
            </h3>
            <p className="text-gray-600 mb-4">
              EDITORIAL. We all have that one person in life whom we look up to the most. Someone who set a good example for us...
            </p>
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Read More &gt;
            </a>
          </div>
        </div>

        {/* Side Articles (Right) */}
        <div className="lg:col-span-1 flex flex-col space-y-6">
          {/* Side Article 1 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <img 
              src="https://via.placeholder.com/300x200?text=Scipop" 
              alt="Scipop" 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-1">Scipop</h4>
              <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
                Read More &gt;
              </a>
            </div>
          </div>
          
          {/* Side Article 2 */}
          <div className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
            <img 
              src="https://via.placeholder.com/300x200?text=What+I've+Been" 
              alt="What I've Been" 
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h4 className="font-bold text-lg text-gray-800 mb-1">What I've Been</h4>
              <a href="#" className="text-blue-600 font-semibold text-sm hover:underline">
                Read More &gt;
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
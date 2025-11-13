import React from 'react';
import Header from '../components/Header'; // Re-using header
import Footer from '../components/Footer'; // Re-using footer
import AccountSettings from '../components/AccountSettings';

const AccountPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="grow container mx-auto px-4">
        <AccountSettings />
      </main>
      
      <Footer />
    </div>
  );
};

export default AccountPage;
import React from 'react';
import FlashMessage from '@/components/flashmessage';
import Footer from '@/components/footer';
import Header from '@/components/header';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <FlashMessage />
      <div className="bg-black">
        <Header />
      </div>
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatWidget from '../components/ChatWidget';

export default function PublicLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const element = document.getElementById(location.hash.slice(1));
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <div key={location.pathname} className="page-wrapper page-transition">
          <Outlet />
        </div>
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

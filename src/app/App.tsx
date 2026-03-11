import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header } from './components/header';
import { HeroCarousel } from './components/hero-carousel';
import { Catalog } from './components/catalog';
import { About } from './components/about';
import { Footer } from './components/footer';
import { AdminPanel } from './components/admin/AdminPanel';
import { Toaster } from 'sonner';

function LandingPage() {
  const scrollToFooter = () => {
    document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <Header onContactClick={scrollToFooter} />
      <HeroCarousel />
      <Catalog onRequestInfo={scrollToFooter} />
      <About />
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
      <Toaster position="top-right" richColors />
    </div>
  );
}

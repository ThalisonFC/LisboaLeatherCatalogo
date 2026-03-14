import { Header } from './components/header';
import { Hero } from './components/hero';
import { Catalog } from './components/catalog';
import { Footer } from './components/footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <Hero />
      <Catalog />
      <Footer />
    </div>
  );
}

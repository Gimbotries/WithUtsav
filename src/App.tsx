import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import Marquee from './sections/Marquee';
import PainPoints from './sections/PainPoints';
import ProductDemos from './sections/ProductDemos';
import USPStrip from './sections/USPStrip';
import Portfolio from './sections/Portfolio';
import Testimonials from './sections/Testimonials';
import Services from './sections/Services';
import Contact from './sections/Contact';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach((el) => {
      const delay = parseFloat(el.getAttribute('data-delay') || '0');
      gsap.fromTo(
        el,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Navigation />
      <Hero />
      <Marquee />
      <ProductDemos />
      <PainPoints />
      <USPStrip />
      <Portfolio />
      <Testimonials />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

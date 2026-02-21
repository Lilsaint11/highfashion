import Layout from '@/components/layout';
import React, { useEffect, useRef } from 'react';
// import Layout from '@/components/Layout';

const About = () => {
  const bannerContentRef = useRef(null);

  useEffect(() => {
    const bannerContent = bannerContentRef.current;
    
    // Throttle function to optimize scroll performance
    const throttle = (func, limit) => {
      let inThrottle: boolean;
      return (...args) => {
        if (!inThrottle) {
          func(...args);
          inThrottle = true;
          setTimeout(() => (inThrottle = false), limit);
        }
      };
    };

    // Scroll handler
    const handleScroll = throttle(() => {
      const scrollPosition = window.scrollY;
      const speed = -0.1; // Adjust for subtle upward movement (smaller = slower)
      bannerContent.style.transform = `translate(-50%, calc(-50% + ${scrollPosition * speed}px))`;
    }, 16); // ~60fps

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);

    // Initial call to set position
    handleScroll();

    // Cleanup on unmount
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Layout>
        <div className="relative h-screen overflow-hidden flex items-center justify-center">
            {/* Background */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 to-black/40 bg-[url('/images/about1.webp')] bg-cover bg-center"></div>
            
            {/* Content with Parallax Effect */}
            <div
            ref={bannerContentRef}
            className="absolute top-1/2 left-1/2  z-10 text-center text-white transition-transform duration-300 ease-out max-w-2xl px-8 w-full h-full bg-[rgba(0,0,0,0.2)] flex justify-center items-center"
            >
            <h1 className="text-5xl md:text-6xl md:font-bold mb-6 opacity-90">OUR STORY</h1>
        
            </div>
        </div>
        <div>
            
        </div>
        <div className='my-12 flex flex-col gap-7 px-10'>
            <p className='text-xs text-center  leading-5'>AT HIGH FASHION BY JOL, WE BELIEVE THAT FASHION IS AN EXPRESSION OF INDIVIDUALITY AND ARTISTRY. WE STRIVE TO CREATE EXQUISITE GARMENTS THAT EMBODY SOPHISTICATION AND ELEVATE THE WEARER’S UNIQUE STYLE. OUR DEDICATION TO CRAFTSMANSHIP AND ATTENTION TO DETAIL ENSURE THAT EVERY PIECE IN OUR COLLECTION IS A MASTERPIECE.</p>

            <img src="/images/about2.webp" alt="" />

            <p className='text-sm text-center leading-6'>IN 2019, HIGHFASHIONBYJOL WAS FOUNDED BY RAHMAN JAGO, A VISIONARY DESIGNER WITH A PASSION FOR LUXURY FASHION. INSPIRED BY THE FLAIR FOR STREET FASHION, RAHMAN JAGO SET OUT TO CREATE A BRAND THAT WOULD REDEFINE ELEGANCE AND SET NEW STANDARDS OF UNMATCHED QUALITY. EACH MASTERPIECE WAS DESIGNED TO PROSELYTIZE STREET FASHION WITH LOVE AND TRUE DEVOTEDNESS ACROSS BORDERS AND BEYOND.</p>

            <img src="/images/about3.webp" alt="" />
        </div>
    </Layout>
  );
};

export default About;
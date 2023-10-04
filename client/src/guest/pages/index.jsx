import React from 'react';
import Hero from '../components/Hero'
import AboutSection1 from '../components/AboutSection1'
import AboutSection2 from '../components/AboutSection2'
import CTA from '../components/CTA'
import { useEffect } from 'react';

function Index() {
  useEffect(() => {
    document.title = 'AcadX';
  }, []);

  return (
    <>
      <div className="mx-auto" >
        <Hero/>
      </div>
      <div className="container grid mx-auto">

        <AboutSection1 />
        <AboutSection2 />
        <CTA />
      </div>
    </>
  );
}

export default Index;
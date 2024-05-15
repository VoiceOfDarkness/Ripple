import React, { useState, useEffect } from 'react';
import FooterSection from './FooterSection';
import FooterMain from './FooterMain';

export default function Footer() {
  const [isOpen, setIsOpen] = useState({
    services: false,
    company: false,
    legal: false,
    anotherLegal: false,
  });

  const [isMediumScreen, setIsMediumScreen] = useState(false);

  const toggleSection = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const sections = [
    {
      title: 'Services',
      links: ['Branding', 'Design', 'Marketing', 'Advertisement'],
      key: 'services',
    },
    {
      title: 'Company',
      links: ['About us', 'Contact', 'Jobs', 'Press kit'],
      key: 'company',
    },
    {
      title: 'Legal',
      links: ['Terms of use', 'Privacy policy', 'Cookie policy'],
      key: 'legal',
    },
    {
      title: 'Another Legal',
      links: ['Terms of use', 'Privacy policy', 'Cookie policy'],
      key: 'anotherLegal',
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMediumScreen(window.innerWidth >= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <footer className="footer p-10 bg-base-200 dark:bg-slate-800 text-base-content dark:text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {sections.map((section) => (
            <FooterSection
              key={section.key}
              title={section.title}
              links={section.links}
              isOpen={isOpen[section.key]}
              toggleSection={() => toggleSection(section.key)}
              isMediumScreen={isMediumScreen}
            />
          ))}
        </div>
      </footer>
      <FooterMain />
    </>
  );
}

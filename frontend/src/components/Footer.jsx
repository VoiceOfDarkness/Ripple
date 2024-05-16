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
      title: 'Categories',
      links: ['Graphics & Design', 'Digital Marketing', 'Writing & Translation', 'Video & Animation',"Music & Audio","Programming & Tech","Business","Lifestyle","Sitemap"],
      key: 'services',
    },
    {
      title: 'About',
      links: ['Careers', 'Press & News', 'Partnerships', 'Privacy Policy', 'Terms of Service', 'Intellectual Property Claims', 'Security', 'Sitemap'],
      key: 'company',
    },
    {
      title: 'Support and Education',
      links: ['Help & Support', 'Trust & Safety', 'Selling on Ripple', 'Buying on Ripple', 'Community', 'Events', 'Blog', 'Forum'],
      key: 'legal',
    },
    {
      title: 'Community',
      links: ['Customer Success Stories', 'Community Hub', 'Forum', 'Blog', 'Podcast', 'Affiliates', 'Videos', 'Developers', 'Sitemap'],
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
      <footer className="footer p-10 bg-base-200 text-base-content dark:text-white">
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

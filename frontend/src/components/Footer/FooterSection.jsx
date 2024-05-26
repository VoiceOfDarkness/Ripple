import React from "react";

const FooterSection = ({
  title,
  links,
  isOpen,
  toggleSection,
  isMediumScreen,
}) => {
  return (
    <nav className="block space-y-2">
      <button
        className="w-full flex justify-between items-center text-left md:text-xl font-bold"
        onClick={() => toggleSection()}
      >
        {title}
        {!isMediumScreen && (
          <svg
            className={`w-5 h-5 transition-transform transform ${
              isOpen ? "rotate-180" : ""
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        )}
      </button>
      {(isOpen || isMediumScreen) && (
        <div className="block space-y-2">
          {links.map((link, index) => (
            <a
              key={index}
              href="/"
              className="link link-hover block text-lg md:text-base "
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};

export default FooterSection;

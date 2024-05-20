export default function StarShape({ className, children }) {
  return (
    <div className={className}>
      <svg
        width="106"
        height="122"
        viewBox="0 0 106 122"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M29.5044 17.1608C37.3117 -5.02578 68.6883 -5.02578 76.4956 17.1608C78.3079 22.3108 81.762 26.7227 86.3266 29.7179L89.2188 31.6156C110.371 45.495 110.371 76.5041 89.2188 90.3834L86.3266 92.2811C81.762 95.2763 78.3079 99.6882 76.4956 104.838C68.6883 127.025 37.3117 127.025 29.5044 104.838C27.6921 99.6882 24.238 95.2763 19.6734 92.2811L16.7812 90.3834C-4.37096 76.5041 -4.37096 45.4949 16.7812 31.6156L19.6734 29.7179C24.238 26.7227 27.6921 22.3108 29.5044 17.1608Z"
          fill="black"
        />
      </svg>
      {children}
    </div>
  );
}

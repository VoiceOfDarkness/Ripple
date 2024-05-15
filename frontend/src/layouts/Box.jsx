export default function Box({ children, className }) {
  return (
    <div className={`w-128 p-14 m-auto max-lg:w-11/12 ${className || ""}`}>
      {children}
    </div>
  );
}

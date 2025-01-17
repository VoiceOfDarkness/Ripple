export default function Box({ children, className, style }) {
  return (
    <div
      className={`w-128 m-auto max-lg:w-11/12 ${className || ""}`}
      style={style}
    >
      {children}
    </div>
  );
}

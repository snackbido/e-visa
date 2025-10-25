export const Icon = ({ children, className }) => (
  <div
    className={`p-3 rounded-full bg-blue-100 text-blue-600 inline-block ${className}`}
  >
    {children}
  </div>
);

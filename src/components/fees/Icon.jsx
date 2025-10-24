const CheckCircle = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22 11.08V12a10 10 0 0 1-19.12 3.66" />
    <path d="m3 12-4.5 4.5" />
    <path d="m8 16 3 3 5-5" />
  </svg>
);
const CreditCard = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <line x1="2" x2="22" y1="10" y2="10" />
  </svg>
);
const PlaneLanding = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V5c0-1.38-1.12-2.5-2.5-2.5h-11A2.5 2.5 0 0 0 4 5.5v14z" />
    <path d="M4 15h11l-3 4-3-4Z" />
  </svg>
);
const HandCoins = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 15h2c1 0 2-1 2-2V7c0-1-1-2-2-2H9v6c0 1 1 2 2 2Z" />
    <path d="M22 10.51V10a2 2 0 0 0-2-2h-3" />
    <path d="M3 8a2 2 0 0 1 2-2h3" />
    <path d="M7.74 13.31A9 9 0 0 1 2 17c0 4 2 6 5 6h2.51" />
    <path d="M18.74 13.31A9 9 0 0 0 24 17c0 4-2 6-5 6h-2.51" />
    <path d="M12 7V3" />
    <path d="M12 17v4" />
  </svg>
);

export { CheckCircle, CreditCard, HandCoins, PlaneLanding };

export const ReviewRow = ({ label, value }) => (
  <dl className="flex items-center justify-between gap-4">
    <dt className="text-base font-normal text-gray-500">{label}</dt>
    <dd className="text-base font-medium text-gray-900">{value}</dd>
  </dl>
);

export const Service = () => {
  const services = [
    "Reviewing visa application details for accuracy",
    "Guiding travelers on documentation requirements",
    "Preparing and submitting visa applications",
    "Providing visa status updates via email",
    "Offering customer support from start to finish",
  ];

  return (
    <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
      {services.map((service, index) => (
        <li key={index} className="font-medium">
          {service}
        </li>
      ))}
    </ul>
  );
};

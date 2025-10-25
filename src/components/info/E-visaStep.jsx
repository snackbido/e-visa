export const EVisaStep = () => {
  const EvisaSteps = [
    {
      action: "Prepare Documents & Photos",
      detail:
        "Passport photo (4x6cm, white background) and a scan of your passport data page. Ensure images are clear and meet size requirements.",
    },
    {
      action: "Fill Out the Application Form",
      detail:
        "Complete the online form on the official portal, providing accurate passport, entry/exit, and residential details.",
    },
    {
      action: "Pay the E-visa Fee",
      detail:
        "Pay via the electronic payment gateway. The fee is non-refundable, regardless of approval.",
    },
    {
      action: "Receive and Check Result",
      detail:
        "Your application is typically processed in 3 working days. Check the 'E-visa Search' menu using your registration code.",
    },
    {
      action: "Print Your E-visa",
      detail:
        "If approved, print the E-visa PDF (full page) and carry it with your passport to present at the entry checkpoint.",
    },
  ];

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {EvisaSteps.map((step, index) => (
        <tr key={index} className="hover:bg-indigo-50 transition duration-150">
          <td className="px-6 py-4 whitespace-nowrap font-extrabold text-2xl text-indigo-600">
            {index + 1}
          </td>
          <td className="px-6 py-4 text-gray-800 font-medium">{step.action}</td>
          <td className="px-6 py-4 text-gray-600">{step.detail}</td>
        </tr>
      ))}
    </tbody>
  );
};

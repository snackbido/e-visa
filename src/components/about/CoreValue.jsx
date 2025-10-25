import { Icon } from "./Icon";

export const CoreValue = () => {
  const coreValues = [
    {
      name: "Integrity",
      description: "We operate with honesty and transparency.",
      icon: "✅",
    },
    {
      name: "Trust",
      description:
        "We focus on delivering reliable visa support that travelers can count on.",
      icon: "🤝",
    },
    {
      name: "Accuracy",
      description:
        "We carefully review each application to minimize rejection risks.",
      icon: "🔎",
    },
    {
      name: "Security",
      description: "We strictly protect customer data and confidentiality.",
      icon: "🔒",
    },
    {
      name: "Customer Care",
      description:
        "We provide responsive support for travelers at every stage.",
      icon: "🌟",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
      {coreValues.map((value) => (
        <div key={value.name} className="text-center p-4">
          <Icon className="mx-auto text-3xl mb-3">{value.icon}</Icon>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">
            {value.name}
          </h3>
          <p className="text-sm text-gray-600">{value.description}</p>
        </div>
      ))}
    </div>
  );
};

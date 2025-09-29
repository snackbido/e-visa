import Chart from "react-apexcharts";
import { useState, useEffect } from "react";

export default function MonthlyVisaChart({ data }) {
  const [visaData, setVisaData] = useState(Array(12).fill(0)); // Initialize with 12 zeros
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchVisaData() {
      try {
        // Process the data to get monthly counts
        const monthlyCounts = Array(12).fill(0);
        data.forEach((visa) => {
          const createdAt = new Date(visa.created_at);
          const month = createdAt.getMonth(); // 0-indexed month
          if (month >= 0 && month < 12) {
            monthlyCounts[month]++;
          }
        });

        setVisaData(monthlyCounts);
      } catch (error) {
        console.error("Failed to fetch visa data:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchVisaData();
  }, [data]);

  const options = {
    colors: ["#465fff"],
    chart: {
      fontFamily: "Outfit, sans-serif",
      type: "bar",
      height: 180,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "39%",
        borderRadius: 5,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 4,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Outfit",
    },
    yaxis: {
      title: {
        text: undefined,
      },
    },
    grid: {
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    fill: {
      opacity: 1,
    },

    tooltip: {
      x: {
        show: false,
      },
      y: {
        formatter: (val) => `${val}`,
      },
    },
  };

  const series = [
    {
      name: "Visa",
      data: visaData,
    },
  ];

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-5 pt-5 sm:px-6 sm:pt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">Monthly Visa</h3>
        <div className="relative inline-block"></div>
      </div>

      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <div className="-ml-5 min-w-[650px] xl:min-w-full pl-2">
          {isLoading ? (
            <p>Loading chart data...</p>
          ) : (
            <Chart options={options} series={series} type="bar" height={180} />
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import CountryMap from "./CountryMap";

export default function DemographicCard({ data, countries }) {
  const [backendData, setBackendData] = useState([]);
  const [countryStats, setCountryStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [flagLookup, setFlagLookup] = useState({});

  // Use useEffect to fetch data and process it when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      try {
        // --- Step 1: Fetch and process your local data.json file for flags ---
        const newFlagLookup = countries.reduce((acc, country) => {
          if (country.name && country.flags) {
            acc[country.name] = country.flags.svg; // Using SVG for better quality
          }
          return acc;
        }, {});
        setFlagLookup(newFlagLookup);

        // --- Step 2: Fetch data from your backend ---
        setBackendData(data);

        // --- Step 3: Calculate visa count and percentage for each country ---
        const countryCounts = {};
        data.forEach((user) => {
          const nationality = user.nationality;
          countryCounts[nationality] = (countryCounts[nationality] || 0) + 1;
        });

        const totalVisas = data.length;
        const processedStats = Object.entries(countryCounts).map(
          ([countryName, count]) => ({
            countryName: countryName,
            count: count,
            percentage: (count / totalVisas) * 100,
          })
        );

        // Sort the countries by count in descending order
        processedStats.sort((a, b) => b.count - a.count);

        setCountryStats(processedStats);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [data, countries]);

  // Handle loading state
  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] sm:p-6">
      <div className="flex justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
            Customers Demographic
          </h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">
            Number of customer based on country
          </p>
        </div>
      </div>
      <div className="px-4 py-6 my-6 overflow-hidden border border-gary-200 rounded-2xl dark:border-gray-800 sm:px-6">
        <div
          id="mapOne"
          className="mapOne map-btn -mx-4 -my-6 h-[212px] w-[252px] 2xsm:w-[307px] xsm:w-[358px] sm:-mx-6 md:w-[668px] lg:w-[634px] xl:w-[393px] 2xl:w-[554px]"
        >
          {/* Pass the backend data as a prop to the map component */}
          <CountryMap backendData={backendData} countries={countries} />
        </div>
      </div>

      <div className="space-y-5">
        {countryStats.map((country, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="items-center w-full rounded-full max-w-8">
                <img
                  src={flagLookup[country.countryName]} // Use the dynamically retrieved flag URL
                  alt={`${country.countryName} flag`}
                />
              </div>
              <div>
                <p className="font-semibold text-gray-800 text-theme-sm dark:text-white/90">
                  {country.countryName}
                </p>
                <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                  {country.count} Customers
                </span>
              </div>
            </div>
            <div className="flex w-full max-w-[140px] items-center gap-3">
              <div className="relative block h-2 w-full max-w-[100px] rounded-sm bg-gray-200 dark:bg-gray-800">
                <div
                  className="absolute left-0 top-0 flex h-full items-center justify-center rounded-sm bg-brand-500 text-xs font-medium text-white"
                  style={{ width: `${country.percentage.toFixed(0)}%` }}
                ></div>
              </div>
              <p className="font-medium text-gray-800 text-theme-sm dark:text-white/90">
                {country.percentage.toFixed(0)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

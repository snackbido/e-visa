import { VectorMap } from "@react-jvectormap/core";
import { worldMill } from "@react-jvectormap/world";
import { useState, useEffect } from "react";
import axios from "../../../axios/axios";

// Define the component props
const CountryMap = ({ mapColor, countries }) => {
  const [markers, setMarkers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This is the function that will handle all data fetching and processing
    const fetchDataAndGenerateMarkers = async () => {
      try {
        // --- Step 1: Fetch and process your local data.json file ---
        const countryLookup = countries.reduce((acc, country) => {
          // Check if latlng data exists and it's a valid array
          if (country.latlng && country.latlng.length === 2) {
            acc[country.name] = country.latlng;
          }
          return acc;
        }, {});

        // --- Step 2: Fetch data from your backend ---
        const { data } = await axios.get("/visa");

        // --- Step 3: Combine data and generate the markers array ---
        const newMarkers = data.data
          .map((user) => {
            const countryName = user.nationality;
            const latLng = countryLookup[countryName];
            if (latLng) {
              return {
                latLng: latLng,
                name: countryName,
                style: {
                  fill: "#465FFF",
                  borderWidth: 1,
                  borderColor: "white",
                  stroke: "#383f47",
                },
              };
            }
            return null;
          })
          .filter(Boolean); // Filter out any null values

        setMarkers(newMarkers);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchDataAndGenerateMarkers();
  }, [countries]); // The empty dependency array ensures this runs only once on mount

  if (isLoading) {
    return <div>Loading map data...</div>;
  }

  return (
    <VectorMap
      map={worldMill}
      backgroundColor="transparent"
      markerStyle={{
        initial: {
          fill: "#465FFF",
          r: 4,
        },
      }}
      markersSelectable={true}
      markers={markers} // Use the dynamically generated markers state
      zoomOnScroll={false}
      zoomMax={12}
      zoomMin={1}
      zoomAnimate={true}
      zoomStep={1.5}
      regionStyle={{
        initial: {
          fill: mapColor || "#D0D5DD",
          fillOpacity: 1,
          fontFamily: "Outfit",
          stroke: "none",
          strokeWidth: 0,
          strokeOpacity: 0,
        },
        hover: {
          fillOpacity: 0.7,
          cursor: "pointer",
          fill: "#465fff",
          stroke: "none",
        },
        selected: {
          fill: "#465FFF",
        },
        selectedHover: {},
      }}
      regionLabelStyle={{
        initial: {
          fill: "#35373e",
          fontWeight: 500,
          fontSize: "13px",
          stroke: "none",
        },
        hover: {},
        selected: {},
        selectedHover: {},
      }}
    />
  );
};

export default CountryMap;

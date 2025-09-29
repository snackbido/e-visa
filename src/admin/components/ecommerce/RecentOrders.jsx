import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import axios from "../../../axios/axios";
import { useNavigate } from "react-router-dom";

export default function RecentOrders({ data, countries }) {
  const [payments, setPayments] = useState([]);
  const [flagLookup, setFlagLookup] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getPayments = async () => {
      const newFlagLookup = countries.reduce((acc, country) => {
        if (country.name && country.flags) {
          acc[country.name] = country.flags.svg; // Using SVG for better quality
        }
        return acc;
      }, {});
      setFlagLookup(newFlagLookup);
      const { data } = await axios.get("/payment");
      if (data.status === "success") {
        setPayments(data.data);
        setIsLoading(false);
      }
    };
    getPayments();
  }, [countries]);
  console.log(data);
  console.log(payments.find((e) => e.visa_id));
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-indigo-500"></div>
            <p className="mt-4 text-lg text-gray-700">Loading profile...</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Visas
              </h3>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/admin/visa-management")}
                className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800"
              >
                See all
              </button>
            </div>
          </div>
          <div className="max-w-full overflow-x-auto">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-gray-100  border-y">
                <TableRow>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs"
                  >
                    Full Name
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs"
                  >
                    Price
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs"
                  >
                    Nationality
                  </TableCell>
                  <TableCell
                    isHeader
                    className="py-3 font-medium text-gray-500 text-start text-theme-xs"
                  >
                    Status
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}

              <TableBody className="divide-y divide-gray-100">
                {data.slice(0, 4).map((e) => (
                  <TableRow key={e.id} className="">
                    <TableCell className="py-3">
                      <div className="flex items-center gap-3">
                        <div>
                          <p className="font-medium text-gray-800 text-theme-sm">
                            {e.last_name + " " + e.first_name}
                          </p>
                          <span className="text-gray-500 text-theme-xs">
                            {e.applicant.length + " Applicants"}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm">
                      {payments.find((p) => p.visa_id === e.id)?.amount}$
                      {/* {console.log(payments.find((p) => p.visa_id === e.id))} */}
                    </TableCell>
                    <TableCell className="py-3 flex items-center text-gray-500 text-theme-sm">
                      <div className="h-[45px] w-[45px] overflow-hidden rounded-lg">
                        <img
                          src={flagLookup[e.nationality]}
                          className="h-[45px] w-[45px] rounded-3xl"
                          alt={e.nationality}
                        />
                      </div>
                      <span className="ml-1">{e.nationality}</span>
                    </TableCell>
                    <TableCell className="py-3 text-gray-500 text-theme-sm">
                      {e.status}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  );
}

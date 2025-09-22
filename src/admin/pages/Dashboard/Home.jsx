import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
import RecentOrders from "../../components/ecommerce/RecentOrders";
import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";
import { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import countries from "../../../data.json";

export default function HomeDashboard() {
  const [visa, setVisa] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const getVisas = async () => {
      const { data } = await axios.get("/visa");
      if (data.status === "success") {
        setVisa(data.data);
      }
    };
    const getUsers = async () => {
      const { data } = await axios.get("/user");
      if (data.status === "success") {
        setUser(data.data);
      }
    };
    getVisas();
    getUsers();
  }, []);
  return (
    <>
      <PageMeta
        title="React.js Ecommerce Dashboard | TailAdmin - React.js Admin Dashboard Template"
        description="This is React.js Ecommerce Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics visa={visa} user={user} />

          <MonthlySalesChart data={visa} />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard data={visa} countries={countries} />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders data={visa} countries={countries} />
        </div>
      </div>
    </>
  );
}

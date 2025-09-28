import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import ComponentCard from "../../components/common/ComponentCard";
import { useEffect, useState } from "react";
import axios from "../../../axios/axios";
import { toast, ToastContainer } from "react-toastify";

export function Visa() {
  const type = "visa";
  const [visas, setVisas] = useState([]);
  const [info, setInfo] = useState({ status: "", id: "" });

  useEffect(() => {
    const getVisas = async () => {
      const { data } = await axios.get("/visa");
      if (data.status === "success") {
        setVisas(data.data);
      }
    };
    getVisas();
  }, []);

  const handleChangeStatus = async () => {
    if (info.status === "") {
      toast.success("No data change");
      return;
    }

    const { data } = await axios.patch(`/visa/${info.id}`, {
      status: info.status,
    });

    if (data.status === "success") {
      toast.success(data.data);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    }
  };

  const handleDownload = () => {
    const csvHeader =
      "First Name,Last Name,Phone Number,Email,Nationality,Time Of Visa,TypeOfVisa,Processing Time,Purpose Of Visit,Arrival Of Date,Arrival Border,Applicant,Status\n";
    const csvBody = visas
      .map(
        (v) =>
          `${v.first_name},${v.last_name},${v.phone_number},${v.email},${v.nationality},${v.time_of_visa},${v.type_of_visa.replaceAll(",", "-")},${v.processing_time},${v.purpose_of_visit},${v.date_of_arrival},${v.arrival_border},${v.applicant.length},${v.status}`
      )
      .join("\n");
    const csvContent = csvHeader + csvBody;
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "visas.csv";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <ComponentCard
        title="Visa management"
        type={type}
        handleDownload={handleDownload}
        handleChangeStatus={handleChangeStatus}
      >
        <BasicTableOne type={type} data={visas} setInfo={setInfo} />
      </ComponentCard>
      <ToastContainer />
    </>
  );
}

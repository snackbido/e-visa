import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";
import ComponentCard from "../../components/common/ComponentCard";
import { useEffect, useState } from "react";
import moment from "moment";
import axios from "../../../axios/axios";
import { toast } from "react-toastify";

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
      "First Name,Last Name,Phone Number,Email,Nationality,Time Of Visa,Type Of Visa,Processing Time,Purpose Of Visit,Arrival Of Date,Arrival Border,Passport Name,Passport Number,Gender,Portrait Photo,Passport Number,Emergency Full Name,Emergency Phone Number,Emergency Relationship,Status\n";
    const csvBody = visas
      .flatMap((v) => {
        return v.applicant.map((applicant, index) => {
          const visaType = v.type_of_visa
            ? v.type_of_visa.replaceAll(",", "-")
            : "";
          const mainPhoneNumber = v.country_code + " " + v.phone_number;
          const emergencyPhoneNumber = v.emergency_contact
            ? v.emergency_contact.country_code +
              " " +
              v.emergency_contact.phone_number
            : "";
          const emergencyFullName = v.emergency_contact
            ? v.emergency_contact.full_name
            : "";
          const emergencyRelationship = v.emergency_contact
            ? v.emergency_contact.relationship
            : "";

          return `${v.first_name},${v.last_name},${mainPhoneNumber},${
            v.email
          },${v.nationality},${v.time_of_visa},${visaType},${
            v.processing_time
          },${v.purpose_of_visit},${moment(v.date_of_arrival).format(
            "DD/MM/YYYY"
          )},${v.arrival_border},${applicant.passport_name},${
            applicant.passport_number
          },${applicant.gender},${applicant.avatar},${
            applicant.passport_image
          },${emergencyFullName},${emergencyPhoneNumber},${emergencyRelationship},${
            v.status
          }`;
        });
      })
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
    </>
  );
}

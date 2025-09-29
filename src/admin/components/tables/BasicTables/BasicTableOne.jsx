import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../ui/table";
import countries from "../../../../data.json";
import UpdateUserModal from "../../../components/user/UpdateUser";
import axios from "../../../../axios/axios";
import { toast } from "react-toastify";
import ApplicantDetailModal from "../../applicant/Applicant";

export default function BasicTableOne({ type, data, setInfo }) {
  const [flag, setFlag] = useState([]);
  const [isOpen, setIsOpen] = useState(false); // State để kiểm soát modal UpdateUser
  const [selectedUser, setSelectedUser] = useState(null); // State để lưu thông tin người dùng được chọn

  // States cho ApplicantDetailModal
  const [isApplicantModalOpen, setIsApplicantModalOpen] = useState(false);
  const [selectedApplicants, setSelectedApplicants] = useState([]);

  useEffect(() => {
    const newFlagLookup = countries.reduce((acc, country) => {
      if (country.name && country.flags) {
        acc[country.name] = country.flags.svg; // Using SVG for better quality
      }
      return acc;
    }, {});
    setFlag(newFlagLookup);
  }, []);

  const handleUpdateClick = (user) => {
    setSelectedUser(user);
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
    setSelectedUser(null);
  };

  // Handlers cho ApplicantDetailModal
  const handleApplicantClick = (applicants) => {
    setSelectedApplicants(applicants);
    setIsApplicantModalOpen(true);
  };

  const handleCloseApplicantModal = () => {
    setIsApplicantModalOpen(false);
    setSelectedApplicants([]);
  };

  const handleUpdate = async (body) => {
    const { data } = await axios.put(`/user/${selectedUser.id}`, body);

    if (data.status === "success") {
      toast.success(data.data);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const handleDelete = async (id) => {
    console.log(id);
    const { data } = await axios.delete(`/user/${id}`);
    if (data.status === "success") {
      toast.success(data.data);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const status = ["Approved", "Waiting Approve", "Rejected", "Unpaid"];
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          {type === "visa" ? (
            <TableHeader className="border-b border-gray-100 ">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Full Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Phone Number
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Nationality
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Time Of Visa
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Type Of Visa
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Processing Time
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Purpose Of Visit
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Arrival Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Arrival Border
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Applicants
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
          ) : (
            <TableHeader className="border-b border-gray-100">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  First Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Last Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Phone Number
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Nationality
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Role
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
          )}

          {/* Table Body */}
          {type === "visa" ? (
            <TableBody className="divide-y divide-gray-100">
              {data.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm">
                          {data.last_name + " " + data.first_name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                    {data.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                    <div className="flex -space-x-2">{data.phone_number}</div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                    <div className="flex items-center justify-around">
                      <span>{data.nationality}</span>
                      <div className="w-6 h-6 overflow-hidden border-2 border-white rounded-full">
                        <img
                          width={24}
                          height={24}
                          alt=""
                          src={flag[data.nationality]}
                          className="w-full size-6"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    {data.time_of_visa}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    {data.type_of_visa}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    {data.processing_time}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    {data.purpose_of_visit}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    {data.date_of_arrival}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    {data.arrival_border}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    <span className="text-gray-700 font-medium">
                      {data.applicant.length}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    <select
                      id="status"
                      name="status"
                      onChange={(e) =>
                        setInfo(() => ({
                          status: e.target.value,
                          id: data.id,
                        }))
                      }
                      disabled={data.status === "Unpaid" ? true : false}
                      className={`${
                        data.status === "Approved"
                          ? "bg-green-500"
                          : data.status === "Waiting Approve"
                          ? "bg-yellow-400"
                          : data.status === "Unpaid"
                          ? "bg-gray-400"
                          : "bg-red-500"
                      } text-white rounded-lg p-1 font-bold`}
                    >
                      <option value={data.status}>{data.status}</option>
                      {status
                        .filter((e) => e !== data.status)
                        .map((e, i) => (
                          <option key={i} value={e}>
                            {e}
                          </option>
                        ))}
                    </select>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    <button
                      className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-xs rounded-lg transition-colors duration-200 font-medium"
                      onClick={() => handleApplicantClick(data.applicant)}
                    >
                      View More
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <TableBody className="divide-y divide-gray-100">
              {data.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm">
                          {data.first_name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm">
                          {data.last_name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                    {data.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                    <div className="flex -space-x-2">
                      {data.phone_number || "No information"}
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                    <div className="flex items-center">
                      <span>{data.nationality || "No information"}</span>
                      <div className="w-6 h-6 overflow-hidden border-2 border-white rounded-full">
                        {data.nationality && (
                          <img
                            width={24}
                            height={24}
                            src={flag[data.nationality]}
                            alt=""
                            className="w-full size-6"
                          />
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                    {data.role}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm">
                    <div className="flex">
                      <button
                        className="p-2 bg-blue-500 mr-2 text-white rounded-lg"
                        onClick={() => handleUpdateClick(data)}
                      >
                        Update
                      </button>
                      <button
                        className="p-2 bg-green-500 text-white rounded-lg"
                        onClick={() => handleDelete(data.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>

        {/* Modal cho UpdateUser */}
        {type !== "visa" && (
          <UpdateUserModal
            isOpen={isOpen}
            onClose={handleCloseModal}
            userData={selectedUser}
            onUpdate={handleUpdate}
          />
        )}

        {/* Modal cho ApplicantDetail */}
        <ApplicantDetailModal
          isOpen={isApplicantModalOpen}
          onClose={handleCloseApplicantModal}
          applicants={selectedApplicants}
        />
      </div>
    </div>
  );
}

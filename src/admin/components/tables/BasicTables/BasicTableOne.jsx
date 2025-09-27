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
    const { data } = await axios.patch(`/user/${selectedUser.id}`, body);

    if (data.status === "success") {
      toast.success(data.data);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const handleDelete = async (id) => {
    const { data } = await axios.delete(`/user/${id}`);
    if (data.status === "success") {
      toast.success(data.data);
      setTimeout(() => {
        window.location.reload();
      }, 3000);
    }
  };

  const status = ["Approved", "Waiting Approve", "Rejected"];
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <Table>
          {/* Table Header */}
          {type === "visa" ? (
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Full Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Phone Number
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nationality
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Time Of Visa
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Type Of Visa
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Processing Time
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Purpose Of Visit
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Arrival Date
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Arrival Border
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Applicants
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
          ) : (
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  First Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Last Name
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Phone Number
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Nationality
                </TableCell>

                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Role
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >
                  Actions
                </TableCell>
              </TableRow>
            </TableHeader>
          )}

          {/* Table Body */}
          {type === "visa" ? (
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {data.last_name + " " + data.first_name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {data.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">{data.phone_number}</div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center justify-around">
                      <span>{data.nationality}</span>
                      <div className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900">
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
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {data.time_of_visa}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {data.type_of_visa}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {data.processing_time}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {data.purpose_of_visit}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {data.date_of_arrival}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    {data.arrival_border}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <span className="text-gray-700 dark:text-gray-300 font-medium">
                      {data.applicant.length}
                    </span>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <select
                      id="status"
                      name="status"
                      onChange={(e) =>
                        setInfo(() => ({
                          status: e.target.value,
                          id: data.id,
                        }))
                      }
                      className={`${
                        data.status === "Approved"
                          ? "bg-green-500"
                          : data.status === "Waiting Approve"
                          ? "bg-yellow-400"
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
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
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
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {data.map((data) => (
                <TableRow key={data.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {data.first_name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {data.last_name}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {data.email}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex -space-x-2">{data.phone_number}</div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center">
                      <span>{data.nationality}</span>
                      <div className="w-6 h-6 overflow-hidden border-2 border-white rounded-full dark:border-gray-900">
                        <img
                          width={24}
                          height={24}
                          src={flag[data.nationality]}
                          alt=""
                          className="w-full size-6"
                        />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    {data.role}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-theme-sm dark:text-gray-400">
                    <div className="flex">
                      <button
                        className="p-2 bg-blue-500 mr-2 text-white rounded-lg"
                        onClick={() => handleUpdateClick(data)}
                      >
                        Update
                      </button>
                      <button
                        className="p-2 bg-green-500 text-white rounded-lg"
                        onclick={() => handleDelete(data.id)}
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

import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

const ApplicantDetailModal = ({ isOpen, onClose, applicants }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Applicant Details ({applicants?.length || 0} applicants)
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {applicants && applicants.length > 0 ? (
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
              <div className="max-w-full overflow-x-auto">
                <Table>
                  <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                    <TableRow>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        STT
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Tên trên Passport
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Số hiệu Passport
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Giới tính
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Ảnh 3x4
                      </TableCell>
                      <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-sm dark:text-gray-400"
                      >
                        Ảnh Passport
                      </TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                    {applicants.map((applicant, index) => (
                      <TableRow key={applicant.id || index}>
                        <TableCell className="px-5 py-4 text-start">
                          <span className="font-medium text-gray-800 text-sm dark:text-white/90">
                            {index + 1}
                          </span>
                        </TableCell>
                        <TableCell className="px-5 py-4 text-start">
                          <span className="font-medium text-gray-800 text-sm dark:text-white/90">
                            {applicant.passport_name ||
                              applicant.full_name ||
                              "N/A"}
                          </span>
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-start text-sm dark:text-gray-400">
                          {applicant.passport_number || "N/A"}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-gray-500 text-start text-sm dark:text-gray-400">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              applicant.gender === "Male" ||
                              applicant.gender === "Nam"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                                : applicant.gender === "Female" ||
                                  applicant.gender === "Nữ"
                                ? "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                            }`}
                          >
                            {applicant.gender || "N/A"}
                          </span>
                        </TableCell>
                        <TableCell className="px-5 py-4 text-start">
                          {applicant.photo_3x4 ? (
                            <div className="w-16 h-20 overflow-hidden rounded border border-gray-200 dark:border-gray-600">
                              <image
                                src={applicant.photo_3x4}
                                alt="3x4 photo"
                                className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                                onClick={() =>
                                  window.open(applicant.photo_3x4, "_blank")
                                }
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-20 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                No image
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="px-5 py-4 text-start">
                          {applicant.passport_photo ? (
                            <div className="w-20 h-16 overflow-hidden rounded border border-gray-200 dark:border-gray-600">
                              <image
                                src={applicant.passport_photo}
                                alt="Passport photo"
                                className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                                onClick={() =>
                                  window.open(
                                    applicant.passport_photo,
                                    "_blank"
                                  )
                                }
                              />
                            </div>
                          ) : (
                            <div className="w-20 h-16 bg-gray-100 dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 flex items-center justify-center">
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                No image
                              </span>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-400">
                Không có thông tin applicant
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailModal;

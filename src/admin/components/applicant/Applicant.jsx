import EmergencyContact from "../emergency/Emergency.";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

const ApplicantDetailModal = ({ isOpen, onClose, data, type }) => {
  if (!isOpen) return null;
  console.log(data);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white rounded-lg shadow-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {type === "applicant"
              ? `Applicant Details (${data?.length || 0} applicants)`
              : "Emergency Contact"}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg
              className="w-5 h-5 text-gray-500"
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
          {type === "applicant" ? (
            data && data.length > 0 ? (
              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
                <div className="max-w-full overflow-x-auto">
                  <Table>
                    <TableHeader className="border-b border-gray-100">
                      <TableRow>
                        <TableCell
                          isHeader
                          className="px-5 py-3 font-medium text-gray-500 text-start text-sm"
                        >
                          STT
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-5 py-3 font-medium text-gray-500 text-start text-sm"
                        >
                          Passport Name
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-5 py-3 font-medium text-gray-500 text-start text-sm"
                        >
                          Passport Number
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-5 py-3 font-medium text-gray-500 text-start text-sm"
                        >
                          Gender
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-5 py-3 font-medium text-gray-500 text-start text-sm"
                        >
                          Portrait photo
                        </TableCell>
                        <TableCell
                          isHeader
                          className="px-5 py-3 font-medium text-gray-500 text-start text-sm"
                        >
                          Passport data page
                        </TableCell>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-100">
                      {data.map((applicant, index) => (
                        <TableRow key={applicant.id || index}>
                          <TableCell className="px-5 py-4 text-start">
                            <span className="font-medium text-gray-800 text-sm">
                              {index + 1}
                            </span>
                          </TableCell>
                          <TableCell className="px-5 py-4 text-start">
                            <span className="font-medium text-gray-800 text-sm">
                              {applicant.passport_name ||
                                applicant.full_name ||
                                "N/A"}
                            </span>
                          </TableCell>
                          <TableCell className="px-5 py-4 text-gray-500 text-start text-sm">
                            {applicant.passport_number || "N/A"}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-gray-500 text-start text-sm">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                applicant.gender === "male" ||
                                applicant.gender === "Nam"
                                  ? "bg-blue-100 text-blue-800"
                                  : applicant.gender === "female" ||
                                    applicant.gender === "Nữ"
                                  ? "bg-pink-100 text-pink-800"
                                  : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {applicant.gender || "N/A"}
                            </span>
                          </TableCell>
                          <TableCell className="px-5 py-4 text-start">
                            {applicant.avatar ? (
                              <div className="w-16 h-20 overflow-hidden rounded border border-gray-200">
                                <img
                                  src={applicant.avatar}
                                  alt="Applicant portrait"
                                  className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                                  onClick={() =>
                                    window.open(applicant.avatar, "_blank")
                                  }
                                />
                              </div>
                            ) : (
                              <div className="w-16 h-20 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-500">
                                  No image
                                </span>
                              </div>
                            )}
                          </TableCell>
                          <TableCell className="px-5 py-4 text-start">
                            {applicant.passport_image ? (
                              <div className="w-20 h-16 overflow-hidden rounded border border-gray-200">
                                <img
                                  src={applicant.passport_image}
                                  alt="Passport"
                                  className="w-full h-full object-cover cursor-pointer hover:opacity-75 transition-opacity"
                                  onClick={() =>
                                    window.open(
                                      applicant.passport_image,
                                      "_blank"
                                    )
                                  }
                                />
                              </div>
                            ) : (
                              <div className="w-20 h-16 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                                <span className="text-xs text-gray-500">
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
                <p className="text-gray-500">No Applicant information</p>
              </div>
            )
          ) : (
            <EmergencyContact data={data} isOpen={isOpen} onClose={onClose} />
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicantDetailModal;

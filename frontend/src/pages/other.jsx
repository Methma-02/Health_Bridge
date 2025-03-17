import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
const Other = () => {
    // Number of cells to show at once
    const CELLS_PER_PAGE = 12;
    
    const [currentPage, setCurrentPage] = useState(0);
    const [formData, setFormData] = useState(
        Array(60).fill().map(() => ({
            "date the phm came": '',
            "other dates": '',
            "Family planning": '',
        }))
    );

    const handleOtherDataChange = (index, field, value) => {
        setFormData(prev => 
            prev.map((row, i) =>
                i === index ? { ...row, [field]: value } : row
            )
        );
    };

    const startIdx = currentPage * CELLS_PER_PAGE;
    const endIdx = startIdx + CELLS_PER_PAGE;
    const totalPages = Math.ceil(60 / CELLS_PER_PAGE);

    const nextPage = () => {
        if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
    };

    const prevPage = () => {
        if (currentPage > 0) setCurrentPage(prev => prev - 1);
    };

    return (
        <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
            <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">Other Records</h1>
            <div className="space-y-4">
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
                                <th className="p-3 text-left text-sm font-semibold text-blue-700">Field</th>
                                {Array(CELLS_PER_PAGE).fill().map((_, idx) => (
                                    <th key={idx} className="p-3 text-center text-sm font-semibold text-blue-700">
                                        {startIdx + idx + 1}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Object.keys(formData[0]).map((field) => (
                                <tr key={field} className="border-b border-blue-100 hover:bg-blue-50">
                                    <td className="p-3 text-sm font-medium text-blue-700 whitespace-nowrap">
                                        {field.charAt(0).toUpperCase() + field.slice(1)}
                                    </td>
                                    {formData.slice(startIdx, endIdx).map((_, idx) => (
                                        <td key={idx} className="p-2">
                                            <input
                                                type={field === 'Family planning' ? "text" : "date"}
                                                value={formData[startIdx + idx][field]}
                                                onChange={(e) => handleOtherDataChange(startIdx + idx, field, e.target.value)}
                                                className="w-29 h-6 p-1 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                            />
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex items-center justify-between px-4">
                    <div className="text-sm text-blue-700">
                        Showing {startIdx + 1} to {Math.min(endIdx, 60)} of 60 entries
                    </div>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className="p-2 rounded hover:bg-blue-100 disabled:opacity-50"
                        >
                            <ChevronLeft className="w-5 h-5 text-blue-700" />
                        </button>
                        <span className="text-sm text-blue-700">
                            Page {currentPage + 1} of {totalPages}
                        </span>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages - 1}
                            className="p-2 rounded hover:bg-blue-100 disabled:opacity-50"
                        >
                            <ChevronRight className="w-5 h-5 text-blue-700" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Other;
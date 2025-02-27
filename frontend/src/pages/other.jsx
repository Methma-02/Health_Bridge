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
        <div className="space-y-4">
            <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="p-2 text-left text-sm font-medium text-gray-500">Field</th>
                            {Array(CELLS_PER_PAGE).fill().map((_, idx) => (
                                <th key={idx} className="p-2 text-center text-sm font-medium text-gray-500">
                                    {startIdx + idx + 1}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(formData[0]).map((field) => (
                            <tr key={field} className="border-b hover:bg-gray-50">
                                <td className="p-2 text-sm font-medium">
                                    {field.charAt(0).toUpperCase() + field.slice(1)}
                                </td>
                                {formData.slice(startIdx, endIdx).map((_, idx) => (
                                    <td key={idx} className="p-1">
                                        <input
                                            type={field === 'Family planning' ? "text" : "date"}
                                            value={formData[startIdx + idx][field]}
                                            onChange={(e) => handleOtherDataChange(startIdx + idx, field, e.target.value)}
                                            className="w-full border rounded p-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex items-center justify-between px-4">
                <div className="text-sm text-gray-700">
                    Showing {startIdx + 1} to {Math.min(endIdx, 60)} of 60 entries
                </div>
                <div className="flex items-center space-x-2">
                    <button
                        onClick={prevPage}
                        disabled={currentPage === 0}
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <span className="text-sm">
                        Page {currentPage + 1} of {totalPages}
                    </span>
                    <button
                        onClick={nextPage}
                        disabled={currentPage === totalPages - 1}
                        className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
                    >
                        <ChevronRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};




export default Other;
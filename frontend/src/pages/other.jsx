// import { useState } from "react";
// import { ChevronRight, ChevronLeft } from "lucide-react";

// const Other = () => {
//     // Number of cells to show at once
//     const CELLS_PER_PAGE = 12;
    
//     const [currentPage, setCurrentPage] = useState(0);
//     const [formData, setFormData] = useState(
//         Array(60).fill().map(() => ({
//             "date the phm came": '',
//             "other dates": '',
//             "Family planning": '',
//         }))
//     );

//     const handleOtherDataChange = (index, field, value) => {
//         setFormData(prev => 
//             prev.map((row, i) =>
//                 i === index ? { ...row, [field]: value } : row
//             )
//         );
//     };

//     const startIdx = currentPage * CELLS_PER_PAGE;
//     const endIdx = startIdx + CELLS_PER_PAGE;
//     const totalPages = Math.ceil(60 / CELLS_PER_PAGE);

//     const nextPage = () => {
//         if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
//     };

//     const prevPage = () => {
//         if (currentPage > 0) setCurrentPage(prev => prev - 1);
//     };

//     return (
//         <div className="space-y-4">
//             <div className="overflow-x-auto">
//                 <table className="w-full border-collapse">
//                     <thead>
//                         <tr className="bg-gray-50">
//                             <th className="p-2 text-left text-sm font-medium text-gray-500">Field</th>
//                             {Array(CELLS_PER_PAGE).fill().map((_, idx) => (
//                                 <th key={idx} className="p-2 text-center text-sm font-medium text-gray-500">
//                                     {startIdx + idx + 1}
//                                 </th>
//                             ))}
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {Object.keys(formData[0]).map((field) => (
//                             <tr key={field} className="border-b hover:bg-gray-50">
//                                 <td className="p-2 text-sm font-medium">
//                                     {field.charAt(0).toUpperCase() + field.slice(1)}
//                                 </td>
//                                 {formData.slice(startIdx, endIdx).map((_, idx) => (
//                                     <td key={idx} className="p-1">
//                                         <input
//                                             type={field === 'Family planning' ? "text" : "date"}
//                                             value={formData[startIdx + idx][field]}
//                                             onChange={(e) => handleOtherDataChange(startIdx + idx, field, e.target.value)}
//                                             className="w-full border rounded p-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                                         />
//                                     </td>
//                                 ))}
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             </div>

//             <div className="flex items-center justify-between px-4">
//                 <div className="text-sm text-gray-700">
//                     Showing {startIdx + 1} to {Math.min(endIdx, 60)} of 60 entries
//                 </div>
//                 <div className="flex items-center space-x-2">
//                     <button
//                         onClick={prevPage}
//                         disabled={currentPage === 0}
//                         className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
//                     >
//                         <ChevronLeft className="w-5 h-5" />
//                     </button>
//                     <span className="text-sm">
//                         Page {currentPage + 1} of {totalPages}
//                     </span>
//                     <button
//                         onClick={nextPage}
//                         disabled={currentPage === totalPages - 1}
//                         className="p-2 rounded hover:bg-gray-100 disabled:opacity-50"
//                     >
//                         <ChevronRight className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };




// export default Other;

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import Other from './other';
import FormSubmitHandler from '../components/submit';

const WeightGainChart = () => {
  const [gender, setGender] = useState('boy');
  const [formData, setFormData] = useState({
    chartPoints: []
  });

  const formattedData = {
    type: 'weightGain',
    data: {
      gender,
      measurements: formData.chartPoints
    }
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Responsive dimensions
  const [width, setWidth] = useState(window.innerWidth * 0.8); // 80% of screen width
  const [height, setHeight] = useState(window.innerHeight * 0.6); // 60% of screen height

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth * 0.8);
      setHeight(window.innerHeight * 0.6);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const margin = { top: 20, right: 30, bottom: 50, left: 55 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xMax = 60;
  const yMax = 28;
  const xTicks = Array.from({ length: 60 }, (_, i) => i + 1);
  const yTicks = Array.from({ length: 29 }, (_, i) => i + 1);

  const toSvgX = (x) => (x / xMax) * chartWidth + margin.left;
  const toSvgY = (y) => chartHeight - ((y + 2) / (yMax + 2)) * chartHeight + margin.top;
  const toDataX = (x) => ((x - margin.left) / chartWidth) * xMax;
  const toDataY = (y) => ((chartHeight - (y - margin.top)) / chartHeight) * (yMax + 2) - 2;

  // Zone data with gender adjustment
  const getZones = (isGirl) => {
    const adjustment = isGirl ? -2 : 0;
    return [
      {
        path: `M ${toSvgX(0)} ${toSvgY(1.4 + adjustment)} ,${toSvgX(6)} ${toSvgY(4 + adjustment)},
               Q ${toSvgX(12)} ${toSvgY(6 + adjustment)}, ${toSvgX(24)} ${toSvgY(7.2 + adjustment)} 
               Q ${toSvgX(48)} ${toSvgY(9 + adjustment)}, ${toSvgX(60)} ${toSvgY(10.1 + adjustment)}`,
        label: "A"
      },
      // Other zones...
    ];
  };

  const zones = getZones(gender === 'girl');

  const getAreaPaths = (isGirl) => {
    const adjustment = isGirl ? -2 : 0;
    return {
      areaPathAB: `${zones[0].path} L ${toSvgX(60)} ${toSvgY(12.1 + adjustment)}
                   Q ${toSvgX(48)} ${toSvgY(11 + adjustment)}, ${toSvgX(24)} ${toSvgY(8.6 + adjustment)}
                   Q ${toSvgX(12)} ${toSvgY(7 + adjustment)}, ${toSvgX(6)} ${toSvgY(4.8 + adjustment)}
                   L ${toSvgX(0)} ${toSvgY(1.8 + adjustment)} Z`,
      // Other area paths...
    };
  };

  const areaPaths = getAreaPaths(gender === 'girl');

  const handleMouseMove = (e) => {
    if (!showCrosshair) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({ x, y });
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const dataX = Math.round(toDataX(x));
    const dataY = Number(toDataY(y).toFixed(1));

    if (dataX >= 0 && dataX <= xMax && dataY >= -2 && dataY <= yMax) {
      setFormData(prev => ({
        ...prev,
        chartPoints: [...prev.chartPoints, { x: dataX, y: dataY }]
      }));
    }
  };

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center space-x-4">
        <div className="flex space-x-4">
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="boy"
              name="gender"
              value="boy"
              checked={gender === "boy"}
              onChange={(e) => {
                setGender(e.target.value);
                setFormData((prev) => ({ ...prev, chartPoints: [] }));
              }}
            />
            <label htmlFor="boy">Boy</label>
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="radio"
              id="girl"
              name="gender"
              value="girl"
              checked={gender === "girl"}
              onChange={(e) => {
                setGender(e.target.value);
                setFormData((prev) => ({ ...prev, chartPoints: [] }));
              }}
            />
            <label htmlFor="girl">Girl</label>
          </div>
        </div>
      </div>

      <div className="relative">
        <svg
          width={width}
          height={height}
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onMouseEnter={() => setShowCrosshair(true)}
          onMouseLeave={() => {
            setShowCrosshair(false);
            setHoveredPoint(null);
          }}
          className="cursor-crosshair"
        >
          {/* Chart content... */}
        </svg>

        {/* Legend */}
        <div className="absolute top-4 left-15 bg-white p-4 rounded shadow-md">
          <h4 className="font-semibold mb-2">Weight Gain Zones</h4>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-600 opacity-60 mr-2"></div>
            <span>Zone A-B (Low)</span>
          </div>
          {/* Other zones... */}
        </div>
      </div>

      {/* Instructions */}
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-semibold mb-2">How to use:</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Select gender using the radio buttons above</li>
          <li>Click anywhere on the chart to plot a point</li>
          <li>Hover over points to see details</li>
          <li>Points will be automatically connected in chronological order</li>
        </ul>
      </div>

      <Other />
      <FormSubmitHandler formData={formattedData} />
    </div>
  );
};

export default WeightGainChart;
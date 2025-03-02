// // export default HeightGainChart;
// import { useState } from 'react';
// import { X } from 'lucide-react';
// import Other from './other';

// const HeightGainChart = () => {
//   const [gender, setGender] = useState('boy');
//   const [formData, setFormData] = useState({
//     chartPoints: []
//   });
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [showCrosshair, setShowCrosshair] = useState(false);
//   const [hoveredPoint, setHoveredPoint] = useState(null);

//   const width = 1300;
//   const height = 1000;
//   const margin = { top: 20, right: 30, bottom: 50, left: 55 };
//   const chartWidth = width - margin.left - margin.right;
//   const chartHeight = height - margin.top - margin.bottom;

//   const xMax = 60;
//   const yMin = 40;
//   const yMax = 120;
//   const xTicks = Array.from({length: 60}, (_, i) => i + 1);
//   const yTicks = Array.from({length: Math.floor((yMax - yMin) / 2) + 1}, (_, i) => yMin + (i * 2));

//   const toSvgX = (x) => (x / xMax) * chartWidth + margin.left;
//   const toSvgY = (y) => chartHeight - ((y - yMin) / (yMax - yMin)) * chartHeight + margin.top;
//   const toDataX = (x) => ((x - margin.left) / chartWidth) * xMax;
//   const toDataY = (y) => ((chartHeight - (y - margin.top)) / chartHeight) * (yMax - yMin) + yMin;

//   const getZones = (isGirl) => {
//     const adjustment = isGirl ? -2 : 0;
//     return [
//     {
//       path: `M ${toSvgX(0)} ${toSvgY(44 + adjustment)} ,${toSvgX(6)} ${toSvgY(60 + adjustment)}
//              Q ${toSvgX(12)} ${toSvgY(68 + adjustment)}, ${toSvgX(24)} ${toSvgY(76 + adjustment)} 
//              Q ${toSvgX(48)} ${toSvgY(90 + adjustment)}, ${toSvgX(60)} ${toSvgY(96 + adjustment)}`,
//       label: "A"
//     },
//     {
//       path: `M ${toSvgX(0)} ${toSvgY(46) + adjustment} ,${toSvgX(6)} ${toSvgY(62 + adjustment)}
//              Q ${toSvgX(12)} ${toSvgY(70 + adjustment)}, ${toSvgX(24)} ${toSvgY(79.5 + adjustment)}
//              Q ${toSvgX(48)} ${toSvgY(95 + adjustment)}, ${toSvgX(60)} ${toSvgY(101 + adjustment)}`,
//       label: "B"
//     },
//     {
//       path: `M ${toSvgX(0)} ${toSvgY(48 + adjustment)} ,${toSvgX(6)} ${toSvgY(65.5 + adjustment)}
//              Q ${toSvgX(12)} ${toSvgY(73 + adjustment)}, ${toSvgX(24)} ${toSvgY(82.5 + adjustment)}
//              Q ${toSvgX(48)} ${toSvgY(99 + adjustment)}, ${toSvgX(60)} ${toSvgY(105 + adjustment)}`,
//       label: "C"
//     },
//     {
//       path: `M ${toSvgX(0)} ${toSvgY(54 + adjustment)} ,${toSvgX(6)} ${toSvgY(73 + adjustment)}
//              Q ${toSvgX(12)} ${toSvgY(83 + adjustment)}, ${toSvgX(24)} ${toSvgY(92 + adjustment)}
//              Q ${toSvgX(48)} ${toSvgY(111 + adjustment)}, ${toSvgX(60)} ${toSvgY(119 + adjustment)}`,
//       label: "C"
//     },   
//   ];
// };

// const zones = getZones ( gender == 'girl');

// const getAreaPaths = (isGirl) => {
//   const adjustment = isGirl ? -2 : 0;
//   return {
//   areaPathAB : `${zones[0].path} L ${toSvgX(60)} ${toSvgY(101 + adjustment)}
//                     Q ${toSvgX(48)} ${toSvgY(95 + adjustment)}, ${toSvgX(24)} ${toSvgY(79.5 + adjustment)}
//                     Q ${toSvgX(12)} ${toSvgY(70 + adjustment)}, ${toSvgX(6)} ${toSvgY(62 + adjustment)}
//                     L ${toSvgX(0)} ${toSvgY(46 + adjustment)} Z`,

//   areaPathC : `${zones[1].path} L ${toSvgX(60)} ${toSvgY(105 + adjustment)}
//                     Q ${toSvgX(48)} ${toSvgY(99 + adjustment)}, ${toSvgX(24)} ${toSvgY(82.5 + adjustment)}
//                     Q ${toSvgX(12)} ${toSvgY(73 + adjustment)}, ${toSvgX(6)} ${toSvgY(65.5 + adjustment)}
//                     L ${toSvgX(0)} ${toSvgY(48 + adjustment)} Z`,

//   areaPathD : `${zones[2].path} L ${toSvgX(60)} ${toSvgY(119 + adjustment)}
//                     Q ${toSvgX(48)} ${toSvgY(111 + adjustment)}, ${toSvgX(24)} ${toSvgY(92 + adjustment)}
//                     Q ${toSvgX(12)} ${toSvgY(83 + adjustment)}, ${toSvgX(6)} ${toSvgY(73 + adjustment)}
//                     L ${toSvgX(0)} ${toSvgY(54 + adjustment)} Z`
//   };
// };

// const areaPaths = getAreaPaths(gender === 'girl');

// const handleMouseMove = (e) => {
//     if (!showCrosshair) return;
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
//     setMousePos({ x, y });
//   };

//   const handleClick = (e) => {
//     const rect = e.currentTarget.getBoundingClientRect();
//     const x = e.clientX - rect.left;
//     const y = e.clientY - rect.top;
    
//     const dataX = Math.round(toDataX(x));
//     const dataY = Number(toDataY(y).toFixed(1));
    
//     if (dataX >= 0 && dataX <= xMax && dataY >= -2 && dataY <= yMax) {
//       setFormData(prev => ({
//         ...prev,
//         chartPoints: [...prev.chartPoints, { x: dataX, y: dataY }]
//       }));
//     }
//   };

//   return (
//     <div className="space-y-4">
//     <div className="space-y-4">
// <div className="flex items-center space-x-4 p-4">
//   <div className="flex space-x-4">
//     <div className="flex items-center space-x-2">
//       <input
//         type="radio"
//         id="boy"
//         name="gender"
//         value="boy"
//         checked={gender === "boy"}
//         onChange={(e) => {
//           setGender(e.target.value);
//           setFormData((prev) => ({ ...prev, chartPoints: [] }));
//         }}
//       />
//       <label htmlFor="boy">Boy</label>
//     </div>
//     <div className="flex items-center space-x-2">
//       <input
//         type="radio"
//         id="girl"
//         name="gender"
//         value="girl"
//         checked={gender === "girl"}
//         onChange={(e) => {
//           setGender(e.target.value);
//           setFormData((prev) => ({ ...prev, chartPoints: [] }));
//         }}
//       />
//       <label htmlFor="girl">Girl</label>
//     </div>
//   </div>
// </div>
// </div>


//     <div className="relative">
//       <svg
//         width={width}
//         height={height}
//         onMouseMove={handleMouseMove}
//         onClick={handleClick}
//         onMouseEnter={() => setShowCrosshair(true)}
//         onMouseLeave={() => {
//           setShowCrosshair(false);
//           setHoveredPoint(null);
//         }}
//         className="cursor-crosshair"
//       >
//          <rect
//             x={margin.left}
//             y={margin.top}
//             width={chartWidth}
//             height={chartHeight}
//             fill="#f8f9fa"
//           />

//         {/* Grid lines */}
//         <g>
//           {xTicks.map((tick) => (
//             <line
//               key={`vline-${tick}`}
//               x1={toSvgX(tick)}
//               y1={margin.top}
//               x2={toSvgX(tick)}
//               y2={height - margin.bottom}
//               stroke="#ddd"
//               strokeWidth="1"
//             />
//           ))}
//           {yTicks.map((tick) => (
//             <line
//               key={`hline-${tick}`}
//               x1={margin.left}
//               y1={toSvgY(tick)}
//               x2={width - margin.right}
//               y2={toSvgY(tick)}
//               stroke="#ddd"
//               strokeWidth="1"
//             />
//           ))}
//         </g>

//         {/* Area between A and B */}
//       <path d={areaPaths.areaPathAB} fill="rgba(237, 19, 19, 0.59)" stroke="none" />
//       <path d={areaPaths.areaPathC} fill="rgba(254,138,132,0.60)" stroke="none" />
//       <path d={areaPaths.areaPathD} fill="rgba(177, 244, 177, 0.60)" stroke="none" />
        
//         {/* Connected lines between points */}
//         {formData.chartPoints.length > 1 && (
//           <path
//             d={formData.chartPoints.map((point, i) => 
//               `${i === 0 ? 'M' : 'L'} ${toSvgX(point.x)} ${toSvgY(point.y)}`
//             ).join(' ')}
//             fill="none"
//             stroke="#0d9488"
//             strokeWidth="2"
//           />
//         )}

//         {/* Axes */}
//         <line
//           x1={margin.left}
//           y1={height - margin.bottom}
//           x2={width - margin.right}
//           y2={height - margin.bottom}
//           stroke="black"
//           strokeWidth="2"
//         />
//         <line
//           x1={margin.left}
//           y1={margin.top}
//           x2={margin.left}
//           y2={height - margin.bottom}
//           stroke="black"
//           strokeWidth="2"
//         />

//         {/* Axis labels and ticks */}
//         {xTicks.map((tick) => (
//           <g key={`xtick-${tick}`}>
//             <text
//               x={toSvgX(tick)}
//               y={height - margin.bottom + 20}
//               textAnchor="middle"
//               className="text-xs"
//               fontSize={13}
//             >
//               {tick}
//             </text>
//           </g>
//         ))}
//         {yTicks.map((tick) => (
//           <g key={`ytick-${tick}`}>
//             <text
//               x={margin.left - 10}
//               y={toSvgY(tick)}
//               textAnchor="end"
//               dominantBaseline="middle"
//               className="text-xs"
//               fontSize={13}
//             >
//               {tick}
//             </text>
//           </g>
//         ))}

//         {/* Y-axis title */}
//         <text
//           x={15}
//           y={height / 2}
//           transform={`rotate(-90, 15, ${height / 2})`}
//           textAnchor="middle"
//           className="text-sm font-semibold"
//         >
//           Height (cm)
//         </text>

//         {/* Plotted points */}
      
//         {formData.chartPoints.map((point, i) => (
//           <g
//             key={i}
//             onMouseEnter={() => setHoveredPoint(i)}
//             onMouseLeave={() => setHoveredPoint(null)}
//           >
//             <circle
//               cx={toSvgX(point.x)}
//               cy={toSvgY(point.y)}
//               r="4"
//               fill="red"
//             />
//             {hoveredPoint === i && (
//               <g>
//                 <rect
//                   x={toSvgX(point.x) + 10}
//                   y={toSvgY(point.y) - 30}
//                   width="100"
//                   height="25"
//                   fill="rgba(0,0,0,0.8)"
//                   rx="4"
//                 />
//                 <text
//                   x={toSvgX(point.x) + 15}
//                   y={toSvgY(point.y) - 12}
//                   fill="white"
//                   className="text-xs"
//                 >
//                   Week {point.x}, {point.y}kg
//                 </text>
//                 <circle
//                   cx={toSvgX(point.x) + 15}
//                   cy={toSvgY(point.y) - 15}
//                   r="8"
//                   fill="red"
//                   className="cursor-pointer"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                   }}
//                 />
//                 <X
//                   className="cursor-pointer"
//                   size={12}
//                   color="white"
//                   style={{transform: `translate(${toSvgX(point.x) + 9}px, ${toSvgY(point.y) - 21}px)`
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                   }}
//                 />
//                 </g>
//               )}
//             </g>
//           ))}
                  
//           {/* Crosshair */}
//           {showCrosshair && (
//             <>
//               <line
//                 x1={mousePos.x}
//                 y1={margin.top}
//                 x2={mousePos.x}
//                 y2={height - margin.bottom}
//                 stroke="#999"
//                 strokeWidth="1"
//                 strokeDasharray="5,5"
//               />
//               <line
//                 x1={margin.left}
//                 y1={mousePos.y}
//                 x2={width - margin.right}
//                 y2={mousePos.y}
//                 stroke="#999"
//                 strokeWidth="1"
//                 strokeDasharray="5,5"
//               />
//             </>
//           )}
//         </svg>

//         {/* Legend */}
//         <div className="absolute top-4 left-15 bg-white p-4 rounded shadow-md">
//           <h4 className="font-semibold mb-2">Weight Gain Zones</h4>
//             <div className="flex items-center">
//               <div className="w-4 h-4 bg-red-600 opacity-60 mr-2"></div>
//               <span>Zone A (Low)</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-4 h-4 bg-red-300 opacity-60 mr-2"></div>
//               <span>Zone B (Normal-Low)</span>
//             </div>
//             <div className="flex items-center">
//               <div className="w-4 h-4 bg-green-200 opacity-60 mr-2"></div>
//               <span>Zone C (Normal)</span>
//             </div>
//           </div>
//         </div>

//       {/* Instructions */}
//       <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//         <h4 className="font-semibold mb-2">How to use:</h4>
//         <ul className="list-disc list-inside space-y-1">
//           <li>Select gender using the radio buttons above</li>
//           <li>Click anywhere on the chart to plot a point</li>
//           <li>Hover over points to see details</li>
//           <li>Points will be automatically connected in chronological order</li>
//         </ul>
//       </div>
//       <Other/>
//     </div>
//   );
// };

// export default HeightGainChart;


import { useState } from 'react';
import { X } from 'lucide-react';
import Other from './other';

const HeightGainChart = () => {
  const [gender, setGender] = useState('boy');
  const [formData, setFormData] = useState({
    chartPoints: []
  });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Responsive dimensions
  const width = window.innerWidth > 768 ? 1300 : window.innerWidth * 0.9; // Adjust for smaller screens
  const height = window.innerWidth > 768 ? 1000 : width * 0.75; // Maintain aspect ratio
  const margin = { top: 20, right: 30, bottom: 50, left: 55 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xMax = 60;
  const yMin = 40;
  const yMax = 120;
  const xTicks = Array.from({ length: 60 }, (_, i) => i + 1);
  const yTicks = Array.from({ length: Math.floor((yMax - yMin) / 2) + 1 }, (_, i) => yMin + (i * 2));

  const toSvgX = (x) => (x / xMax) * chartWidth + margin.left;
  const toSvgY = (y) => chartHeight - ((y - yMin) / (yMax - yMin)) * chartHeight + margin.top;
  const toDataX = (x) => ((x - margin.left) / chartWidth) * xMax;
  const toDataY = (y) => ((chartHeight - (y - margin.top)) / chartHeight) * (yMax - yMin) + yMin;

  const getZones = (isGirl) => {
    const adjustment = isGirl ? -2 : 0;
    return [
      {
        path: `M ${toSvgX(0)} ${toSvgY(44 + adjustment)} ,${toSvgX(6)} ${toSvgY(60 + adjustment)}
               Q ${toSvgX(12)} ${toSvgY(68 + adjustment)}, ${toSvgX(24)} ${toSvgY(76 + adjustment)} 
               Q ${toSvgX(48)} ${toSvgY(90 + adjustment)}, ${toSvgX(60)} ${toSvgY(96 + adjustment)}`,
        label: "A"
      },
      {
        path: `M ${toSvgX(0)} ${toSvgY(46 + adjustment)} ,${toSvgX(6)} ${toSvgY(62 + adjustment)}
               Q ${toSvgX(12)} ${toSvgY(70 + adjustment)}, ${toSvgX(24)} ${toSvgY(79.5 + adjustment)}
               Q ${toSvgX(48)} ${toSvgY(95 + adjustment)}, ${toSvgX(60)} ${toSvgY(101 + adjustment)}`,
        label: "B"
      },
      {
        path: `M ${toSvgX(0)} ${toSvgY(48 + adjustment)} ,${toSvgX(6)} ${toSvgY(65.5 + adjustment)}
               Q ${toSvgX(12)} ${toSvgY(73 + adjustment)}, ${toSvgX(24)} ${toSvgY(82.5 + adjustment)}
               Q ${toSvgX(48)} ${toSvgY(99 + adjustment)}, ${toSvgX(60)} ${toSvgY(105 + adjustment)}`,
        label: "C"
      },
      {
        path: `M ${toSvgX(0)} ${toSvgY(54 + adjustment)} ,${toSvgX(6)} ${toSvgY(73 + adjustment)}
               Q ${toSvgX(12)} ${toSvgY(83 + adjustment)}, ${toSvgX(24)} ${toSvgY(92 + adjustment)}
               Q ${toSvgX(48)} ${toSvgY(111 + adjustment)}, ${toSvgX(60)} ${toSvgY(119 + adjustment)}`,
        label: "D"
      },
    ];
  };

  const zones = getZones(gender === 'girl');

  const getAreaPaths = (isGirl) => {
    const adjustment = isGirl ? -2 : 0;
    return {
      areaPathAB: `${zones[0].path} L ${toSvgX(60)} ${toSvgY(101 + adjustment)}
                    Q ${toSvgX(48)} ${toSvgY(95 + adjustment)}, ${toSvgX(24)} ${toSvgY(79.5 + adjustment)}
                    Q ${toSvgX(12)} ${toSvgY(70 + adjustment)}, ${toSvgX(6)} ${toSvgY(62 + adjustment)}
                    L ${toSvgX(0)} ${toSvgY(46 + adjustment)} Z`,
      areaPathC: `${zones[1].path} L ${toSvgX(60)} ${toSvgY(105 + adjustment)}
                    Q ${toSvgX(48)} ${toSvgY(99 + adjustment)}, ${toSvgX(24)} ${toSvgY(82.5 + adjustment)}
                    Q ${toSvgX(12)} ${toSvgY(73 + adjustment)}, ${toSvgX(6)} ${toSvgY(65.5 + adjustment)}
                    L ${toSvgX(0)} ${toSvgY(48 + adjustment)} Z`,
      areaPathD: `${zones[2].path} L ${toSvgX(60)} ${toSvgY(119 + adjustment)}
                    Q ${toSvgX(48)} ${toSvgY(111 + adjustment)}, ${toSvgX(24)} ${toSvgY(92 + adjustment)}
                    Q ${toSvgX(12)} ${toSvgY(83 + adjustment)}, ${toSvgX(6)} ${toSvgY(73 + adjustment)}
                    L ${toSvgX(0)} ${toSvgY(54 + adjustment)} Z`
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
    <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
      <h1 className="text-2xl md:text-3xl font-bold text-gradient bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 mb-6 text-center bg-clip-text text-transparent">Height Gain Chart</h1>
      <div className="space-y-4">
        <div className="flex items-center space-x-4 p-4">
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
          className="cursor-crosshair w-full h-auto"
        >
          {/* Background */}
          <rect
            x={margin.left}
            y={margin.top}
            width={chartWidth}
            height={chartHeight}
            fill="#f8f9fa"
          />

          {/* Grid lines */}
          <g>
            {xTicks.map((tick) => (
              <line
                key={`vline-${tick}`}
                x1={toSvgX(tick)}
                y1={margin.top}
                x2={toSvgX(tick)}
                y2={height - margin.bottom}
                stroke="#ddd"
                strokeWidth="1"
              />
            ))}
            {yTicks.map((tick) => (
              <line
                key={`hline-${tick}`}
                x1={margin.left}
                y1={toSvgY(tick)}
                x2={width - margin.right}
                y2={toSvgY(tick)}
                stroke="#ddd"
                strokeWidth="1"
              />
            ))}
          </g>

          {/* Area paths */}
          <path d={areaPaths.areaPathAB} fill="rgba(237, 19, 19, 0.59)" stroke="none" />
          <path d={areaPaths.areaPathC} fill="rgba(254,138,132,0.60)" stroke="none" />
          <path d={areaPaths.areaPathD} fill="rgba(177, 244, 177, 0.60)" stroke="none" />

          {/* Connected lines between points */}
          {formData.chartPoints.length > 1 && (
            <path
              d={formData.chartPoints.map((point, i) =>
                `${i === 0 ? 'M' : 'L'} ${toSvgX(point.x)} ${toSvgY(point.y)}`
              ).join(' ')}
              fill="none"
              stroke="#0d9488"
              strokeWidth="2"
            />
          )}

          {/* Axes */}
          <line
            x1={margin.left}
            y1={height - margin.bottom}
            x2={width - margin.right}
            y2={height - margin.bottom}
            stroke="black"
            strokeWidth="2"
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={height - margin.bottom}
            stroke="black"
            strokeWidth="2"
          />

          {/* Axis labels and ticks */}
          {xTicks.map((tick) => (
            <g key={`xtick-${tick}`}>
              <text
                x={toSvgX(tick)}
                y={height - margin.bottom + 20}
                textAnchor="middle"
                className="text-xs"
                fontSize={13}
              >
                {tick}
              </text>
            </g>
          ))}
          {yTicks.map((tick) => (
            <g key={`ytick-${tick}`}>
              <text
                x={margin.left - 10}
                y={toSvgY(tick)}
                textAnchor="end"
                dominantBaseline="middle"
                className="text-xs"
                fontSize={13}
              >
                {tick}
              </text>
            </g>
          ))}

          {/* Y-axis title */}
          <text
            x={15}
            y={height / 2}
            transform={`rotate(-90, 15, ${height / 2})`}
            textAnchor="middle"
            className="text-sm font-semibold"
          >
            Height (cm)
          </text>

          {/* Plotted points */}
          {formData.chartPoints.map((point, i) => (
            <g
              key={i}
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle
                cx={toSvgX(point.x)}
                cy={toSvgY(point.y)}
                r="4"
                fill="red"
              />
              {hoveredPoint === i && (
                <g>
                  <rect
                    x={toSvgX(point.x) + 10}
                    y={toSvgY(point.y) - 30}
                    width="100"
                    height="25"
                    fill="rgba(0,0,0,0.8)"
                    rx="4"
                  />
                  <text
                    x={toSvgX(point.x) + 15}
                    y={toSvgY(point.y) - 12}
                    fill="white"
                    className="text-xs"
                  >
                    Week {point.x}, {point.y}kg
                  </text>
                  <circle
                    cx={toSvgX(point.x) + 15}
                    cy={toSvgY(point.y) - 15}
                    r="8"
                    fill="red"
                    className="cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                  <X
                    className="cursor-pointer"
                    size={12}
                    color="white"
                    style={{ transform: `translate(${toSvgX(point.x) + 9}px, ${toSvgY(point.y) - 21}px)` }}
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                </g>
              )}
            </g>
          ))}

          {/* Crosshair */}
          {showCrosshair && (
            <>
              <line
                x1={mousePos.x}
                y1={margin.top}
                x2={mousePos.x}
                y2={height - margin.bottom}
                stroke="#999"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
              <line
                x1={margin.left}
                y1={mousePos.y}
                x2={width - margin.right}
                y2={mousePos.y}
                stroke="#999"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            </>
          )}
        </svg>

        {/* Legend */}
        <div className="absolute top-4 left-15 bg-white p-4 rounded shadow-md">
          <h4 className="font-semibold mb-2">Weight Gain Zones</h4>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-600 opacity-60 mr-2"></div>
            <span>Zone A (Low)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-red-300 opacity-60 mr-2"></div>
            <span>Zone B (Normal-Low)</span>
          </div>
          <div className="flex items-center">
            <div className="w-4 h-4 bg-green-200 opacity-60 mr-2"></div>
            <span>Zone C (Normal)</span>
          </div>
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
    </div>
  );
};

export default HeightGainChart;
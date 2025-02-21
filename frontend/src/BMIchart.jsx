
// // eslint-disable-next-line no-unused-vars
// import React, { useState } from 'react';
// // eslint-disable-next-line no-unused-vars
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
// import { X } from 'lucide-react';


// // eslint-disable-next-line react/prop-types
// const BMIChart = ({ points, onPlotPoint, onDeletePoint }) => {
//   const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
//   const [showCrosshair, setShowCrosshair] = useState(false);
//   const [hoveredPoint, setHoveredPoint] = useState(null);

//   const width = 1300;
//   const height = 800;
//   const margin = { top: 20, right: 30, bottom: 50, left: 55 };
//   const chartWidth = width - margin.left - margin.right;
//   const chartHeight = height - margin.top - margin.bottom;

//   const xMax = 60;
//   const yMax = 28;
//   const xTicks = Array.from({length:60}, (_,i) => i+1)
//   const yTicks = Array.from({length:29}, (_,i) => i+1);

//   const toSvgX = (x) => (x / xMax) * chartWidth + margin.left;
//   const toSvgY = (y) => chartHeight - ((y + 2) / (yMax + 2)) * chartHeight + margin.top;
//   const toDataX = (x) => ((x - margin.left) / chartWidth) * xMax;
//   const toDataY = (y) => ((chartHeight - (y - margin.top)) / chartHeight) * (yMax + 2) - 2;

//   // Zone data
//   const zones = [
//     {
//       path: `M ${toSvgX(0)} ${toSvgY(1.4)} ,${toSvgX(6)} ${toSvgY(4)},
//              Q ${toSvgX(12)} ${toSvgY(6)}, ${toSvgX(24)} ${toSvgY(7.2)} 
//              Q ${toSvgX(48)} ${toSvgY(9)}, ${toSvgX(60)} ${toSvgY(10.1)}`,
//       label: "A"
//     },
//     {
//       path: `M ${toSvgX(0)} ${toSvgY(1.8)} ,${toSvgX(6)} ${toSvgY(4.8)}
//              Q ${toSvgX(12)} ${toSvgY(7)}, ${toSvgX(24)} ${toSvgY(8.6)}
//              Q ${toSvgX(48)} ${toSvgY(11)}, ${toSvgX(60)} ${toSvgY(12.1)}`,
//        label: "B"
//      },
//     {
//       path: `M ${toSvgX(0)} ${toSvgY(2.4)} ,${toSvgX(6)} ${toSvgY(5.8)}
//              Q ${toSvgX(12)} ${toSvgY(8)}, ${toSvgX(24)} ${toSvgY(10)}
//              Q ${toSvgX(48)} ${toSvgY(12.9)}, ${toSvgX(60)} ${toSvgY(14.4)}`,
//       label: "C"
//     },
//     {
//       path: `M ${toSvgX(0)} ${toSvgY(2.9)} ,${toSvgX(6)} ${toSvgY(6.9)}
//              Q ${toSvgX(12)} ${toSvgY(9)}, ${toSvgX(24)} ${toSvgY(11.2)}
//              Q ${toSvgX(48)} ${toSvgY(14.8)}, ${toSvgX(60)} ${toSvgY(16.4)}`,
//       label: "C"
//     },
//     {
//       path: `M ${toSvgX(0)} ${toSvgY(4)} ,${toSvgX(6)} ${toSvgY(9.8)}
//              Q ${toSvgX(12)} ${toSvgY(12.2)}, ${toSvgX(24)} ${toSvgY(15.2)}
//              Q ${toSvgX(48)} ${toSvgY(20.9)}, ${toSvgX(60)} ${toSvgY(22.2)}`,
//       label: "C"
//     },
//     {
//       path: `M ${toSvgX(0)} ${toSvgY(4.9)} ,${toSvgX(6)} ${toSvgY(10.9)}
//              Q ${toSvgX(12)} ${toSvgY(13.4)}, ${toSvgX(24)} ${toSvgY(17)}
//              Q ${toSvgX(48)} ${toSvgY(23)}, ${toSvgX(60)} ${toSvgY(25.9)}`,
//       label: "C"
//     }
    
//   ];
  
//   const areaPathAB = `${zones[0].path} L ${toSvgX(60)} ${toSvgY(12.1)}
//                     Q ${toSvgX(48)} ${toSvgY(11)}, ${toSvgX(24)} ${toSvgY(8.6)}
//                     Q ${toSvgX(12)} ${toSvgY(7)}, ${toSvgX(6)} ${toSvgY(4.8)}
//                     L ${toSvgX(0)} ${toSvgY(1.8)} Z`;

// const areaPathC = `${zones[1].path} L ${toSvgX(60)} ${toSvgY(14.4)}
//                     Q ${toSvgX(48)} ${toSvgY(12.9)}, ${toSvgX(24)} ${toSvgY(10)}
//                     Q ${toSvgX(12)} ${toSvgY(8)}, ${toSvgX(6)} ${toSvgY(5.8)}
//                     L ${toSvgX(0)} ${toSvgY(2.4)} Z`;

// const areaPathD = `${zones[2].path} L ${toSvgX(60)} ${toSvgY(16.4)}
//                     Q ${toSvgX(48)} ${toSvgY(14.8)}, ${toSvgX(24)} ${toSvgY(11.2)}
//                     Q ${toSvgX(12)} ${toSvgY(9)}, ${toSvgX(6)} ${toSvgY(6.8)}
//                     L ${toSvgX(0)} ${toSvgY(2.9)} Z`;

// const areaPathE = `${zones[3].path} L ${toSvgX(60)} ${toSvgY(22.2)}
//                     Q ${toSvgX(48)} ${toSvgY(20.9)}, ${toSvgX(24)} ${toSvgY(15.2)}
//                     Q ${toSvgX(12)} ${toSvgY(12.2)}, ${toSvgX(6)} ${toSvgY(9.8)}
//                     L ${toSvgX(0)} ${toSvgY(4)} Z`;

// const areaPathF = `${zones[4].path} L ${toSvgX(60)} ${toSvgY(25.9)}
//                     Q ${toSvgX(48)} ${toSvgY(23)}, ${toSvgX(24)} ${toSvgY(17)}
//                     Q ${toSvgX(12)} ${toSvgY(13.4)}, ${toSvgX(6)} ${toSvgY(10.9)}
//                     L ${toSvgX(0)} ${toSvgY(4.9)} Z`;


//  const handleMouseMove = (e) => {
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
//       onPlotPoint({ x: dataX, y: dataY });
//     }
//   };

//   return (
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
//         {/* Background */}
//         <rect
//           x={margin.left}
//           y={margin.top}
//           width={chartWidth}
//           height={chartHeight}
//           fill="#f8f9fa"
//         />

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
//               fontSize={100}
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

//         {/* Zones */}
//         {zones.map((zone, index) => (
//           <g key={`zone-${index}`}>
//             <path
//               d={zone.path}
//               fill="none"
//               stroke="#ccc"
//               strokeWidth="2"
//             />
//             <text 
//               x={width - margin.right + 10} 
//               y={100 + index * 60}
//               className="font-bold"
//             >
//               {zone.label}
//             </text>
//           </g>
//         ))}

//         {/* Area between A and B */}
//         <path
//             d={areaPathAB}
//             fill="rgba(237, 19, 19, 0.59)"
//             stroke="none"
//           />

//         <path
//           d={areaPathC}
//           fill="rgba(254,138,132,0.60)"
//           stroke="none"
//         />

//         <path
//           d={areaPathD}
//           fill="rgba(235, 170, 148, 0.60)"
//           stroke="none"
//         />

//         <path
//           d={areaPathE}
//           fill="rgba(177, 244, 177, 0.60)"
//           stroke="none"
//         />

//          <path
//           d={areaPathF}
//           fill="rgba(149, 184, 238, 0.60)"
//           stroke="none"
//         />

//         {/* Connected lines between points */}
//         {/*eslint-disable-next-line react/prop-types*/}
//         {points.length > 1 && (
//           <path
//             d={points.map((point, i) => 
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

//         {/* Axis titles */}
     
//         <text
//           x={15}
//           y={height / 2}
//           transform={`rotate(-90, 15, ${height / 2})`}
//           textAnchor="middle"
//           className="text-sm font-semibold"
//         >
//           Weight gain (kg)
//         </text>

//         {/* Plotted points with delete buttons */}
        
//         {/*eslint-disable-next-line react/prop-types*/}
//         {points.map((point, i) => (
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
//                 {/* Tooltip */}
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
//                 {/* Delete button */}
//                 <circle
//                   cx={toSvgX(point.x) + 15}
//                   cy={toSvgY(point.y) - 15}
//                   r="8"
//                   fill="red"
//                   className="cursor-pointer"
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onDeletePoint(i);
//                   }}
//                 />
//                 <X
//                   className="cursor-pointer"
//                   size={12}
//                   color="white"
//                   style={{
//                     transform: `translate(${toSvgX(point.x) + 9}px, ${toSvgY(point.y) - 21}px)`
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     onDeletePoint(i);
//                   }}
//                 />
//               </g>
//             )}
//           </g>
//         ))}

//         {/* Crosshair */}
//         {showCrosshair && (
//           <>
//             <line
//               x1={mousePos.x}
//               y1={margin.top}
//               x2={mousePos.x}
//               y2={height - margin.bottom}
//               stroke="#999"
//               strokeWidth="1"
//               strokeDasharray="5,5"
//             />
//             <line
//               x1={margin.left}
//               y1={mousePos.y}
//               x2={width - margin.right}
//               y2={mousePos.y}
//               stroke="#999"
//               strokeWidth="1"
//               strokeDasharray="5,5"
//             />
//           </>
//         )}
//       </svg>
//     </div>
//   );
// };

// const BMIChart = () => {
//   const [formData, setFormData] = useState({
//     bmiChartPoints: []
//   });

//   const handlePlotBMIPoint = (point) => {
//     setFormData(prev => ({
//       ...prev,
//       bmiChartPoints: [...prev.bmiChartPoints, point]
//     }));
//   };

//   return (
//     <div>

//       {/* BMI Chart Section */}
//       <div className="bg-white rounded-lg shadow mt-6">
//         <div className="border-b p-4">
//           <h3 className="text-lg font-semibold">BMI / Weight Gain Chart</h3>
//         </div>
//         <div>
//           <BMIChart 
//             points={formData.bmiChartPoints} 
//             onPlotPoint={handlePlotBMIPoint}
//           />
          
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default BMIChart;
import { useState } from 'react';
import { X } from 'lucide-react';
import Other from './other';
import FormSubmitHandler from '../components/submit';

const HeightGainChart = () => {
  const [gender, setGender] = useState('boy');
  const [formData, setFormData] = useState({
    chartPoints: []
  });

  const formattedData = {
    type: 'heightGain',
    data: {
      gender,
      measurements: formData.chartPoints
    }
  };

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Make dimensions responsive
  const useResponsiveDimensions = () => {
    const baseWidth = 1152;
    const baseHeight = 800;
    const aspectRatio = baseHeight / baseWidth;
    
    return {
      width: '100%',
      height: 'auto',
      aspectRatio: `${baseWidth} / ${baseHeight}`,
      viewBox: `0 0 ${baseWidth} ${baseHeight}`
    };
  };

  const dimensions = useResponsiveDimensions();
  const width = 1300;
  const height = 800;
  const margin = { top: 20, right: 30, bottom: 50, left: 55 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xMax = 60;
  const yMin = 40;
  const yMax = 120;
  const xTicks = Array.from({length: 60}, (_, i) => i + 1);
  const yTicks = Array.from({length: Math.floor((yMax - yMin) / 2) + 1}, (_, i) => yMin + (i * 2));

  const toSvgX = (x) => (x / xMax) * chartWidth + margin.left;
  const toSvgY = (y) => chartHeight - ((y - yMin) / (yMax - yMin)) * chartHeight + margin.top;
  const toDataX = (x) => ((x - margin.left) / chartWidth) * xMax;
  const toDataY = (y) => ((chartHeight - (y - margin.top)) / chartHeight) * (yMax - yMin) + yMin;

  // Get colors based on gender
  const getGenderColors = () => {
    if (gender === 'girl') {
      return {
        primary: "#ec4899", // pink-600
        secondary: "#f472b6", // pink-400
        dark: "#831843", // pink-900
        light: "#fbcfe8", // pink-200
        pointColor: "#db2777", // pink-600
        pointStroke: "#9d174d", // pink-800
        axisColor: "#be185d", // pink-700
        chartBg: "#fdf2f8", // pink-50
        tooltipBg: "rgba(219, 39, 119, 0.9)", // pink-600 with opacity
        deleteBtn: "#be123c" // rose-700
      };
    } else {
      return {
        primary: "#3b82f6", // blue-500
        secondary: "#60a5fa", // blue-400
        dark: "#1e40af", // blue-800
        light: "#bfdbfe", // blue-200
        pointColor: "#3b82f6", // blue-500
        pointStroke: "#1e40af", // blue-800
        axisColor: "#2563eb", // blue-600
        chartBg: "#f0f7ff", // custom light blue
        tooltipBg: "rgba(37, 99, 235, 0.9)", // blue-600 with opacity
        deleteBtn: "#ef4444" // red-500
      };
    }
  };

  const colors = getGenderColors();

  // Zone data with gender adjustment
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
    
    // Scale coordinates based on actual rendered size
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    
    setMousePos({ 
      x: x * scaleX, 
      y: y * scaleY 
    });
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Scale coordinates based on actual rendered size
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    const scaledX = x * scaleX;
    const scaledY = y * scaleY;
    
    const dataX = Math.round(toDataX(scaledX));
    const dataY = Number(toDataY(scaledY).toFixed(1));
    
    if (dataX >= 0 && dataX <= xMax && dataY >= yMin && dataY <= yMax) {
      setFormData(prev => ({
        ...prev,
        chartPoints: [...prev.chartPoints, { x: dataX, y: dataY }]
      }));
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
       <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center" >Height Gain Chart</h1>
      
      <div className="space-y-4 mb-6">
        <div className={`flex items-center justify-center space-x-8 p-4 ${gender === 'girl' ? 'bg-pink-50' : 'bg-blue-50'} rounded-lg`}>
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
              className={`form-radio ${gender === 'girl' ? 'text-pink-600 focus:ring-pink-500' : 'text-blue-600 focus:ring-blue-500'}`}
            />
            <label htmlFor="boy" className={`text-sm font-medium ${gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}`}>Boy</label>
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
              className={`form-radio ${gender === 'girl' ? 'text-pink-600 focus:ring-pink-500' : 'text-blue-600 focus:ring-blue-500'}`}
            />
            <label htmlFor="girl" className={`text-sm font-medium ${gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}`}>Girl</label>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden rounded-lg border border-blue-200">
        <svg
          width={dimensions.width}
          height={dimensions.height}
          viewBox={dimensions.viewBox}
          style={{ aspectRatio: dimensions.aspectRatio }}
          preserveAspectRatio="xMidYMid meet"
          onMouseMove={handleMouseMove}
          onClick={handleClick}
          onMouseEnter={() => setShowCrosshair(true)}
          onMouseLeave={() => {
            setShowCrosshair(false);
            setHoveredPoint(null);
          }}
          className="cursor-crosshair w-full h-auto"
        >
          <rect
            x={margin.left}
            y={margin.top}
            width={chartWidth}
            height={chartHeight}
            fill={colors.chartBg}
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

          {/* Colored areas */}
          <path d={areaPaths.areaPathAB} fill="rgba(239, 68, 68, 0.6)" stroke="none" />
          <path d={areaPaths.areaPathC} fill="rgba(252, 165, 165, 0.6)" stroke="none" />
          <path d={areaPaths.areaPathD} fill="rgba(167, 243, 208, 0.6)" stroke="none" />

          {/* Connected lines between points */}
          {formData.chartPoints.length > 1 && (
            <path
              d={formData.chartPoints.map((point, i) => 
                `${i === 0 ? 'M' : 'L'} ${toSvgX(point.x)} ${toSvgY(point.y)}`
              ).join(' ')}
              fill="none"
              stroke={colors.primary}
              strokeWidth="2"
            />
          )}

          {/* Axes */}
          <line
            x1={margin.left}
            y1={height - margin.bottom}
            x2={width - margin.right}
            y2={height - margin.bottom}
            stroke={colors.axisColor}
            strokeWidth="2"
          />
          <line
            x1={margin.left}
            y1={margin.top}
            x2={margin.left}
            y2={height - margin.bottom}
            stroke={colors.axisColor}
            strokeWidth="2"/>

            {/* Axis labels */}
            {xTicks.filter((tick) => tick % 5 === 0).map((tick) => (
              <g key={`xtick-${tick}`}>
                <text
                  x={toSvgX(tick)}
                  y={height - margin.bottom + 20}
                  textAnchor="middle"
                  className="text-xs font-medium"
                  fill={colors.axisColor}
                  fontSize={13}
                >
                  {tick}
                </text>
              </g>
            ))}
            {yTicks.filter((tick) => tick % 10 === 0 || tick === 40).map((tick) => (
              <g key={`ytick-${tick}`}>
                <text
                  x={margin.left - 10}
                  y={toSvgY(tick)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="text-xs font-medium"
                  fill={colors.axisColor}
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
              fill={colors.dark}
            >
              Height (cm)
            </text>
  
            {/* X-axis title */}
            <text
              x={width / 2}
              y={height - 10}
              textAnchor="middle"
              className="text-sm font-semibold"
              fill={colors.dark}
            >
              Weeks
            </text>
  
            {/* Plotted points with delete buttons */}
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
                  fill={colors.pointColor}
                  stroke={colors.pointStroke}
                  strokeWidth="1"
                />
                {hoveredPoint === i && (
                  <g>
                    {/* Tooltip */}
                    <rect
                      x={toSvgX(point.x) + 10}
                      y={toSvgY(point.y) - 30}
                      width="100"
                      height="25"
                      fill={colors.tooltipBg}
                      rx="4"
                    />
                    <text
                      x={toSvgX(point.x) + 15}
                      y={toSvgY(point.y) - 12}
                      fill="white"
                      className="text-xs"
                    >
                      Week {point.x}, {point.y}cm
                    </text>
                    {/* Delete button */}
                    <circle
                      cx={toSvgX(point.x) + 15}
                      cy={toSvgY(point.y) - 15}
                      r="8"
                      fill={colors.deleteBtn}
                      className="cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({
                          ...prev,
                          chartPoints: prev.chartPoints.filter((_, index) => index !== i)
                        }));
                      }}
                    />
                    <X
                      className="cursor-pointer"
                      size={12}
                      color="white"
                      style={{
                        transform: `translate(${toSvgX(point.x) + 9}px, ${toSvgY(point.y) - 21}px)`
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        setFormData(prev => ({
                          ...prev,
                          chartPoints: prev.chartPoints.filter((_, index) => index !== i)
                        }));
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
                  stroke="#6b7280"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
                <line
                  x1={margin.left}
                  y1={mousePos.y}
                  x2={width - margin.right}
                  y2={mousePos.y}
                  stroke="#6b7280"
                  strokeWidth="1"
                  strokeDasharray="5,5"
                />
              </>
            )}
          </svg>
  
          {/* Legend */}
          <div className={`absolute top-4 left-10 bg-white p-3 rounded shadow-md border ${gender === 'girl' ? 'border-pink-100' : 'border-blue-100'} text-sm`}>
            <h4 className={`font-semibold mb-2 ${gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}`}>Height Gain Zones</h4>
            <div className="space-y-1">
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-500 opacity-60 mr-2 rounded"></div>
                <span className={gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}>Zone A-B (Low)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-red-300 opacity-60 mr-2 rounded"></div>
                <span className={gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}>Zone C (Normal-Low)</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-green-200 opacity-60 mr-2 rounded"></div>
                <span className={gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}>Zone D (Normal-High)</span>
              </div>
            </div>
          </div>
        </div>
  
        {/* Instructions */}
        <div className={`mt-6 p-4 ${gender === 'girl' ? 'bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200' : 'bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200'} rounded-lg`}>
          <h4 className={`font-semibold mb-2 ${gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}`}>How to use:</h4>
          <ul className={`list-disc list-inside space-y-1 ${gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}`}>
            <li>Select gender using the radio buttons above</li>
            <li>Click anywhere on the chart to plot a point</li>
            <li>Hover over points to see details and delete option</li>
            <li>Points will be automatically connected in chronological order</li>
          </ul>
        </div>
  
        <Other />
        <FormSubmitHandler formData={formattedData} />
      </div>
    );
  };
  
  export default HeightGainChart;
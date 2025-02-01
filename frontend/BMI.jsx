// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { X } from 'lucide-react';
import './style.css'

// eslint-disable-next-line react/prop-types
const BMIChart = ({ points, onPlotPoint, onDeletePoint }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 50, left: 55 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xMax = 42;
  const yMax = 18;
  const xTicks = [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36, 38, 40, 42];
  const yTicks = [-2, 0, 2, 4, 6, 8, 10, 12, 14, 16, 18];

  const toSvgX = (x) => (x / xMax) * chartWidth + margin.left;
  const toSvgY = (y) => chartHeight - ((y + 2) / (yMax + 2)) * chartHeight + margin.top;
  const toDataX = (x) => ((x - margin.left) / chartWidth) * xMax;
  const toDataY = (y) => ((chartHeight - (y - margin.top)) / chartHeight) * (yMax + 2) - 2;

  // Zone data
  const zones = [
    {
      path: `M ${toSvgX(0)} ${toSvgY(0)} 
             Q ${toSvgX(16)} ${toSvgY(4)}, ${toSvgX(42)} ${toSvgY(18)}`,
      label: "A"
    },
    {
      path: `M ${toSvgX(0)} ${toSvgY(0)} 
             Q ${toSvgX(16)} ${toSvgY(2.1)}, ${toSvgX(42)} ${toSvgY(12.3)}`,
      label: "B"
    },
    {
      path: `M ${toSvgX(0)} ${toSvgY(0)} 
             Q ${toSvgX(16)} ${toSvgY(0.8)}, ${toSvgX(42)} ${toSvgY(11)}`,
      label: "C"
    },
    {
      path: `M ${toSvgX(0)} ${toSvgY(0)} 
             Q ${toSvgX(16)} ${toSvgY(0.4)}, ${toSvgX(42)} ${toSvgY(7)}`,
      label: "D"
    }
  ];
  
  
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
      onPlotPoint({ x: dataX, y: dataY });
    }
  };

  return (
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

        {/* Zones */}
        {zones.map((zone, index) => (
          <g key={`zone-${index}`}>
            <path
              d={zone.path}
              fill="none"
              stroke="#ccc"
              strokeWidth="2"
            />
            <text 
              x={width - margin.right + 10} 
              y={100 + index * 60}
              className="font-bold"
            >
              {zone.label}
            </text>
          </g>
        ))}

        {/* Connected lines between points */}
        {/*eslint-disable-next-line react/prop-types*/}
        {points.length > 1 && (
          <path
            
            // eslint-disable-next-line react/prop-types
            d={points.map((point, i) => 
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
            >
              {tick}
            </text>
          </g>
        ))}

        {/* Axis titles */}
        <text
          x={width / 2}
          y={height -0}
          textAnchor="middle"
          className="text-sm font-semibold"
        >

          POA (weeks)
        </text>
        <text
          x={15}
          y={height / 2}
          transform={`rotate(-90, 15, ${height / 2})`}
          textAnchor="middle"
          className="text-sm font-semibold"
        >
          Weight gain (kg)
        </text>

        {/* Plotted points with delete buttons */}
        
        {/*eslint-disable-next-line react/prop-types*/}
        {points.map((point, i) => (
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
                {/* Tooltip */}
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
                {/* Delete button */}
                <circle
                  cx={toSvgX(point.x) + 15}
                  cy={toSvgY(point.y) - 15}
                  r="8"
                  fill="red"
                  className="cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeletePoint(i);
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
                    onDeletePoint(i);
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
    </div>
  );
};

const GrowthChart = () => {
  const [formData, setFormData] = useState({
    bmiChartPoints: []
  });

  const handlePlotBMIPoint = (point) => {
    setFormData(prev => ({
      ...prev,
      bmiChartPoints: [...prev.bmiChartPoints, point]
    }));
  };

  return (
    <div>

      {/* BMI Chart Section */}
      <div className="bg-white rounded-lg shadow mt-6">
        <div className="border-b p-4">
          <h3 className="text-lg font-semibold">BMI / Weight Gain Chart</h3>
        </div>
        <div>
          <BMIChart 
            points={formData.bmiChartPoints} 
            onPlotPoint={handlePlotBMIPoint}
          />
          
        </div>
        
      </div>
      <table  className='BMI' border={1} >
            <thead>
              <th>BMI</th>
              <th>&lt;18</th>
              <th>18.5-24.9</th>
              <th>25-29.9</th>
              <th>&gt;30</th>    
          </thead>
          <thead>
            <th>Zone</th>
            <th>A & B</th>
            <th>B & C</th>
            <th>C & D</th>
            <th>Below D</th>
          </thead>
          </table>
          

    </div>
  );
};

export default GrowthChart;
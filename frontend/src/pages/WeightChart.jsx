import { useState } from 'react';
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

  const width = 1300;
  const height = 800;
  const margin = { top: 20, right: 30, bottom: 50, left: 55 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  const xMax = 60;
  const yMax = 28;
  const xTicks = Array.from({length: 60}, (_, i) => i + 1);
  const yTicks = Array.from({length: 29}, (_, i) => i + 1);

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
      {
        path: `M ${toSvgX(0)} ${toSvgY(1.8 + adjustment)} ,${toSvgX(6)} ${toSvgY(4.8 + adjustment)}
               Q ${toSvgX(12)} ${toSvgY(7 + adjustment)}, ${toSvgX(24)} ${toSvgY(8.6 + adjustment)}
               Q ${toSvgX(48)} ${toSvgY(11 + adjustment)}, ${toSvgX(60)} ${toSvgY(12.1 + adjustment)}`,
        label: "B"
      },
      {
        path: `M ${toSvgX(0)} ${toSvgY(2.4 + adjustment)} ,${toSvgX(6)} ${toSvgY(5.8 + adjustment)}
               Q ${toSvgX(12)} ${toSvgY(8 + adjustment)}, ${toSvgX(24)} ${toSvgY(10 + adjustment)}
               Q ${toSvgX(48)} ${toSvgY(12.9 + adjustment)}, ${toSvgX(60)} ${toSvgY(14.4 + adjustment)}`,
        label: "C"
      },
      {
        path: `M ${toSvgX(0)} ${toSvgY(2.9 + adjustment)} ,${toSvgX(6)} ${toSvgY(6.9 + adjustment)}
               Q ${toSvgX(12)} ${toSvgY(9 + adjustment)}, ${toSvgX(24)} ${toSvgY(11.2 + adjustment)}
               Q ${toSvgX(48)} ${toSvgY(14.8 + adjustment)}, ${toSvgX(60)} ${toSvgY(16.4 + adjustment)}`,
        label: "D"
      },
      {
        path: `M ${toSvgX(0)} ${toSvgY(4 + adjustment)} ,${toSvgX(6)} ${toSvgY(9.8 + adjustment)}
               Q ${toSvgX(12)} ${toSvgY(12.2 + adjustment)}, ${toSvgX(24)} ${toSvgY(15.2 + adjustment)}
               Q ${toSvgX(48)} ${toSvgY(20.9 + adjustment)}, ${toSvgX(60)} ${toSvgY(22.2 + adjustment)}`,
        label: "E"
      },
      {
        path: `M ${toSvgX(0)} ${toSvgY(4.9 + adjustment)} ,${toSvgX(6)} ${toSvgY(10.9 + adjustment)}
               Q ${toSvgX(12)} ${toSvgY(13.4 + adjustment)}, ${toSvgX(24)} ${toSvgY(17 + adjustment)}
               Q ${toSvgX(48)} ${toSvgY(23 + adjustment)}, ${toSvgX(60)} ${toSvgY(25.9 + adjustment)}`,
        label: "F"
      }
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
      areaPathC: `${zones[1].path} L ${toSvgX(60)} ${toSvgY(14.4 + adjustment)}
                  Q ${toSvgX(48)} ${toSvgY(12.9 + adjustment)}, ${toSvgX(24)} ${toSvgY(10 + adjustment)}
                  Q ${toSvgX(12)} ${toSvgY(8 + adjustment)}, ${toSvgX(6)} ${toSvgY(5.8 + adjustment)}
                  L ${toSvgX(0)} ${toSvgY(2.4 + adjustment)} Z`,
      areaPathD: `${zones[2].path} L ${toSvgX(60)} ${toSvgY(16.4 + adjustment)}
                  Q ${toSvgX(48)} ${toSvgY(14.8 + adjustment)}, ${toSvgX(24)} ${toSvgY(11.2 + adjustment)}
                  Q ${toSvgX(12)} ${toSvgY(9 + adjustment)}, ${toSvgX(6)} ${toSvgY(6.8 + adjustment)}
                  L ${toSvgX(0)} ${toSvgY(2.9 + adjustment)} Z`,
      areaPathE: `${zones[3].path} L ${toSvgX(60)} ${toSvgY(22.2 + adjustment)}
                  Q ${toSvgX(48)} ${toSvgY(20.9 + adjustment)}, ${toSvgX(24)} ${toSvgY(15.2 + adjustment)}
                  Q ${toSvgX(12)} ${toSvgY(12.2 + adjustment)}, ${toSvgX(6)} ${toSvgY(9.8 + adjustment)}
                  L ${toSvgX(0)} ${toSvgY(4 + adjustment)} Z`,
      areaPathF: `${zones[4].path} L ${toSvgX(60)} ${toSvgY(25.9 + adjustment)}
                  Q ${toSvgX(48)} ${toSvgY(23 + adjustment)}, ${toSvgX(24)} ${toSvgY(17 + adjustment)}
                  Q ${toSvgX(12)} ${toSvgY(13.4 + adjustment)}, ${toSvgX(6)} ${toSvgY(10.9 + adjustment)}
                  L ${toSvgX(0)} ${toSvgY(4.9 + adjustment)} Z`
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
    <div className="space-y-4">
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
          className="cursor-crosshair"
        >
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

          {/* Colored areas */}
          <path d={areaPaths.areaPathAB} fill="rgba(237, 19, 19, 0.59)" stroke="none" />
          <path d={areaPaths.areaPathC} fill="rgba(254,138,132,0.60)" stroke="none" />
          <path d={areaPaths.areaPathD} fill="rgba(235, 170, 148, 0.60)" stroke="none" />
          <path d={areaPaths.areaPathE} fill="rgba(177, 244, 177, 0.60)" stroke="none" />
          <path d={areaPaths.areaPathF} fill="rgba(216, 180, 254, 0.6)" stroke="none" />

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

          {/* Axis labels */}
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
            Weight gain (kg)
          </text>

          {/* X-axis title */}
          <text
            x={width / 2}
            y={height - 10}
            textAnchor="middle"
            className="text-sm font-semibold"
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
              <span>Zone A-B (Low)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-400 opacity-60 mr-2"></div>
              <span>Zone C (Normal-Low)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-200 opacity-65 mr-2"></div>
              <span>Zone D (Normal)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-200 opacity-60 mr-2"></div>
              <span>Zone E (Normal-High)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-300 opacity-60 mr-2"></div>
              <span>Zone F (High)</span>
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

      <Other/>
      <FormSubmitHandler formData={formattedData} />
    </div>
  );
};

export default WeightGainChart;

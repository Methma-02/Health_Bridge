
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

//a chart that displays the fundal height growth chart
// eslint-disable-next-line no-unused-vars, react/prop-types
const FundalHeightChart = ({ points, onPlotPoint, onDeletePoint }) => {
  //state hooks to manage mouse position, crosshair and hover points
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  //the dimensions for the chart and margins
  const width = 600;
  const height = 400;
  const margin = { top: 20, right: 30, bottom: 50, left: 55 };
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  //ranged for tick values for x and y axes
  const xMin = 15;
  const xMax = 40;
  const yMax = 45;
  const xTicks = Array.from({ length: (xMax - xMin) / 5 + 1 }, (_, i) => xMin + i * 5);
  const yTicks = Array.from({ length: 10 }, (_, i) => i * 5);

  //functions to covert data between values and svg coordinates
  const toSvgX = (x) => ((x - xMin) / (xMax - xMin)) * chartWidth + margin.left;
  const toSvgY = (y) => chartHeight - (y / yMax) * chartHeight + margin.top;
  const toDataX = (x) => Math.round(((x - margin.left) / chartWidth) * (xMax - xMin) + xMin);
  const toDataY = (y) => Number((((chartHeight - (y - margin.top)) / chartHeight) * yMax).toFixed(1));

  
  //predefined lines
  const growthCurves = [
    {
      
      points: [
        { x: 15, y: 19 },
        { x: 34, y: 37 }
      ]
    },
    {
      
      points: [
        { x: 15, y: 14 },
        { x: 34, y: 32 }
      ]
    },
    {
      points:[
        {x:34, y:38},
        {x:40, y:45}
      ]
    },
    {
      points:[
        {x:34, y:31},
        {x:40, y:37}
      ]
    }
  ];

  //handle mouse movement within the element to display crosshairs
  const handleMouseMove = (e) => {
    if (!showCrosshair) return; // if crosshair is not enabled do nothing
    const rect = e.currentTarget.getBoundingClientRect(); //the bounding SVG rectangle
    const x = e.clientX - rect.left; //X mouse position relative to SVG
    const y = e.clientY - rect.top; //Y mouse position relative to SVG
    setMousePos({ x, y }); //update the mouse position in state
  };

  //Handle mouse click for plotting new points on the chart
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    //converting mouse points into data values
    const dataX = toDataX(x);
    const dataY = toDataY(y);
    
    //condition to check if the data is in range of the graph and then plot it
    if (dataX >= xMin && dataX <= xMax && dataY >= 0 && dataY <= yMax) {
      onPlotPoint({ x: dataX, y: dataY });
    }
  };

  return (
    <div className="relative">
      <svg
        width={width} //intilazing the values
        height={height}
        onMouseMove={handleMouseMove} //mouse movement for crosshair
        onClick={handleClick} //mouse click tp plot point
        onMouseEnter={() => setShowCrosshair(true)} //enable crosshair on mouse enter
        onMouseLeave={() => {
          setShowCrosshair(false); // disble crosshair as mouse leave
          setHoveredPoint(null);
        }}
        
      >
        
        <rect //the reactangle for the chart
          x={margin.left}
          y={margin.top}
          width={chartWidth}
          height={chartHeight}
          fill="#f8f9fa"
        />

        {/*grid lines*/}
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

          {/* the predfined growth lines*/}
        {growthCurves.map((curve, index) => (
          <path
            key={`curve-${index}`}
            d={`M ${toSvgX(curve.points[0].x)} ${toSvgY(curve.points[0].y)} L ${toSvgX(curve.points[1].x)} ${toSvgY(curve.points[1].y)}`}
            fill="none"
            stroke="black"
            strokeWidth="2"
          />
        ))}

        {/*user plotted points connected with a line */}
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

        
        <line //X and Y axes
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

        {/*x axis ticks and labels */}
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

        {/*Y axis ticks and labels*/}
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

        
        <text //Axes titles
          x={width / 2}
          y={height - 5}
          textAnchor="middle"
          
        >
          POA (weeks)
        </text>
        <text
          x={15}
          y={height / 2}
          transform={`rotate(-90, 15, ${height / 2})`}
          textAnchor="middle"
        >
          Fundal height (cm)
        </text>

        {/*User-plotted points with hover interactions */}
        {/*eslint-disable-next-line react/prop-types*/}
        {points.map((point, i) => (
          <g
            key={i}
            onMouseEnter={() => setHoveredPoint(i)} //show tooltip on hover
            onMouseLeave={() => setHoveredPoint(null)} //hode tooltip on hover leave
          >
            <circle
              cx={toSvgX(point.x)}
              cy={toSvgY(point.y)}
              r="4"
              fill="red" //dot color
            />
            {hoveredPoint === i && (
              <g>
                <rect
                  x={toSvgX(point.x) + 10}
                  y={toSvgY(point.y) - 30}
                  width="100"
                  height="25"
                  fill="rgba(0,0,0,0.8)" //background for tooltip
                  rx="4"
                />
                <text //displays the week and height
                  x={toSvgX(point.x) + 15}//positions the text slightly to the right of the point
                  y={toSvgY(point.y) - 12}  //positions the text slightly above the point
                  fill="white"
                >
                  Week {point.x}, {point.y}cm
                </text>
                <circle //x , y corrdinated for the circle
                  cx={toSvgX(point.x) + 15}
                  cy={toSvgY(point.y) - 15}
                  r="8"
                  fill="red"
                  onClick={(e) => { //prevents event propagation when the cirle is clicked
                    e.stopPropagation();
                  }}
                />
              </g>
            )}
          </g>
        ))}

        
        {showCrosshair && (
          <>
            <line //drawws a vertical dashed line for the crosshair
              x1={mousePos.x} //starts at the current X mouse position
              y1={margin.top} // starts from the top margin from the chart
              x2={mousePos.x} //ends at the same X position
              y2={height - margin.bottom} // ends at the bottom margin of the chart
              stroke="#999" 
              strokeWidth="1"
              strokeDasharray="5,5" //created a dashed line pattern
            />
            <line //draw a horizontal dashed line for the crosshair
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
    fundalHeightPoints: []
  });

  const handlePlotPoint = (point) => {
    setFormData(prev => ({
      ...prev,
      fundalHeightPoints: [...prev.fundalHeightPoints, point]
    }));
  };

  return (
    <div>
      <div>
        <div>
          <h3>Fundal Height Growth Chart</h3>
        </div>
        <div>
          <FundalHeightChart 
            points={formData.fundalHeightPoints} 
            onPlotPoint={handlePlotPoint}
          />
        </div>
      </div>
    </div>
  );
};

export default GrowthChart;
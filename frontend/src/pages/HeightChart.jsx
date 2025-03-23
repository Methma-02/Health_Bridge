import { useState, useEffect } from 'react'; //import required hooks from react
import { X, ChevronRight, ChevronLeft } from 'lucide-react'; //icons from lucide react library

const HeightGainChart = () => { //define the heighgainchart component
  const [gender, setGender] = useState('boy'); //useState hook to manage the gender selection

  // useState hook to manage form data, including registration number and height chart data
  const [formData, setFormData] = useState({
    regNo:'', //store reg no
    chartPoints: [], //stores an array of height points
    heightOtherData: Array(60).fill().map(() => ({ //Initialize an array of 60 objects with default value
      "date the phm came": '',
      "other dates": '',
      "Family planning": '',
  }))
  });
// Object to store formatted data structure for height gain tracking
  const formattedData = {
    type: 'heightGain',
    data: {
      gender, //stores gender selection
      measurements: formData.chartPoints //stores height points
    }
  };

  // State to track mouse position for the chart's crosshair
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  // State to control the visibility of the crosshair
  const [showCrosshair, setShowCrosshair] = useState(false);
    // State to track the currently hovered data point
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Load saved data when component mounts
  useEffect(() => {
    // Check if there's a registration number in localStorage
    const savedRegNo = localStorage.getItem('heightChartRegNo');
    
    if (savedRegNo) {
      // Update form data with the retrieved registration number
      setFormData(prev => ({
        ...prev,
        regNo: savedRegNo
      }));
      
      // Fetch the data using the saved registration number
      fetchDataByRegistrationNumber(savedRegNo);
    }
  }, []);//Empty dependency array ensures this runs only once on mount

// Function to determine responsive chart dimensions based on a base size
    const useResponsiveDimensions = () => {
    const baseWidth = 1152; //chart width
    const baseHeight = 800; //chart height
    const aspectRatio = baseHeight / baseWidth; //aspect ratio
    
    return {
      width: '100%', //full width responsiveness
      height: 'auto', //auto adjust height based on aspect ratio
      aspectRatio: `${baseWidth} / ${baseHeight}`, //maintain aspect ratio
      viewBox: `0 0 ${baseWidth} ${baseHeight}` //defines the SVG viewport
    };
  };

  const dimensions = useResponsiveDimensions(); /// Function to determine responsive chart dimensions based on a base size

  //define static chart dimensions
  const width = 1300; 
  const height = 800;
  const margin = { top: 20, right: 30, bottom: 50, left: 55 };

  // Calculate the usable area of the chart after accounting for margins
  const chartWidth = width - margin.left - margin.right;
  const chartHeight = height - margin.top - margin.bottom;

  // Define the max and min values for X-axis and Y-axis ranges
  const xMax = 60;
  const yMin = 40;
  const yMax = 120;

  //generate tick marks for x and y axis
  const xTicks = Array.from({length: 60}, (_, i) => i + 1);
  const yTicks = Array.from({length: Math.floor((yMax - yMin) / 2) + 1}, (_, i) => yMin + (i * 2));

  /*
  data conversions to plot data points on SVG charts and to handle user clicking
  */
  //convert data X and Y coordinates to SVG coordinates
  const toSvgX = (x) => (x / xMax) * chartWidth + margin.left;
  const toSvgY = (y) => chartHeight - ((y - yMin) / (yMax - yMin)) * chartHeight + margin.top;

  //converts SVG back to data points
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
  // Store gender-based colors in a variable
  const colors = getGenderColors();

  // Zone data with gender adjustment
  const getZones = (isGirl) => { 
    const adjustment = isGirl ? -2 : 0; //subtracts to points from each path 
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

    // Function to handle mouse movement for crosshair positioning
  const handleMouseMove = (e) => {
    if (!showCrosshair) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Scale coordinates based on actual rendered size
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    
    setMousePos({ //mouse position based on render size
      x: x * scaleX, 
      y: y * scaleY 
    });
  };
// Function to handle click events, store clicked position
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect(); //get element dimension
    const x = e.clientX - rect.left; //Mouse X position
    const y = e.clientY - rect.top; //Mouse Y position
    
    // Scale coordinates based on actual rendered size
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    const scaledX = x * scaleX;
    const scaledY = y * scaleY;
    
    //convert data to X and Y points
    const dataX = Math.round(toDataX(scaledX)); 
    const dataY = Number(toDataY(scaledY).toFixed(1));
    
    // Ensure clicked coordinates are within valid range before storing
    if (dataX >= 0 && dataX <= xMax && dataY >= yMin && dataY <= yMax) {
      setFormData(prev => ({
        ...prev,
        chartPoints: [...prev.chartPoints, { x: dataX, y: dataY }]
      }));
    }
  };

  // function to update reg number in form
  const handleRegNoChange = (value) => {
    setFormData(prev => ({
      ...prev,
      regNo: value
    }));
  };

  const fetchDataByRegistrationNumber = async (regNoParam) => {
    const regNo = regNoParam || formData.regNo;
    if (!regNo) {
      alert('Please enter a registration number.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:3000/api/baby/${regNo}`, {
        headers: { 'x-user-role': 'physician' }
      });
      
      // Initialize default weight data structure for a new patient
      const defaultHeightOtherData = Array(60).fill().map(() => ({
        "date the phm came": '',
        "other dates": '',
        "Family planning": '',
      }));
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('heightChartRegNo', regNo);
        
        // Initialize height data with defaults if missing
        let heightGainData = { gender: 'boy', measurements: [] };
        let heightOtherData = defaultHeightOtherData;
        
        // Initialize height data with defaults if missing
        if (data.HeightGainData && data.HeightGainData.length > 0) {
          if (data.HeightGainData[0].gender) {
            heightGainData.gender = data.HeightGainData[0].gender;
          }
          
          if (data.HeightGainData[0].measurements && Array.isArray(data.HeightGainData[0].measurements)) {
            heightGainData.measurements = data.HeightGainData[0].measurements;
          }
        }
        
        // Handle heightOtherData and ensure proper structure
        if (data.heightOtherData && Array.isArray(data.heightOtherData)) {
          // Make sure we maintain the structure even if some entries are missing
          heightOtherData = defaultHeightOtherData.map((defaultItem, index) => {
            if (data.heightOtherData[index]) {
              return {
                "date the phm came": data.heightOtherData[index]["date the phm came"] || '',
                "other dates": data.heightOtherData[index]["other dates"] || '',
                "Family planning": data.heightOtherData[index]["Family planning"] || '',
              };
            }
            return defaultItem;
          });
        }
        
        // Update state with retrieved or default data
        setGender(heightGainData.gender);
        setFormData(prev => ({
          ...prev,
          regNo: regNo,
          chartPoints: heightGainData.measurements,
          heightOtherData: heightOtherData
        }));
        
        if (!regNoParam) alert('Data loaded successfully!');
      } else {
        // If no data found, set up default data structure for a new patient
        setFormData(prev => ({
          ...prev,
          regNo: regNo,
          chartPoints: [],
          heightOtherData: defaultHeightOtherData
        }));
        if (!regNoParam) alert('No existing data found for this registration number. Creating new record.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (!regNoParam) alert('Error fetching data. Please try again.');
    }
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.regNo) {
      alert('Please enter a registration number.');
      return;
    }
    
    try {
      // First, fetch the existing record
      const fetchResponse = await fetch(
        `http://localhost:3000/api/baby/${formData.regNo}`,
        {
          headers: {
            'x-user-role': 'physician',
          }
        }
      );
      
      let existingData = {};
      if (fetchResponse.ok) {
        existingData = await fetchResponse.json();
      }
      
      // Update the height gain data
      existingData.HeightGainData = [{
        gender,
        measurements: formData.chartPoints
      }];
      existingData.heightOtherData = formData.heightOtherData
      // Submit the updated data
      const submitResponse = await fetch('http://localhost:3000/api/baby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'physician',
        },
        body: JSON.stringify({
          ...existingData,
          regNo: formData.regNo
        }),
      });
      
      if (!submitResponse.ok) {
        const errorData = await submitResponse.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }
      
      // Save registration number to localStorage after successful submission
      localStorage.setItem('heightChartRegNo', formData.regNo);
      
      const result = await submitResponse.json();
      console.log('Form submitted successfully:', result);
      alert('Height gain data submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Failed to submit form: ${error.message}`);
    }
  };

// State to manage the current page index  
  const [currentPage, setCurrentPage] = useState(0);
  const CELLS_PER_PAGE = 12; // Number of items displayed per page  

  /**
 * Handles changes in the heightOtherData field.
 * Updates the respective field in the heightOtherData array.
 */
  const handleHeightOtherDataChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      heightOtherData: prev.heightOtherData.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    }));
  };

// Calculate starting and ending indices for paginated data  
  const startIdx = currentPage * CELLS_PER_PAGE;
  const endIdx = startIdx + CELLS_PER_PAGE;
  const totalPages = Math.ceil(60 / CELLS_PER_PAGE);// Determine total pages (assuming 60 records in total)  


  /**
 * Moves to the next page if not already at the last page.
 */
  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

/**
 * Moves to the previous page if not already at the first page.
 */
  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  // Ensure weightOtherData exists with default fields if its undefined or empty, initialize a 60 row dataset
  const ensureHeightOtherData = () => {
    if (!formData.heightOtherData || !Array.isArray(formData.heightOtherData) || formData.heightOtherData.length === 0) {
      return Array(60).fill().map(() => ({
        "date the phm came": '',
        "other dates": '',
        "Family planning": '',
      }));
    }
    return formData.heightOtherData;
  };

  // Get field names safely
  const getHeightOtherDataFields = () => {
    const safeHeightOtherData = ensureHeightOtherData();
    return Object.keys(safeHeightOtherData[0] || {});
  };

  return (
    <form onSubmit={handleSubmit}>
    <div className="w-full max-w-4xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
       <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center" >Height Gain Chart</h1>

       <div className="mb-6 bg-white border-l-4 border-blue-500 p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold text-blue-700 mb-4 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
            </svg>
            Registration Information
          </h2>
          <div className="flex items-center space-x-4">
            <label className="text-sm font-medium text-blue-700">Registration Number</label>
            <input
              type="text"
              value={formData.regNo || ''}
              onChange={(e) => handleRegNoChange(e.target.value)}
              className="flex-grow p-2 text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
            />
            <button
              type="button"
              onClick={() => fetchDataByRegistrationNumber()}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200">
                Get Info
            </button>
            </div>
          </div>
      
      <div className="space-y-4 mb-6">
        <div className={`flex items-center justify-center space-x-8 p-4 ${gender === 'girl' ? 'bg-pink-50' : 'bg-blue-50'} rounded-lg`}>
          <div className="flex items-center space-x-2">
            <input type="radio" id="boy" name="gender" value="boy" checked={gender === "boy"} onChange={(e) => {
                setGender(e.target.value);
                setFormData((prev) => ({ ...prev, chartPoints: [] }));
              }}
              className={`form-radio ${gender === 'girl' ? 'text-pink-600 focus:ring-pink-500' : 'text-blue-600 focus:ring-blue-500'}`}
            />
            <label htmlFor="boy" className={`text-sm font-medium ${gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}`}>Boy</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="radio" id="girl"
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

        <div className="mt-6 p-4 bg-gradient-to-br from-white to-blue-50 border border-blue-200 rounded-lg shadow-md">
  <h3 className={`text-xl font-semibold mb-4 flex items-center ${gender === 'girl' ? 'text-pink-600' : 'text-blue-600'}`}>
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
    </svg>
    Additional Details
  </h3>
  
  <div className="overflow-x-auto rounded-lg border border-blue-100">
    <table className="w-full border-collapse bg-white">
      <thead className="bg-blue-50">
        <tr>
          <th className="p-2 border border-blue-100 text-left font-semibold text-blue-700">Week</th>
          {getHeightOtherDataFields().map(field => (
            <th key={field} className="p-2 border border-blue-100 text-left font-semibold text-blue-700">{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ensureHeightOtherData().slice(startIdx, endIdx).map((rowData, rowIndex) => (
          <tr key={startIdx + rowIndex} className={rowIndex % 2 === 0 ? 'bg-blue-50 bg-opacity-30' : 'bg-white'}>
            <td className="p-2 border border-blue-100 font-medium text-blue-600">{startIdx + rowIndex + 1}</td>
            {getHeightOtherDataFields().map(field => (
              <td key={field} className="p-2 border border-blue-100">
                {field === "date the phm came" || field === "other dates" ? (
                  <input
                    type="date"
                    value={rowData[field] || ''}
                    onChange={(e) => {
                      handleHeightOtherDataChange(startIdx + rowIndex, field, e.target.value);
                    }}
                    className="w-full p-1 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 bg-opacity-50"
                  />
                ) : (
                  <input
                    type="text"
                    value={rowData[field] || ''}
                    onChange={(e) => {
                      handleHeightOtherDataChange(startIdx + rowIndex, field, e.target.value);
                    }}
                    className="w-full p-1 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 bg-opacity-50"
                  />
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  {/* Pagination */}
  <div className="flex justify-between items-center mt-4 px-2">
    <button 
      type="button"
      onClick={prevPage}
      disabled={currentPage === 0}
      className={`flex items-center px-4 py-2 rounded-md transition duration-200 font-medium ${
        currentPage === 0 
          ? 'bg-blue-100 text-blue-300 cursor-not-allowed' 
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      <ChevronLeft size={16} className="mr-1" />
      Previous
    </button>
    <span className="text-sm bg-blue-50 px-3 py-1 rounded-full text-blue-600 font-medium border border-blue-200">
      Page {currentPage + 1} of {totalPages}
    </span>
    <button 
      type="button"
      onClick={nextPage}
      disabled={currentPage >= totalPages - 1}
      className={`flex items-center px-4 py-2 rounded-md transition duration-200 font-medium ${
        currentPage >= totalPages - 1 
          ? 'bg-blue-100 text-blue-300 cursor-not-allowed' 
          : 'bg-blue-500 text-white hover:bg-blue-600'
      }`}
    >
      Next
      <ChevronRight size={16} className="ml-1" />
    </button>
  </div>
</div>
      
<div className="flex justify-center mt-6">
  <button 
    type="submit" 
    className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold text-lg"
  >
    Submit Height Details
  </button>
</div>
      </div>
      </form>
    );
  };
  
  export default HeightGainChart;
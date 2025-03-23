import { useState, useEffect } from 'react';
import { X, ChevronRight, ChevronLeft } from 'lucide-react'; //import icons from lucide-react
import Header from '../HeaderFooter/Header';
import Footer from '../HeaderFooter/Footer';

const WeightGainChart = () => {
  const [gender, setGender] = useState('boy');  // State to track selected gender (default is 'boy')
  const [formData, setFormData] = useState({  // State to store form data, including registration number and weight data
    regNo: '',
    chartPoints: [], //store weight points
    weightOtherData: Array(60).fill().map(() => ({ //map placeholders
      "date the phm came": '',
      "other dates": '',
      "Family planning": '',
    }))
  });

  const formattedData = {  // Structure for formatted data to be sent or stored
    type: 'weightGain',
    data: {
      gender,// Selected gender
      measurements: formData.chartPoints //collected weight points
    }
  };

    // State to track mouse position and crosshair visibility
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [showCrosshair, setShowCrosshair] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState(null);

  // Load saved data when component mounts
  useEffect(() => {
    const savedRegNo = localStorage.getItem('weightChartRegNo');
    if (savedRegNo) {
      setFormData(prev => ({
        ...prev,
        regNo: savedRegNo// Set the registration number from localStorage
      }));
      fetchDataByRegistrationNumber(savedRegNo);// Fetch data using the saved registration number
    }
  }, []);

  // Function to make chart dimensions responsive
  const useResponsiveDimensions = () => {
    //Base width and height
    const baseWidth = 1300;
    const baseHeight = 800;
    const aspectRatio = baseHeight / baseWidth;// Calculate aspect ratio
    return {//responsive width and height
      width: '100%',
      height: 'auto',
      aspectRatio: `${baseWidth} / ${baseHeight}`, //Maintain aspect ratio
      viewBox: `0 0 ${baseWidth} ${baseHeight}` //SVG view box for adaptive behavior
    };
  };
// Get responsive dimensions for the chart
  const dimensions = useResponsiveDimensions();
  const width = 1300; //fixed width for calculations
  const height = 800; // fixed height for calculations
  const margin = { top: 20, right: 30, bottom: 50, left: 55 }; //margins
  const chartWidth = width - margin.left - margin.right; //Calculate chart width
  const chartHeight = height - margin.top - margin.bottom; //Calculate height

  const xMax = 60;//max value for x axis (weeks)
  const yMax = 28; //max value for y axis (weight)
  const xTicks = Array.from({ length: 60 }, (_, i) => i + 1); //calculation to get x ticks
  const yTicks = Array.from({ length: 29 }, (_, i) => i + 1); //calculation to get y ticks

  //convert data coordinates to SVG coordinates
  const toSvgX = (x) => (x / xMax) * chartWidth + margin.left;
  const toSvgY = (y) => chartHeight - ((y + 2) / (yMax + 2)) * chartHeight + margin.top;
  const toDataX = (x) => ((x - margin.left) / chartWidth) * xMax;
  const toDataY = (y) => ((chartHeight - (y - margin.top)) / chartHeight) * (yMax + 2) - 2;

  // Get colors based on gender
  const getGenderColors = () => {
    if (gender === 'girl') {
      return {
        primary: "#ec4899",
        secondary: "#f472b6",
        dark: "#831843",
        light: "#fbcfe8",
        pointColor: "#db2777",
        pointStroke: "#9d174d",
        axisColor: "#be185d",
        chartBg: "#fdf2f8",
        tooltipBg: "rgba(219, 39, 119, 0.9)",
        deleteBtn: "#be123c"
      };
    } else {
      return {
        primary: "#3b82f6",
        secondary: "#60a5fa",
        dark: "#1e40af",
        light: "#bfdbfe",
        pointColor: "#3b82f6",
        pointStroke: "#1e40af",
        axisColor: "#2563eb",
        chartBg: "#f0f7ff",
        tooltipBg: "rgba(37, 99, 235, 0.9)",
        deleteBtn: "#ef4444"
      };
    }
  };

  const colors = getGenderColors();// Get colors based on gender

  // Zone data with gender adjustment
  const getZones = (isGirl) => {
    const adjustment = isGirl ? -2 : 0; // Adjust Y-values for girls
    return [ //pathways to plot the weight colored areas
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

  const zones = getZones(gender === 'girl'); //get zones based on gender
  // Function to get area paths for the chart
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
  // Handle mouse movement on the chart
  const handleMouseMove = (e) => {
    if (!showCrosshair) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    setMousePos({ x: x * scaleX, y: y * scaleY });// Update mouse position
  };
  // Handle click on the chart to add a point
  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const scaleX = width / rect.width;
    const scaleY = height / rect.height;
    const scaledX = x * scaleX;
    const scaledY = y * scaleY;
    const dataX = Math.round(toDataX(scaledX));// Convert to data X-coordinate
    const dataY = Number(toDataY(scaledY).toFixed(1));// Convert to data Y-coordinate
    if (dataX >= 0 && dataX <= xMax && dataY >= -2 && dataY <= yMax) {
      setFormData(prev => ({
        ...prev,
        chartPoints: [...prev.chartPoints, { x: dataX, y: dataY }]// Add new point to chartPoints
      }));
    }
  };
// Handle registration number change
  const handleRegNoChange = (value) => {
    setFormData(prev => ({
      ...prev,
      regNo: value// Update registration number in state
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
      const defaultWeightOtherData = Array(60).fill().map(() => ({
        "date the phm came": '',
        "other dates": '',
        "Family planning": '',
      }));
      
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('weightChartRegNo', regNo);
        
        // Check if weight gain data exists and is properly formatted
        let weightGainData = { gender: 'boy', measurements: [] };
        let weightOtherData = defaultWeightOtherData;
        
        // Handle WeightGainData
        if (data.WeightGainData && data.WeightGainData.length > 0) {
          if (data.WeightGainData[0].gender) {
            weightGainData.gender = data.WeightGainData[0].gender;
          }
          
          if (data.WeightGainData[0].measurements && Array.isArray(data.WeightGainData[0].measurements)) {
            weightGainData.measurements = data.WeightGainData[0].measurements;
          }
        }
        
        // Handle weightOtherData as a separate top-level array
        if (data.weightOtherData && Array.isArray(data.weightOtherData)) {
          // Make sure we maintain the structure even if some entries are missing
          weightOtherData = defaultWeightOtherData.map((defaultItem, index) => {
            if (data.weightOtherData[index]) {
              return {
                "date the phm came": data.weightOtherData[index]["date the phm came"] || '',
                "other dates": data.weightOtherData[index]["other dates"] || '',
                "Family planning": data.weightOtherData[index]["Family planning"] || '',
              };
            }
            return defaultItem;
          });
        }
        
        // Update state with retrieved or default data
        setGender(weightGainData.gender);
        setFormData(prev => ({
          ...prev,
          regNo: regNo,
          chartPoints: weightGainData.measurements,
          weightOtherData: weightOtherData
        }));
        
        if (!regNoParam) alert('Data loaded successfully!');
      } else {
        // If no data found, set up default data structure for a new patient
        setFormData(prev => ({
          ...prev,
          regNo: regNo,
          chartPoints: [],
          weightOtherData: defaultWeightOtherData
        }));
        if (!regNoParam) alert('No existing data found for this registration number. Creating new record.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      if (!regNoParam) alert('Error fetching data. Please try again.');
    }
  };
//handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.regNo) {
      alert('Please enter a registration number.');
      return;
    }
    try {
      const fetchResponse = await fetch(`http://localhost:3000/api/baby/${formData.regNo}`, {
        headers: { 'x-user-role': 'physician' }
      });
      
      // Initialize or use existing data
      let existingData = {};
      if (fetchResponse.ok) {
        existingData = await fetchResponse.json();
      }
      
      // Ensure WeightGainData contains all necessary properties
      existingData.WeightGainData = [{
        gender,
        measurements: formData.chartPoints
      }];
      existingData.weightOtherData = formData.weightOtherData;
      
      const submitResponse = await fetch('http://localhost:3000/api/baby', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-user-role': 'physician'
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
      
      localStorage.setItem('weightChartRegNo', formData.regNo);
      const result = await submitResponse.json();
      console.log('Form submitted successfully:', result);
      alert('Weight gain data submitted successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(`Failed to submit form: ${error.message}`);
    }
  };
  // Pagination state and handlers
  const [currentPage, setCurrentPage] = useState(0);
  const CELLS_PER_PAGE = 12;
  // Handle changes in additional weight data
  const handleWeightOtherDataChange = (index, field, value) => {
    setFormData(prev => ({
      ...prev,
      weightOtherData: prev.weightOtherData.map((row, i) =>
        i === index ? { ...row, [field]: value } : row
      )
    }));
  };

  const startIdx = currentPage * CELLS_PER_PAGE;
  const endIdx = startIdx + CELLS_PER_PAGE;
  const totalPages = Math.ceil(60 / CELLS_PER_PAGE);
  // Go to the next page
  const nextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 0) setCurrentPage(prev => prev - 1);
  };

  // Ensure weightOtherData exists with default fields
  const ensureWeightOtherData = () => {
    if (!formData.weightOtherData || !Array.isArray(formData.weightOtherData) || formData.weightOtherData.length === 0) {
      return Array(60).fill().map(() => ({
        "date the phm came": '',
        "other dates": '',
        "Family planning": '',
      }));
    }
    return formData.weightOtherData;
  };

  // Get field names safely
  const getWeightOtherDataFields = () => {
    const safeWeightOtherData = ensureWeightOtherData();
    return Object.keys(safeWeightOtherData[0] || {});
  };

  return (
    <>
    <Header/>
    <form onSubmit={handleSubmit}>
      <div className="w-full max-w-4xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">Weight Gain Chart</h1>

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
            <div className="flex items-center space-x-2"> <input
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
          <path d={areaPaths.areaPathD} fill="rgba(254, 205, 165, 0.6)" stroke="none" />
          <path d={areaPaths.areaPathE} fill="rgba(167, 243, 208, 0.6)" stroke="none" />
          <path d={areaPaths.areaPathF} fill="rgba(216, 180, 254, 0.6)" stroke="none" />

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
            strokeWidth="2"
          />

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
          {yTicks.filter((tick) => tick % 5 === 0 || tick === 1).map((tick) => (
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
            Weight gain (kg)
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
                    Week {point.x}, {point.y}kg
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
                        chartPoints:prev.chartPoints.filter((_, index) => index !== i)
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
          <h4 className={`font-semibold mb-2 ${gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}`}>Weight Gain Zones</h4>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="w-4 h-4 bg-red-500 opacity-60 mr-2 rounded"></div>
              <span className={gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}>Zone A-B (Low)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4h-4 bg-red-300 opacity-60 mr-2 rounded"></div>
              <span className={gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}>Zone C (Normal-Low)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-orange-200 opacity-65 mr-2 rounded"></div>
              <span className={gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}>Zone D (Normal)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-green-200 opacity-60 mr-2 rounded"></div>
              <span className={gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}>Zone E (Normal-High)</span>
            </div>
            <div className="flex items-center">
              <div className="w-4 h-4 bg-purple-300 opacity-60 mr-2 rounded"></div>
              <span className={gender === 'girl' ? 'text-pink-700' : 'text-blue-700'}>Zone F (High)</span>
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
    
    {/* Weight Other Details Table */}
{/* Weight Other Details Table */}
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
          {getWeightOtherDataFields().map(field => (
            <th key={field} className="p-2 border border-blue-100 text-left font-semibold text-blue-700">{field}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {ensureWeightOtherData().slice(startIdx, endIdx).map((rowData, rowIndex) => (
          <tr key={startIdx + rowIndex} className={rowIndex % 2 === 0 ? 'bg-blue-50 bg-opacity-30' : 'bg-white'}>
            <td className="p-2 border border-blue-100 font-medium text-blue-600">{startIdx + rowIndex + 1}</td>
            {getWeightOtherDataFields().map(field => (
              <td key={field} className="p-2 border border-blue-100">
                {field === "date the phm came" || field === "other dates" ? (
                  <input
                    type="date"
                    value={rowData[field] || ''}
                    onChange={(e) => {
                      handleWeightOtherDataChange(startIdx + rowIndex, field, e.target.value);
                    }}
                    className="w-full p-1 border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-50 bg-opacity-50"
                  />
                ) : (
                  <input
                    type="text"
                    value={rowData[field] || ''}
                    onChange={(e) => {
                      handleWeightOtherDataChange(startIdx + rowIndex, field, e.target.value);
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
      </div>
    <div className="flex justify-center mt-6">
      <button 
      type="submit" 
      className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold text-lg"
      >
        Submit Weight Details
      </button> 
    </div>
    </form>
    <br></br>

    <Footer/>
    </>
  );
};

export default WeightGainChart;
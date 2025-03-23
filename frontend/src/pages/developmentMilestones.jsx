import { useState, useEffect } from "react";
import Header from "../HeaderFooter/Header";
import Footer from "../HeaderFooter/Footer";

/*
     * Initial milestones data representing different stages of a baby's development.
     * Each stage contains an age range and a list of milestones achieved during that time.
*/
const DevelopmentMilestones = () => {
    const initialMilestones = [
        {
            age: "6 weeks to 3 months",
            milestones: [
                "When laid down on their stomach, they try to raise their head",
                "Continuously stare at moving objects",
                "At a sudden sound, either stop the activity or increase the activity",
                "Make sounds like ah--- ohh--- iee in response to stimuli",
                "Recognize their mother and smile"
            ],
        },
        {
            age: "3 months to 6 months",
            milestones: [
                "When laid on their stomach, they try to raise their head and chest",
                "Intertwine their fingers and try to play with them",
                "Try to reach and hold items with their whole hand",
                "Turn their head when they hear a sound",
                "Emit one-word sounds like ga-- da-- ta-- ba",
                "Smile loudly"
            ],
        },
        {
            age: "6 months to 9 months",
            milestones: [
                "When laying on their back, they lift their head",
                "Can turn from laying on their back to their stomach and vice versa",
                "Can move objects from one hand to the other",
                "Repeat some sounds like da-da-ba-ba-ta-ta"
            ],
        },
        {
            age: "9 months to 12 months",
            milestones: [
                "Can sit without help",
                "Can stand by themselves, holding onto something",
                "Can grab things with the thumb and index finger",
                "Will imitate sounds",
                "Can pronounce single meaningful words",
                "Can understand simple instructions: clap, wave"
            ],
        },
    ];

/**
 * Function to convert the milestones into a structured format to match mongoDB schema
 * Each milestone object is expanded to include month, monthProved and officer
 * @returns 
 */
    const createInitialData = () => {
        return initialMilestones.map(group => ({
            age: group.age,
            milestones: group.milestones.map(milestone => ({
                milestone,
                month: "",
                monthProved: "",
                officer: ""
            }))
        }));
    };

    //State to manage form data with registration number and milestones
    const [formData, setFormData] = useState({
        regNo: "",
        developmentMilestones: createInitialData() //populate milestones with default values
    });

    // Load saved data on component mount (initial page load)
    useEffect(() => {
        // Check if there's a registration number in localStorage
        const savedRegNo = localStorage.getItem('babyRegNo');
        
        if (savedRegNo) {
            // Set the regNo from localStorage and update it
            setFormData(prev => ({
                ...prev,
                regNo: savedRegNo
            }));
            
            // Fetch the data using the saved registration number
            fetchDataByRegistrationNumber(savedRegNo);
        }
    }, []);  // Empty dependency array means this runs once on component mount
    /**
     * Handles changes in the milestone input fields.
     * Updates the corresponding milestone field dynamically.
     */
    const handleChange = (ageIndex, milestoneIndex, field, value) => {
        setFormData(prev => {
            const updatedMilestones = [...prev.developmentMilestones]; //copy the milestones array to update
            updatedMilestones[ageIndex].milestones[milestoneIndex][field] = value;
            return { //updates from previous state
                ...prev, 
                developmentMilestones: updatedMilestones 
            };
        });
    };

    // Handler for regNo change
    const handleRegNoChange = (value) => {
        setFormData(prev => ({
            ...prev,
            regNo: value
        }));
    };

    // Function to fetch existing data
    const fetchDataByRegistrationNumber = async (regNoParam) => {
        const regNo = regNoParam || formData.regNo; //if regNo is provided use it otherwise, fallback to formdata to get input
        
        if (!regNo) {
            alert('Please enter a registration number.');
            return;
        }
        
        try {
            const response = await fetch(
                `http://localhost:3000/api/baby/${regNo}`, //API endpoint with dynamic reg no
                {
                    headers: {
                        'x-user-role': 'physician',
                    }
                }
            );
            
            if (!response.ok) {
                throw new Error('No data found for this registration number.');
            }
            
            const data = await response.json(); //get data in Json format
            console.log('Fetched data:', data);
            
            // Save registration number to localStorage
            localStorage.setItem('babyRegNo', regNo);
            
            // Check if developmentMilestones data exists
            const milestoneData = data.developmentMilestones && data.developmentMilestones.length > 0 
                ? data.developmentMilestones 
                : createInitialData();
            
            setFormData({ //updates the form with data 
                regNo: data.regNo || regNo,
                developmentMilestones: milestoneData
            });
            
            // Don't show alert when loading automatically on page refresh
            if (regNoParam === undefined) {
                alert('Data loaded successfully!');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            if (regNoParam === undefined) {
                alert('No data found for this registration number.');
            }
        }
    };

    // Function to submit data
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try { //send a post request to the backend API to save milestone data
            const response = await fetch('http://localhost:3000/api/baby', {
                method: 'POST', //HTTP POST method to submit new data
                headers: {
                    'Content-Type': 'application/json', //initialize the data type for the server
                    'x-user-role': 'physician',
                },
                body: JSON.stringify(formData),//Convert formData object into a JSON string for transmission
            });
            
            if (!response.ok) {
                const errorData = await response.json();//Parse response error message if available
                throw new Error(errorData.message || 'Failed to submit form');
            }
            
            // Save registration number to localStorage after successful submission
            localStorage.setItem('babyRegNo', formData.regNo);
            
            const result = await response.json();
            console.log('Form submitted successfully:', result);
            alert('Development milestones submitted successfully!');
        } catch (error) {
            console.error('Error submitting form:', error);
            alert(`Failed to submit form: ${error.message}`);
        }
    };

    return (
        <>
        <Header/>
        <form onSubmit={handleSubmit}>
            <div className="w-full max-w-6xl mx-auto p-4 bg-gradient-to-br from-white to-blue-50 shadow-lg rounded-lg">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6 text-center">Development Milestones Tracker</h1>
                
                {/* Registration Number Section */}
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
                            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-200"
                        >
                            Get Info
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto bg-white rounded-lg shadow-md">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gradient-to-r from-blue-100 to-blue-200">
                                <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-blue-700">Age</th>
                                <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-blue-700">Milestones</th>
                                <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-blue-700">Month</th>
                                <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-blue-700">Month Proved</th>
                                <th className="p-2 md:p-4 text-left text-xs md:text-sm font-semibold text-blue-700">Officer's Designation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/*Iterate through each age group in the development milestones data*/}
                            {formData.developmentMilestones.map((ageGroup, ageIndex) => (
                                ageGroup.milestones.map((milestone, milestoneIndex) => (
                                    <tr key={`${ageIndex}-${milestoneIndex}`} className="border-b border-blue-100 hover:bg-blue-50">
{/* Display the age group only once per milestone set using rowSpan */}
                                        {milestoneIndex === 0 && (
                                            <td rowSpan={ageGroup.milestones.length} className="p-2 md:p-4 text-xs md:text-sm font-medium text-blue-700 bg-blue-50">
                                                {ageGroup.age}
                                            </td>
                                        )}
{/* Column displaying the specific milestone*/}
                                        <td className="p-2 md:p-4 text-xs md:text-sm text-blue-700">{milestone.milestone}</td>
                                        <td className="p-2 md:p-4">
{/* Column for inputting the month the milestone was achieved */}
                                            <input 
                                                type="month"  
                                                value={milestone.month || ''}
                                                onChange={(e) => handleChange(ageIndex, milestoneIndex, "month", e.target.value)}
                                                className="w-full p-1 md:p-2 text-xs md:text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                            />
                                        </td>
                                        <td className="p-2 md:p-4">
{/* Column for inputting the month the milestone was officially proved */}
                                            <input 
                                                type="month"
                                                value={milestone.monthProved || ''}
                                                onChange={(e) => handleChange(ageIndex, milestoneIndex, "monthProved", e.target.value)}
                                                className="w-full p-1 md:p-2 text-xs md:text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                            />
                                        </td>
{/* Column for inputting the officer's designation who validated the milestone */}
                                        <td className="p-2 md:p-4">
                                            <input 
                                                type="text"
                                                value={milestone.officer || ''}
                                                onChange={(e) => handleChange(ageIndex, milestoneIndex, "officer", e.target.value)}
                                                className="w-full p-1 md:p-2 text-xs md:text-sm border border-blue-200 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-blue-50"
                                                placeholder="Enter designation"
                                            />
                                        </td>
                                    </tr>
                                ))
                            ))}
                        </tbody>
                    </table>
                </div>
                
                <div className='flex justify-center mt-6'>
                    <button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 font-semibold text-lg"
                    >
                        Submit Development Milestones
                    </button>
                </div>
            </div>
        </form>
        <br></br>
        <Footer/></>
    );
};

export default DevelopmentMilestones;
import { useState } from "react";

const DevelopmentMilestones = () => {
    const [formData, setFormData] = useState({
        table: Array(3).fill().map(() => ({
            "6 weeks to 3 months": [
                "When laid down on their stomach,they try to raise their heads",
                "Continuously stare at moving object",
                "At a sudden sound ,either stop the activity or increase the activity",
                "Makes sounds like ah--- ohh---iee in response to stimuli",
                "Recognize their mother and smiles"
            ],
            "3 months to 6 months": [
                "When laid on their stomach, they tries to raise their head and chest",
                "Intertwine their fingers and try to play with them",
                "Try to reach and hold items with their whole hand",
                "Turn their head when they hear a sound",
                "Emits one word sounds like ga--da--ta--ba",
                "Smiles loudly"
            ],
            "6 months to 9 months":[
                "when laying on their back, they lifts their head",
                "Can turn from laying on their back to their stomach and vise versa",
                "Can move objects from one hand to the other",
                "Repeat some sounds like da-da-ba-ba-ta-ta",
            ],
            "9 months to 12 months":[
                "Can sit without help",
                "Can stand by themselves, holding on to something ",
                "Can grab things with the help of the thumb and index finger",
                "Will imitate sounds",
                "Can pronounce single meaningful words",
                "Can understand simple instructions : clap, wave",
            ],
            "12 months to 18 months":[
                "Can walk with help",
                "Able to speak at least 2-3 words (give, that)",
                "Will show familiar objects when asked about them",
                "Can roll a small ball",
                "Can identify at least one body part"
            ],
            "18 months to 2 years":[
                "Can walk without help",
                "Can go up stairs without help",
                "Can make a tower with 2-4 blocks",
                "Can eat by themselves",
                "Can speak like 10 words and can at least make sentences with two words (come dad)",
                "will shape lips to kiss"
            ],
            "2 to 3 years":[
                "Can run without falling",
                "Can go up and down stairs without help",
                "Can copy a circle/curved shape",
                "Can for 3 or more worded sentences"
            ],
            "3 to 4 years" :[
                "Can stand on one leg",
                "Can jump from a stair",
                "Can put on shoes and wear clothes except buttoning",
                "Can count to 3",
                "At least can say phrases like up-down, near-far",
                "Can form full and complex sentences"
            ],
            "4 to 5 years":[
                "Can jump with one leg",
                "Can dress themselves",
                "Can eat by themself",
                "Can draw simple human images",
                "Cooperates with older children when playing",
                "Can describe pictures using the past,present and future tenses of verbs",
                "Can say their full name and age",
            ]
        }))
    });

    const handleTableChange = (index, key,field, value) => {
        setFormData(prev => ({
            ...prev,
            table: prev.table.map((table, i) =>
                i === index ? { ...table, 
                    [key]:{
                        ...(table[key] || {}),
                        [field]:value
                    }
                }
                : table
            )
        }));
    };

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Age</th>
                        <th>Milestones</th>
                        <th>Month</th>
                        <th>Month proved</th>
                        <th>Proved officers designation</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.table.map((row, index) => (
                        Object.keys(row).map((key) => (
                            <tr key={ `${index}-${key}`}>
                                <td>{key}</td>
                                <td>
                                    <ul>
                                        {Array.isArray(row[key])
                                        ? row[key].map((item,i) => <li key={i}>{item}</li>) :null
                                        }
                            
                                    </ul>
                                </td>
                                <td>
                                    <input 
                                        type="text"  
                                        onChange={(e) => handleTableChange(index, "notes", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="month" 
                                        onChange={(e) => handleTableChange(index, "month", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text"  
                                        onChange={(e) => handleTableChange(index, "notes", e.target.value)}
                                    />
                                </td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default DevelopmentMilestones;

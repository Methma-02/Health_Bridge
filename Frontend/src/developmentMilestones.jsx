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

            ]
        }))
    });

    const handleTableChange = (index, field, value) => {
        setFormData(prev => ({
            ...prev,
            table: prev.table.map((table, i) =>
                i === index ? { ...table, [field]: value } : table
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
                            <tr key={index + key}>
                                <td>{key}</td>
                                <td>
                                    <ul>
                                        {row[key].map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
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

import { useState } from "react";

const DevelopmentMilestones = () => {
    const [formData, setFormData] = useState({
        table: [
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
        ].map((group) => ({
            ...group,
            inputs: group.milestones.map(() => ({ month: "", monthProved: "", officer: "" }))
        }))
    });

    const handleChange = (ageIndex, milestoneIndex, field, value) => {
        setFormData((prev) => {
            const updatedTable = [...prev.table];
            updatedTable[ageIndex].inputs[milestoneIndex][field] = value;
            return { ...prev, table: updatedTable };
        });
    };

    return (
        <div>
            <table border="1">
                <thead>
                    <tr>
                        <th>Age</th>
                        <th>Milestones</th>
                        <th>Month</th>
                        <th>Month Proved</th>
                        <th>Proved Officer's Designation</th>
                    </tr>
                </thead>
                <tbody>
                    {formData.table.map((ageGroup, ageIndex) => (
                        ageGroup.milestones.map((milestone, milestoneIndex) => (
                            <tr key={`${ageIndex}-${milestoneIndex}`}>
                                {milestoneIndex === 0 && (
                                    <td rowSpan={ageGroup.milestones.length}>{ageGroup.age}</td>
                                )}
                                <td>{milestone}</td>
                                <td>
                                    <input 
                                        type="month"  
                                        value={ageGroup.inputs[milestoneIndex].month}
                                        onChange={(e) => handleChange(ageIndex, milestoneIndex, "month", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="month"
                                        value={ageGroup.inputs[milestoneIndex].monthProved}
                                        onChange={(e) => handleChange(ageIndex, milestoneIndex, "monthProved", e.target.value)}
                                    />
                                </td>
                                <td>
                                    <input 
                                        type="text"
                                        value={ageGroup.inputs[milestoneIndex].officer}
                                        onChange={(e) => handleChange(ageIndex, milestoneIndex, "officer", e.target.value)}
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

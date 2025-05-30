function TableView({skillsData}) {
    return (
        <table className="profileSkillTable">
            <thead>
            <tr>
                <th>Name of the skill</th>
                <th>Approx. spent hour</th>
                <th>Overall rank</th>
                <th>Certification</th>
            </tr>
            </thead>
            <tbody>
            {skillsData.length > 0 ? skillsData.map((skillItem, index) => (
                <tr key={index}>
                    <td>{skillItem.skill}</td>
                    <td>{skillItem.hours}</td>
                    <td>{skillItem.rank}</td>
                    <td>{skillItem.certification === 1 ? 'Yes' : (skillItem.certification === 0 ? 'No' : String(skillItem.certification))}</td>
                </tr>
            )) :  <tr><td id="noSkills" colSpan="4">No skills added yet</td></tr>}
            </tbody>
        </table>)
}

export default TableView;
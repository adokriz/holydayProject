import './ProfilePage.css'
import {useParams} from 'react-router-dom';
import {useAuth} from "./AuthProvider.jsx";
import {useEffect, useState} from "react";
import {generalUserQuery} from "../profilePageFunc.js";
import NotFound from "./error/NotFound.jsx";

function ProfilePage() {
    const {username} = useParams();
    const {isAuthenticated, user} = useAuth();

    const [profileExist, setProfileExist] = useState(false);
    const [loading, setLoading] = useState(true);
    const [userObject, setUserObject] = useState(null);
    const [isImageHovered, setImageHovered] = useState(false);
    const [skillsData, setSkillsData] = useState([]);

    useEffect(() => {
        const testExistenceOfUser = async () => {
            setLoading(true);

            try {
                const response = await generalUserQuery(user, `http://localhost/holyday/sqlQuerier.php`, false);

                if (response.status === 200) {
                    setProfileExist(true);

                    const userData = await generalUserQuery(user, `http://localhost/holyday/sqlQuerier.php`, true);
                    setUserObject(userData.data);

                    const userSkillData = await generalUserQuery(user, `http://localhost/holyday/getSkills.php`, false);
                    if (userSkillData) {
                        setSkillsData(userSkillData.data);
                    }

                } else {
                    setProfileExist(false);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }
        if (user === username && isAuthenticated) {
            testExistenceOfUser();
        } else {
            setLoading(false);
        }
    }, [username]);

    if (!isAuthenticated) {
        return <div>You must be logged in to view this page.</div>;
    }

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (!profileExist) {
        return <NotFound/>
    }

    return (
        <div className="profileMainContainer">
            <h1 className="profile-page">This is {username} profile</h1>
            <div className="profilContainer">
                <img className='profilPhoto' src={userObject.img} alt="profile-photo"
                     onMouseOver={() => setImageHovered(true)}
                     onMouseOut={() => setImageHovered(false)}/>
                <button className={isImageHovered === true ? 'hovered' : ''}> +</button>
            </div>
            <div className="skillTableContainer">
                <h2>My Skills</h2>
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
                </table>
            </div>
        </div>
    )
}

export default ProfilePage;
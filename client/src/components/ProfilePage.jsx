import './ProfilePage.css'
import {useParams} from 'react-router-dom';
import {useAuth} from "./AuthProvider.jsx";
import {existUser, loadUserData} from "../utils.js";
import {useEffect, useState} from "react";
import {getUserSkillsData} from "../profilePageFunc.js";

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
                const response = await existUser(username);

                if (response) {
                    setProfileExist(true);

                    const userData = await loadUserData(username);
                    setUserObject(userData);

                    const userSkillData = await getUserSkillsData(username);
                    setSkillsData(userSkillData);
                } else {
                    setProfileExist(false);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        testExistenceOfUser();
    }, [username]);

    if (!isAuthenticated) {
        return <div>You must be logged in to view this page.</div>;
    }

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (!profileExist) {
        return <div>404 Not found</div>;
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
                    {skillsData.map((skillItem, index) => (
                        <tr key={index}>
                            <td>{skillItem.skill}</td>
                            <td>{skillItem.hours}</td>
                            <td>{skillItem.rank}</td>
                            <td>{skillItem.certification === 1 ? 'Yes' : (skillItem.certification === 0 ? 'No' : String(skillItem.certification))}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ProfilePage;
import './ProfilePage.css'
import {useParams} from 'react-router-dom'
import {useAuth} from "./AuthProvider.jsx"
import {useEffect, useState} from "react"
import {generalUserQuery} from "../profilePageFunc.js"
import NotFound from "./error/NotFound.jsx"
import DefaultLogo from "./DefaultLogo.jsx"
import ToggleStrokeWidth from "./elementaryComponents/Toggler.jsx"
import TableView from "./profile/TableView.jsx"
import GridViewDnD from "./profile/GridViewDnD.jsx"

function ProfilePage() {
    const {username} = useParams()
    const {isAuthenticated, user} = useAuth()

    const [profileExist, setProfileExist] = useState(false)
    const [loading, setLoading] = useState(true)
    const [userObject, setUserObject] = useState(null)
    const [isImageHovered, setImageHovered] = useState(false)
    const [skillsData, setSkillsData] = useState([])
    const [isToggledOutside, setToggledOutside] = useState(false)

    const handleToggleChange = (newState) => {
        setToggledOutside(newState)
    }

    useEffect(() => {
        const testExistenceOfUser = async () => {
            setLoading(true)

            try {
                const response = await generalUserQuery(user, `http://localhost/holyday/sqlQuerier.php`, false)

                if (response.status === 200) {
                    setProfileExist(true)

                    const userData = await generalUserQuery(user, `http://localhost/holyday/sqlQuerier.php`, true)
                    setUserObject(userData.data)

                    const userSkillData = await generalUserQuery(user, `http://localhost/holyday/getSkills.php`, false)
                    if (userSkillData) {
                        setSkillsData(userSkillData.data)
                    }

                } else {
                    setProfileExist(false)
                }
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        if (user === username && isAuthenticated) {
            testExistenceOfUser()
        } else {
            setLoading(false)
        }
    }, [username])

    if (!isAuthenticated) {
        return <div>You must be logged in to view this page.</div>
    }

    if (loading) {
        return <div>Loading profile...</div>
    }

    if (!profileExist) {
        return <NotFound/>
    }

    const onMouseOver = () => setImageHovered(true)
    const onMouseOut = () => setImageHovered(false)

    return (
        <div className="profileMainContainer">
            <h1 className="profile-page">This is {username} profile</h1>
            <div className="profilContainer">
                {userObject.img ? <img className='profilPhoto' src={userObject.img} alt="profile-photo"
                     onMouseOver={onMouseOver}
                     onMouseOut={onMouseOut}/> :
                <DefaultLogo username={user} onMouseOver={onMouseOver}
                             onMouseOut={onMouseOut}/>}
                <button id="profilePlusButton" className={isImageHovered === true ? 'hovered' : ''}> +</button>
            </div>
            <div className="skillTableContainer">
                <div className="headerWithToggleContainer">
                <h2>My Skills</h2>
                    <ToggleStrokeWidth onToggleChange={handleToggleChange} offToggleTittle="Table" onToggleTittle="Canvas"/>
                </div>
                {!isToggledOutside ? <TableView skillsData={skillsData}/> :
                    <GridViewDnD/>}
            </div>
        </div>
    )
}

export default ProfilePage
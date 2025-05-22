import { useParams } from 'react-router-dom';
import {useAuth} from "./AuthProvider.jsx";
import {existUser} from "../utils.js";
import {useEffect, useState} from "react";

function ProfilePage() {
    const { username } = useParams();
    const { isAuthenticated, user } = useAuth();

    const [profileExist, setProfileExist] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const testExistenceOfUser = async () => {
            setLoading(true);

            try  {
                const response = await existUser(username);

                if (response) {
                    setProfileExist(true);
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

    if (!isAuthenticated){
        return <div>You must be logged in to view this page.</div>;
    }

    if (loading) {
        return <div>Loading profile...</div>;
    }

    if (!profileExist) {
        return <div>404 Not found</div>;
    }

    return (
        <h1 className="profile-page">This is {username} profile</h1>
    )
}

export default ProfilePage;
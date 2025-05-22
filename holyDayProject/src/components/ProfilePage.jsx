import { useParams } from 'react-router-dom';
import {useAuth} from "./AuthProvider.jsx";

function ProfilePage() {
    const { username } = useParams();
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated){
        return <div>You must be logged in to view this page.</div>;
    }

    return (
        <h1 className="profile-page">This is {username} profile</h1>
    )
}

export default ProfilePage;
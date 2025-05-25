import axios from "axios";

// TODO troska refactor
export const getUserSkillsData = async (username) => {
    const queryData = {
        username: username,
    }
    try {
        const response = await axios.post('http://localhost/holyday/getSkills.php',queryData,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        });

        return response.data;
    }
    catch (error) {
        console.log(error);
    }
}
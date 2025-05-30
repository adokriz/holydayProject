import axios from "axios"

export const generalUserQuery = async (user, endpoint, allData) => {
    const queryData = {
        username: user,
        allData: allData,
    }

    try {
        return await axios.post(endpoint, queryData, {
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,
            validateStatus: function (status) {
                return status === 200 || status === 404
            }
        })
    }
    catch (error) {
        console.log(error)
    }
}
import axios from "axios";

export const replacer = (word) => {
    var  str;
    str = word.replace('"', '');
    str = str.replace('"', '');
   return str;
}

export const existUser = async (user) => {
    const queryData = {
        username: user,
        allData: false,
    }

    try {
        const response = await axios.post(`http://localhost/holyday/sqlQuerier.php`, queryData,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })

        return response.status === 200;
    }
    catch (error) {
        console.log(error);
    }
}

export const loadUserData = async (userName) => {
    const queryData = {
        username: userName,
        allData: true
    }

    try {
        const response = await axios.post(`http://localhost/holyday/sqlQuerier.php`, queryData,{
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true
        })

        return response.data;
    }  catch (error) {
        console.log(error);
    }
}

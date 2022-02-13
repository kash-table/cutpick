import api from '..';

export default async () => {
    try {
        console.log(process.env.REACT_APP_BACKEND_API_URL);
        const {data: user} = await api.get(`/users`, {

        }, {
            withCredentials: true,
            headers: {
               
            },
        });
        return user;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};
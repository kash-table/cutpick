import api from '..';

export default async ( id) => {
    try {
        console.log(process.env.REACT_APP_BACKEND_API_URL);
        const {data: designer} = await api.get(`/designers/${id}`, {

        }, {
            withCredentials: true,
            headers: {
               
            },
        });
        return designer;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};
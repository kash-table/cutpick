import api from '..';

export default async (id) => {
    try {
        console.log(process.env.REACT_APP_BACKEND_API_URL);
        const {data: list} = await api.delete(`/designers/${id}`, {

        }, {
            withCredentials: true,
            headers: {
                
            },
        });
        console.log(list);
        return true;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};
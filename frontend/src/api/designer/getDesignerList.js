import api from '..';
import getRatingById from '../review/getRatingById';

export default async () => {
    try {
        
        console.log(process.env.REACT_APP_BACKEND_API_URL);
        const {data: list} = await api.get(`/designers`, {

        }, {
            withCredentials: true,
            headers: {
                
            },
        });
        var a = [];
        for (const designer of list.result) {
            const rating = await getRatingById(designer.id)
            console.log(rating);
            a.push({
                id: designer.id,
                location: designer.location,
                name: designer.name,
                pictureUrl: designer.pictureUrl,
                star: rating.result.total,
                count: rating.result.count,
                cut: rating.result.cut,
                color:rating.result.color,
                purm:rating.result.purm
            });
        }
        
        return a;
    } catch (error) {
        console.log(error, error.response);
        return false;
    }
};
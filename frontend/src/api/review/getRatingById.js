import api from '..';

export default async (designerId) => {
  try {
    const {data: rating} = await api.get(`/rating/${designerId}`, {
        
    }, {
        withCredentials: true,
        headers: {

        },
    });
    return rating;
  } catch (error) {
    console.log(error, error.response);
    return false;
  }
};
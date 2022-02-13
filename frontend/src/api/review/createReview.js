import api from '..';

export default async (userId, designerId, designType, rating) => {
  try {
      console.log(userId, designerId, designType, rating);
      
    const {data: review} = await api.post(`/rating`, {
        userId: userId,
        designerId: designerId,
        designType: designType,
        rating: rating,
    }, {
        withCredentials: true,
        headers: {

        },
    });
    return review;
  } catch (error) {
    console.log(error, error.response);
    return false;
  }
};
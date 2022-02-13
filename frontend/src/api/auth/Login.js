import api from '..';

export default async (userId, userPw) => {
  try {
      console.log(process.env.REACT_APP_BACKEND_API_URL);
    const {data: login} = await api.post(`/auth`, {
        userId,
        userPw,
    }, {
        withCredentials: true,
        headers: {
            
        },
    });
    return login;
  } catch (error) {
    console.log(error, error.response);
    return false;
  }
};
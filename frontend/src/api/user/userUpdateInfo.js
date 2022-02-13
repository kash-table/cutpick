import api from '..';

export default async (userPw, newUserPw) => {
  try {
      console.log(process.env.REACT_APP_BACKEND_API_URL);
    const {data: user} = await api.put(`/users`, {
        userPw,
        newUserPw,
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
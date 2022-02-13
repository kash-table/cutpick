import api from '..';

export default async () => {
  try {
      console.log(process.env.REACT_APP_BACKEND_API_URL);
    const {data: login} = await api.delete(`/users`, {
        
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
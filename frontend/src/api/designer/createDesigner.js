import api from '..';

export default async (name, location, pictureUrl) => {
  try {
      console.log(process.env.REACT_APP_BACKEND_API_URL);
    await api.post(`/designers`, {
        name,
        location,
        pictureUrl
    }, {
        withCredentials: true,
        headers: {

        },
    });
    return true;
  } catch (error) {
    console.log(error, error.response);
    return false;
  }
};
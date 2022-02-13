import api from '..';

export default async (id, name, location, pictureUrl) => {
  try {
      console.log(process.env.REACT_APP_BACKEND_API_URL);
    await api.put(`/designers`, {
        id,
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
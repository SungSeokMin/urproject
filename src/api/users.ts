import axios from 'axios';

export type LoginType = {
  message: string;
  nickname: string;
};

export async function userLogin(email: string, password: string) {
  const response = await axios.post<LoginType>(
    'http://localhost:5000/user/login',
    {
      email,
      password,
    },
    { withCredentials: true }
  );

  return response.data;
}

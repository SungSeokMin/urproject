import axios from 'axios';
import { BASE_URL } from '../util';

const resourceURL = BASE_URL + '/user';

export type LoginType = {
  message: string;
  nickname: string;
};

export async function userLogin(email: string, password: string) {
  const response = await axios.post<LoginType>(
    `${resourceURL}/login`,
    { email, password },
    { withCredentials: true }
  );

  return response.data;
}

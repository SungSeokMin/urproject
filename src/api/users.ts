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

export async function userSignUp(
  email: string,
  nickname: string,
  password: string
) {
  const response = await axios.post(
    `${resourceURL}/signUp`,
    {
      email,
      nickname,
      password,
    },
    { withCredentials: true }
  );

  return response.data;
}

export async function checkEmail(email: string) {
  const response = await axios.get(`${resourceURL}/findEmail/${email}`);
  // email이 중복되면 false를 리턴 받는다.
  return response.data;
}

export async function checkNickname(nickname: string) {
  const response = await axios.get(`${resourceURL}/findNickname/${nickname}`);
  // nickname이 중복되면 false를 리턴 받는다.
  return response.data;
}

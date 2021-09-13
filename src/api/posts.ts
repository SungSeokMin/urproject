import axios from 'axios';
import { BASE_URL } from '../util';

const resourceURL = BASE_URL + '/board';

export type PostType = {
  id: number;
  nickname: string;
  thumbnail: string;
  title: string;
  like: number;
};

export async function getUserPosts() {
  const response = await axios.get<PostType[]>(resourceURL);

  return response.data;
}

export async function getUserPost(id: number) {
  const response = await axios.get<PostType>(`${resourceURL}/${id}`);

  return response.data;
}

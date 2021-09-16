import axios from 'axios';
import { BASE_URL } from '../util';

const resourceURL = BASE_URL + '/board';

export type CreatePostType = {
  nickname: string;
  title: string;
  content: string;
  thumbnail: string;
};

export type PostType = CreatePostType & {
  id: number;
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

export async function createPost(post: CreatePostType) {
  await axios.post(resourceURL, post);
}

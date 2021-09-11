import axios from 'axios';

export type PostType = {
  id: number;
  nickname: string;
  thumbnail: string;
  title: string;
  like: number;
};

export async function getUserPosts() {
  const response = await axios.get<PostType[]>('http://localhost:5000/board');

  return response.data;
}

export async function getUserPost(id: number) {
  const response = await axios.get<PostType>(
    `http://localhost:5000/board/${id}`
  );

  return response.data;
}

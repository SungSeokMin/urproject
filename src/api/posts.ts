import axios from 'axios';

export type Post = {
  id: number;
  nickname: string;
  thumbnail: string;
  title: string;
  like: number;
};

export async function getUserPosts() {
  const response = await axios.get<Post[]>('http://localhost:5000/board');

  return response.data;
}

export async function getUserPost(id: number) {
  const response = await axios.get<Post>(`http://localhost:5000/board/${id}`);

  return response.data;
}

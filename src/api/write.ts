import axios from 'axios';
import { BASE_URL } from '../util';

export async function saveS3Image(formData: any) {
  const response = await axios.post(BASE_URL + '/write', formData, {
    withCredentials: true,
  });

  return response.data;
}

export async function saveS3Thumbnail(formData: any) {
  const response = await axios.post(BASE_URL + '/thumbnail', formData, {
    withCredentials: true,
  });

  return response.data;
}

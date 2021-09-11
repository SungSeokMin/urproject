import React from 'react';
import { PostType } from '../../api/posts';

type PostProps = {
  post: PostType;
};

function Post({ post }: PostProps) {
  const { id, nickname, thumbnail, title, like } = post;

  return (
    <div>
      <h1>{id}</h1>
      <h1>{nickname}</h1>
      <h1>{thumbnail}</h1>
      <h1>{title}</h1>
      <h1>{like}</h1>
    </div>
  );
}

export default Post;

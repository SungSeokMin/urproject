import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import PostContainer from '../containers/PostContainer';

type matchParams = { id: string };

function PostPage({ match }: RouteComponentProps<matchParams>) {
  const { id } = match.params;
  const postId = parseInt(id, 10);

  return <PostContainer postId={postId} />;
}

export default PostPage;

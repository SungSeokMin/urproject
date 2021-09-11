import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getPostAsync } from '../modules/thunks';
import Post from '../components/post/Post';

type PostContainerProps = {
  postId: number;
};

function PostContainer({ postId }: PostContainerProps) {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.post.post
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostAsync(postId));
  }, [postId, dispatch]);

  if (loading) return <div>로딩중 ...</div>;
  if (error) return <div>에러 발생 ...</div>;
  if (!data) return null;

  return <Post post={data} />;
}

export default PostContainer;

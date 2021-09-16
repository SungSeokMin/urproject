import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostList from '../components/post/PostList';
import { RootState } from '../modules';
import { getPostsAsync } from '../modules/thunk/postThunks';

function PostListContainer() {
  const posts = useSelector((state: RootState) => state.post.posts);
  const { isLogin } = useSelector((state: RootState) => state.user);
  const { data, loading, error } = posts;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAsync());
  }, [dispatch]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>오류 발생...</p>;
  if (!data) return null;

  return <PostList posts={data} isLogin={isLogin} />;
}

export default PostListContainer;

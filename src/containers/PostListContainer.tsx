import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import PostList from '../components/post/PostList';
import { RootState } from '../modules';
import { removePost } from '../modules/post';
import { getPostsAsync } from '../modules/thunk/postThunks';
import NotFound from '../pages/NotFound';

function PostListContainer(props: RouteComponentProps) {
  const posts = useSelector((state: RootState) => state.post.posts);
  const { isLogin } = useSelector((state: RootState) => state.user);
  const { data, loading, error } = posts;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsAsync());
    dispatch(removePost());
  }, [dispatch]);

  if (loading) return <p>로딩 중...</p>;
  if (!data || error) return <NotFound {...props} />;

  return <PostList posts={data} isLogin={isLogin} />;
}

export default withRouter(PostListContainer);

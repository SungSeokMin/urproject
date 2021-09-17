import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import PostList from '../components/post/PostList';
import { RootState } from '../modules';
import { clearPost } from '../modules/posts';
import { getPostsAsync } from '../modules/thunk/postThunks';
import LoadingPage from '../pages/LoadingPage';
import NotFound from '../pages/NotFound';

function PostListContainer(props: RouteComponentProps) {
  const posts = useSelector((state: RootState) => state.posts.posts);
  const { isLogin } = useSelector((state: RootState) => state.user);
  const { data, loading, error } = posts;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearPost());
    dispatch(getPostsAsync());
  }, [dispatch]);

  if (!data || error) return <NotFound {...props} />;

  if (loading) return <LoadingPage />;

  return <PostList posts={data} isLogin={isLogin} />;
}

export default withRouter(PostListContainer);

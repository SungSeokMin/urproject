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

  if (!data && loading) return <LoadingPage />;

  if (error) return <NotFound {...props} />;

  if (!data) return <div>작성된 게시글이 없습니다.</div>;

  return <PostList posts={data} isLogin={isLogin} />;
}

export default withRouter(PostListContainer);

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getPostAsync } from '../modules/thunk/postThunks';
import Post from '../components/post/Post';
import NotFound from '../pages/NotFound';
import { RouteComponentProps, withRouter } from 'react-router';
import LoadingPage from '../pages/LoadingPage';

type PostContainerProps = RouteComponentProps & {
  postId: number;
};

function PostContainer(props: PostContainerProps) {
  const { postId } = props;

  const { data, loading, error } = useSelector(
    (state: RootState) => state.post.post
  );
  const loginUserInfo = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostAsync(postId));
  }, [postId, dispatch]);

  if (!data || error) return <NotFound {...props} />;

  if (loading) return <LoadingPage />;

  return <Post post={data} loginUserInfo={loginUserInfo} />;
}

export default withRouter(PostContainer);

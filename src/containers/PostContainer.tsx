import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getPostAsync } from '../modules/thunk/postThunks';
import Post from '../components/post/Post';
import NotFound from '../pages/NotFound';
import { RouteComponentProps, withRouter } from 'react-router';
import LoadingPage from '../pages/LoadingPage';
import { removePost } from '../api/posts';

type PostContainerProps = RouteComponentProps & {
  postId: number;
};

function PostContainer(props: PostContainerProps) {
  const { postId } = props;

  const { data, loading, error } = useSelector(
    (state: RootState) => state.posts.post
  );
  const loginUserInfo = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostAsync(postId));
  }, [postId, dispatch]);

  if (loading) return <LoadingPage />;

  if (!data || error) return <NotFound {...props} />;

  const requestRemovePost = async (id: number) => {
    await removePost(id);
  };

  return (
    <Post
      post={data}
      loginUserInfo={loginUserInfo}
      requestRemovePost={requestRemovePost}
      {...props}
    />
  );
}

export default withRouter(PostContainer);

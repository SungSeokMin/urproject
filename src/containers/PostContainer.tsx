import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../modules';
import { getPostAsync } from '../modules/thunk/postThunks';
import Post from '../components/post/Post';
import NotFound from '../pages/NotFound';
import { RouteComponentProps, withRouter } from 'react-router';

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

  if (loading) return <div>로딩중 ...</div>;
  if (!data || error) return <NotFound {...props} />;

  return <Post post={data} loginUserInfo={loginUserInfo} />;
}

export default withRouter(PostContainer);

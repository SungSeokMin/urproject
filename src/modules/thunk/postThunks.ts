import * as postActions from '../post';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { getUserPosts, getUserPost } from '../../api/posts';

// redux-thunk 함수

export const getPostsAsync =
  (): ThunkAction<void, RootState, null, postActions.BoardAction> =>
  async (dispatch) => {
    dispatch(postActions.getPosts());

    try {
      // axios 요청
      const posts = await getUserPosts();

      dispatch(postActions.getPostsSuccess(posts));
    } catch (error) {
      dispatch(postActions.getPostsError(error));
    }
  };

export const getPostAsync =
  (id: number): ThunkAction<void, RootState, null, postActions.BoardAction> =>
  async (dispatch) => {
    dispatch(postActions.getPost());

    try {
      // axios 요청
      const post = await getUserPost(id);
      dispatch(postActions.getPostSuccess(post));
    } catch (error) {
      dispatch(postActions.getPostError(error));
    }
  };

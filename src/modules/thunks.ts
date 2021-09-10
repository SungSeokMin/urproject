import { ThunkAction } from 'redux-thunk';
import { RootState } from '.';
import * as actions from './post';
import { getUserPosts, getUserPost } from '../api/posts';

// redux-thunk 함수
export const getPostsAsync =
  (): ThunkAction<void, RootState, null, actions.BoardAction> =>
  async (dispatch) => {
    dispatch(actions.getPosts());

    try {
      // axios 요청
      const posts = await getUserPosts();

      dispatch(actions.getPostsSuccess(posts));
    } catch (error) {
      dispatch(actions.getPostsError(error));
    }
  };

export const getPostAsync =
  (id: number): ThunkAction<void, RootState, null, actions.BoardAction> =>
  async (dispatch) => {
    dispatch(actions.getPost());

    try {
      // axios 요청
      const post = await getUserPost(id);

      dispatch(actions.getPostSuccess(post));
    } catch (error) {
      dispatch(actions.getPostError(error));
    }
  };

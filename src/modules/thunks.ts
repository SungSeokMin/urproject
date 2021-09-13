import { ThunkAction } from 'redux-thunk';
import { RootState } from '.';
import * as userActions from './user';
import * as postActions from './post';
import { getUserPosts, getUserPost } from '../api/posts';
import { userLogin } from '../api/users';

// redux-thunk 함수

export const userLoginAsync =
  (
    email: string,
    password: string
  ): ThunkAction<void, RootState, any, userActions.UserAction> =>
  async (dispatch) => {
    try {
      const { nickname } = await userLogin(email, password);

      dispatch(userActions.loginSuccess(nickname));
    } catch (error) {
      alert('정보를 다시 확인해주세요.');
    }
  };

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

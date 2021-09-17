import * as userActions from '../user';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { userLogin } from '../../api/users';

export const userLoginAsync =
  (
    email: string,
    password: string,
    callback: (message: string) => void
  ): ThunkAction<void, RootState, any, userActions.UserAction> =>
  async (dispatch) => {
    try {
      const { nickname } = await userLogin(email, password);

      dispatch(userActions.loginSuccess(nickname));
    } catch (error) {
      callback('정보를 다시 입력해주세요.');
    }
  };

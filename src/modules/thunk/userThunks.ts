import * as userActions from '../user';
import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { userLogin } from '../../api/users';

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

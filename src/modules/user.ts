const LOGIN_SUCCESS = 'user/LOGIN_SUCCESS' as const;
const LOGOUT = 'user/LOGOUT' as const;

export const loginSuccess = (nickname: string) => ({
  type: LOGIN_SUCCESS,
  payload: nickname,
});

export const logout = () => ({ type: LOGOUT });

type UserState = {
  nickname: string;
  isLogin: boolean;
};

export type UserAction =
  | ReturnType<typeof loginSuccess>
  | ReturnType<typeof logout>;

const initialState: UserState = {
  nickname: '',
  isLogin: false,
};

function user(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, nickname: action.payload, isLogin: true };

    case LOGOUT:
      return { ...state, nickname: '', isLogin: false };

    default:
      return state;
  }
}

export default user;

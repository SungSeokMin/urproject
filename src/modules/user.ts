const LOGIN = 'user/LOGIN' as const;
const LOGOUT = 'user/LOGOUT' as const;

export const login = (nickname: string) => ({ type: LOGIN, payload: nickname });
export const logout = () => ({ type: LOGOUT });

type UserState = {
  nickname: string;
  isLogin: boolean;
};

type UserAction = ReturnType<typeof login> | ReturnType<typeof logout>;

const initialState: UserState = {
  nickname: '',
  isLogin: false,
};

function user(state: UserState = initialState, action: UserAction) {
  switch (action.type) {
    case LOGIN:
      return { ...state, nickname: action.payload, isLogin: true };

    case LOGOUT:
      return { ...state, nickname: '', isLogin: false };

    default:
      return state;
  }
}

export default user;

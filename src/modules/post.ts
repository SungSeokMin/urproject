import { PostType } from '../api/posts';

// 액션 타입
const GET_POSTS = 'post/GET_POSTS' as const;
const GET_POSTS_SUCCESS = 'post/GET_POSTS_SUCCESS' as const;
const GET_POSTS_ERROR = 'post/GET_POSTS_ERROR' as const;

const GET_POST = 'post/GET_POST' as const;
const GET_POST_SUCCESS = 'post/GET_POST_SUCCESS' as const;
const GET_POST_ERROR = 'post/GET_POST_ERROR' as const;
const REMOVE_POST = 'post/REMOVE_POST' as const;

// 액션 생성 함수
export const getPosts = () => ({ type: GET_POSTS });
export const getPostsSuccess = (post: PostType[]) => ({
  type: GET_POSTS_SUCCESS,
  payload: post,
});
export const getPostsError = (error: any) => ({
  type: GET_POSTS_ERROR,
  payload: error,
});

export const getPost = () => ({ type: GET_POST });
export const getPostSuccess = (post: PostType) => ({
  type: GET_POST_SUCCESS,
  payload: post,
});
export const getPostError = (error: any) => ({
  type: GET_POST_ERROR,
  payload: error,
});

export const removePost = () => ({ type: REMOVE_POST });

// 게시글 상태
export type BoardState = {
  posts: {
    loading: boolean;
    data: PostType[] | null;
    error: Error | null;
  };
  post: {
    loading: boolean;
    data: PostType | null;
    error: Error | null;
  };
};

export type BoardAction =
  | ReturnType<typeof getPosts>
  | ReturnType<typeof getPostsSuccess>
  | ReturnType<typeof getPostsError>
  | ReturnType<typeof getPost>
  | ReturnType<typeof getPostSuccess>
  | ReturnType<typeof getPostError>
  | ReturnType<typeof removePost>;

const initialState: BoardState = {
  posts: {
    loading: false,
    data: null,
    error: null,
  },
  post: {
    loading: false,
    data: null,
    error: null,
  },
};

function post(
  state: BoardState = initialState,
  action: BoardAction
): BoardState {
  switch (action.type) {
    case GET_POSTS:
      return {
        ...state,
        posts: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_POSTS_ERROR:
      return {
        ...state,
        posts: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    case GET_POST:
      return {
        ...state,
        post: {
          loading: true,
          data: null,
          error: null,
        },
      };
    case GET_POST_SUCCESS:
      return {
        ...state,
        post: {
          loading: false,
          data: action.payload,
          error: null,
        },
      };
    case GET_POST_ERROR:
      return {
        ...state,
        post: {
          loading: false,
          data: null,
          error: action.payload,
        },
      };
    case REMOVE_POST:
      return {
        ...state,
        post: {
          loading: false,
          data: null,
          error: null,
        },
      };

    default:
      return state;
  }
}

export default post;

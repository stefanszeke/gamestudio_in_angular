import { createReducer, on } from "@ngrx/store";
import { CommentActions } from "./comment.actions";
import { Comment } from "src/app/model/Comment";


export const commentStoreFeatureKey = 'comment';

export interface CommentState {
  comments: Comment[];
  isLoadingComments: boolean;
  isPostingComment: boolean;
  getError: any | null;
  postError: any | null;
}

export const initialState: CommentState = {
  comments: [],
  isLoadingComments: false,
  isPostingComment: false,
  getError: null,
  postError: null
};

export const commentReducer = createReducer(
  initialState,
  on(CommentActions.loadComments, (state) => ({
    ...state,
    comments: [],
    isLoadingComments: true,
    getError: null
  })),
  on(CommentActions.loadCommentsSuccess, (state, action) => ({
    ...state,
    comments: action.comments,
    isLoadingComments: false,
    getError: null
  })),
  on(CommentActions.loadCommentsFailure, (state, action) => ({
    ...state,
    isLoadingComments: false,
    getError: action.error
  })),
  on(CommentActions.postComment, (state) => ({
    ...state,
    isPostingComment: true,
    postError: null
  })),
  on(CommentActions.postCommentSuccess, (state) => ({
    ...state,
    isPostingComment: false,
    postError: null
  })),
  on(CommentActions.postCommentFailure, (state, action) => ({
    ...state,
    isPostingComment: false,
    postError: action.error
  }))
);

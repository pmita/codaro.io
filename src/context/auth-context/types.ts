import { type User} from "firebase/auth";

export type AuthReducerInitialState = {
  user: User | null;
  authStateHasChanged: boolean;
}

export type userProgressType = {
  [key: string]: boolean
}

export enum AuthActionTypes {
  SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
  SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
  SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
  AUTH_HAS_CHANGED_SUCCESS = 'AUTH_HAS_CHANGED_SUCCESS',
}

export type AUTH_HAS_CHANGED_SUCCESS_ACTION = {
  type: AuthActionTypes.AUTH_HAS_CHANGED_SUCCESS;
  payload: User | null;
}

export type SIGN_IN_SUCCESS_ACTION = {
  type: AuthActionTypes.SIGN_IN_SUCCESS;
  payload: User | null;
}

export type SIGN_UP_SUCCESS_ACTION = {
  type: AuthActionTypes.SIGN_UP_SUCCESS;
  payload: User | null;
}

export type SIGN_OUT_SUCCESS_ACTION = {
  type: AuthActionTypes.SIGN_OUT_SUCCESS;
}

export type AuthReducerActionsType = 
  | SIGN_IN_SUCCESS_ACTION
  | SIGN_UP_SUCCESS_ACTION
  | SIGN_OUT_SUCCESS_ACTION
  | AUTH_HAS_CHANGED_SUCCESS_ACTION
  
export type AuthReducerState = {
  user: User | null,
  authStateHasChanged: boolean,
  dispatch: React.Dispatch<any>
}
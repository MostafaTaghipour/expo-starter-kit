import { PostRequestState, GetRequestState } from "../types";

export interface UserState {
  user: GetRequestState<User>;
  updateUser: PostRequestState;
}

export interface UpdateUserRequestBody {
  firstName: string;
  lastName?: string;
  email?: string;
}



export interface User {
  firstName: string;
  lastName?: string;
  email?: string;
  imageUrl?: string;
}

export interface UserBrief {
  id: number;
  name: string;
  image?: string;
}


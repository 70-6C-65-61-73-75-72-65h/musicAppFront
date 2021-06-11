import { FetchError } from "./error";
export type ownerId = string;

// for creating in forms
export interface AudioCreationCreds {
  author: string;
  compositionName: string;
  ownerName: string;
  lyrics: string;
}

// recieving from backend
// for fetching and updating
export interface AudioData extends AudioCreationCreds {
  _id: number; // after creation
  filename: string;
  fileId: string;
  createdAt: Date;
  likes: string[];
  ownerId: ownerId;
}

export interface AudioState {
  audios: AudioData[] | []; // null
}

export enum AudioActionTypes {
  FETCH_AUDIOS = "FETCH_AUDIOS",
  CREATE = "CREATE",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
  LIKE = "LIKE",
  SEARCH = "SEARCH",
}

interface FetchAllAudioAction {
  type: AudioActionTypes.FETCH_AUDIOS;
  payload: AudioData[];
}
interface UpdateAudioCardAction {
  type: AudioActionTypes.UPDATE;
  payload: AudioData;
}
interface CreateAudioCardAction {
  type: AudioActionTypes.CREATE;
  payload: AudioData;
}
interface DeleteAudioCardAction {
  type: AudioActionTypes.DELETE;
  payload: ownerId;
}
interface LikeAudioCardAction {
  type: AudioActionTypes.LIKE;
  payload: AudioData;
}
interface SearchAudioCardAction {
  type: AudioActionTypes.SEARCH;
  payload: AudioData[];
}

export type AudioAction =
  | FetchAllAudioAction
  | UpdateAudioCardAction
  | CreateAudioCardAction
  | DeleteAudioCardAction
  | LikeAudioCardAction
  | SearchAudioCardAction
  | FetchError;

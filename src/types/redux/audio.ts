import { FetchError } from "./error";
export type ownerId = string;

// audioStateMixin

export interface AudioMixin {
  author: string;
  compositionName: string;
  lyrics: string;
}

export interface AudioCreationDefaultState extends AudioMixin {
  audioFile: File;
}

 

// for creating in forms
export interface AudioFormData extends AudioCreationDefaultState {
  ownerName: string;
}

// recieving from backend
// for fetching and updating

type excludedAudioKey = "audioFile";
//  all keys except audioFile (cause we covert it to  filename and fileId)
export interface AudioData extends Omit<AudioFormData, excludedAudioKey> {
  _id: number; // after creation
  filename: string;
  fileId: string;
  createdAt: Date;
  likes: string[];
  ownerId: ownerId;
}

// its because we could have mush more 
export type AudioCreationState = AudioData | AudioCreationDefaultState;
// extends AudioCreationDefaultState {
//   [index: string]: any;
// }


export interface AudioState {
  audios: AudioData[] | null; // null
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

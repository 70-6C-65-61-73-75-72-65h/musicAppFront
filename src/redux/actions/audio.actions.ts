import { setOperationError } from "./mixins";
import { FirstArgToFetchArticlesOperation } from "./../../types/redux/operations";
import * as api from "./../../service/api";
import { AudioAction, AudioActionTypes } from "./../../types/redux/audio";
import { Dispatch } from "react";

export const fetchAllAudioOperation = async (
  { errorMessage }: FirstArgToFetchArticlesOperation,
  dispatch: Dispatch<AudioAction>
) => {
  const { data } = await api.fetchAllAudio();
  if (data) {
    dispatch({ type: AudioActionTypes.FETCH_AUDIOS, payload: data.file });
  } else {
    dispatch(setOperationError(errorMessage));
  }
};

export const createAudioCardOperation = async (
  { errorMessage, audioCardData, router }: FirstArgToFetchArticlesOperation,
  dispatch: Dispatch<AudioAction>
) => {
  const { data } = await api.createAudioCard(audioCardData);
  if (data) {
    dispatch({ type: AudioActionTypes.CREATE, payload: data.file });
    router.push("/");
  } else {
    dispatch(setOperationError(errorMessage));
  }
};

export const updateAudioCardOperation = async (
  { errorMessage, audioCardData, router, id }: FirstArgToFetchArticlesOperation,
  dispatch: Dispatch<AudioAction>
) => {
  const { data } = await api.updateAudio(id, audioCardData);
  if (data) {
    dispatch({ type: AudioActionTypes.UPDATE, payload: data.file });
    router.push("/");
  } else {
    dispatch(setOperationError(errorMessage));
  }
};

export const deleteAudioCardOperation = async (
  { errorMessage, id }: FirstArgToFetchArticlesOperation,
  dispatch: Dispatch<AudioAction>
) => {
  const { data } = await api.deleteAudio(id);
  if (data) {
    dispatch({ type: AudioActionTypes.DELETE, payload: data.file });
  } else {
    dispatch(setOperationError(errorMessage));
  }
};

export const likeAudioOperation = async (
  { errorMessage, id }: FirstArgToFetchArticlesOperation,
  dispatch: Dispatch<AudioAction>
) => {
  const { data } = await api.likeAudio(id);
  if (data) {
    dispatch({ type: AudioActionTypes.LIKE, payload: data.file });
  } else {
    dispatch(setOperationError(errorMessage));
  }
};

export const searchAudioOperation = async (
  { errorMessage, query }: FirstArgToFetchArticlesOperation,
  dispatch: Dispatch<AudioAction>
) => {
  const { data } = await api.searchAudio(query);
  if (data) {
    dispatch({ type: AudioActionTypes.SEARCH, payload: data.file });
  } else {
    dispatch(setOperationError(errorMessage));
  }
};
// update partial type of Audio form backend

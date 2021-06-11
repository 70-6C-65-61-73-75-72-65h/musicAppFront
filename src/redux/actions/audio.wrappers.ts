import { AudioCreationCreds } from "./../../types/redux/audio";
import { SetFetching } from "../../types/redux/fetching";

import { CustomWithFetchingWithError } from "./mixins";
import {
  fetchAllAudioOperation,
  createAudioCardOperation,
  updateAudioCardOperation,
  deleteAudioCardOperation,
  likeAudioOperation,
  searchAudioOperation,
} from "./audio.actions";
import { AudioData, AudioAction, ownerId } from "../../types/redux/audio";
import { History } from "../../types/common";

export function fetchAllAudio(
  setFetching: SetFetching,
  message: string = `Failed fetch all  audios from back`
) {
  return CustomWithFetchingWithError<
    typeof fetchAllAudioOperation,
    AudioAction
  >(fetchAllAudioOperation, {
    setFetching,
    message,
  });
}

export function createAudioCard(
  audioCardData: AudioCreationCreds,
  router: History,
  setFetching: SetFetching,
  message: string = `Create audio card`
) {
  return CustomWithFetchingWithError<
    typeof createAudioCardOperation,
    AudioAction
  >(createAudioCardOperation, {
    setFetching,
    message,
    mainData: {
      router,
      audioCardData,
    },
  });
}

export function updateAudioCard(
  id: ownerId,
  audioCardData: AudioData, // we poopulate firstly by loaded data and then changing existing data
  router: History,
  setFetching: SetFetching,
  message: string = `Update audio card`
) {
  return CustomWithFetchingWithError<
    typeof updateAudioCardOperation,
    AudioAction
  >(updateAudioCardOperation, {
    setFetching,
    message,
    mainData: {
      router,
      audioCardData,
      id,
    },
  });
}

export function deleteAudioCard(
  id: ownerId, // we poopulate firstly by loaded data and then changing existing data
  setFetching: SetFetching,
  message: string = `Delete audio card`
) {
  return CustomWithFetchingWithError<
    typeof deleteAudioCardOperation,
    AudioAction
  >(deleteAudioCardOperation, {
    setFetching,
    message,
    mainData: {
      id,
    },
  });
}

export function likeAudio(
  id: ownerId, // we poopulate firstly by loaded data and then changing existing data

  setFetching: SetFetching,
  message: string = `Like audio card`
) {
  return CustomWithFetchingWithError<typeof likeAudioOperation, AudioAction>(
    likeAudioOperation,
    {
      setFetching,
      message,
      mainData: {
        id,
      },
    }
  );
}
export function searchAudio(
  query: string, // we poopulate firstly by loaded data and then changing existing data

  setFetching: SetFetching,
  message: string = `Search audio card`
) {
  return CustomWithFetchingWithError<typeof searchAudioOperation, AudioAction>(
    searchAudioOperation,
    {
      setFetching,
      message,
      mainData: {
        query,
      },
    }
  );
}

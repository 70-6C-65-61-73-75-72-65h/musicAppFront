import {
  AudioState,
  AudioActionTypes,
  AudioAction,
  AudioData,
} from "../../types/redux/audio";

//  how to typing nullability
const initialState: AudioState = {
  audios: [],
};

const l = initialState;
const p = initialState.audios;

export default function audiosReducer(
  state: AudioState = initialState,
  action: AudioAction
): AudioState {
  switch (action.type) {
    case (AudioActionTypes.FETCH_AUDIOS, AudioActionTypes.SEARCH):
      return { ...state, audios: action.payload };
    case AudioActionTypes.LIKE:
      return {
        ...state,
        audios: (state.audios as AudioData[]).map((audio: AudioData) =>
          audio._id === action.payload._id ? action.payload : audio
        ),
      };
    case AudioActionTypes.CREATE:
      return {
        ...state,
        audios: [...(state.audios as AudioData[]), action.payload],
      };
    case AudioActionTypes.UPDATE:
      return {
        ...state,
        audios: (state.audios as AudioData[]).map((audio: AudioData) =>
          audio._id === action.payload._id
            ? { ...audio, ...action.payload }
            : audio
        ),
      };
    case AudioActionTypes.DELETE:
      return {
        ...state,
        audios: (state.audios as AudioData[]).filter(
          (audio: AudioData) => audio.fileId !== action.payload
        ),
      };
    default:
      return { ...state };
  }
}

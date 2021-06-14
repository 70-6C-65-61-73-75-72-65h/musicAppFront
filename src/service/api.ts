import { AuthSignINCreds, AuthSignUPCreds } from "./../types/redux/auth";
import { AudioData, AudioFormData, ownerId } from "./../types/redux/audio";
import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = `http://${process.env.REACT_APP_PORT}`;
const API = axios.create({
  baseURL: BASE_URL,
});
const API_MEDIA = axios.create({
  baseURL: BASE_URL,
});

const getToken = () => {
  const token = localStorage.getItem("profile");
  return token && `Bearer ${JSON.parse(token).token}`;
};

API_MEDIA.interceptors.request.use(
  (req: AxiosRequestConfig): AxiosRequestConfig => {
    if (localStorage.getItem("profile")) {
      req.headers.Authorization = getToken();
    }
    return req;
  }
);

// user auth interface
export const signIn = (formData: AuthSignINCreds) =>
  API.post("/user/signin", formData);
export const signUp = (formData: AuthSignUPCreds) =>
  API.post("/user/signup", formData);

export const fetchAllAudio = () => API_MEDIA.post("/audio");

export const createAudioCard = (newAudioCard: AudioFormData) =>
  API_MEDIA.post("/audio", newAudioCard);

export const streamAudioFileSrc = (filename: string) =>
  `${BASE_URL}/audio/file${filename}`;

export const deleteAudio = (id: ownerId) =>
  API.delete(`/audio/file/delete/${id}`);
export const updateAudio = (id: ownerId, updateAudioCard: AudioData) =>
  API.patch(`/audio/file/update/${id}`, updateAudioCard);
export const likeAudio = (id: ownerId) => API.patch(`/audio/file/like/${id}`);
export const searchAudio = (query: string) =>
  API.delete(`/audio/search?term=${query}`);

import React, { ReactElement, useState } from "react";
import { useForm, NestedValue, SubmitHandler } from "react-hook-form";
import { updateAudioCard } from "../../redux/actions/audio.wrappers";
import { AudioCreationState } from "../../types/redux/audio";

interface Props {
  onSubmitWrapper: (operation: Function) => SubmitHandler<AudioCreationState>;
}

export default function AddTrack({ onSubmitWrapper }: Props): ReactElement {
  const [fetching, setFetching] = useState(false);

  const updateFile =
    (audioId: any, history: any, dispatch: any) => (audioData: any) => {
      dispatch(
        updateAudioCard(audioId, { ...audioData }, history, setFetching)
      );
    };
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<AudioCreationState>();

  return (
    <form onSubmit={handleSubmit(onSubmitWrapper(updateFile))}>
      <input {...register("compositionName")} />
      <input {...register("author")} />
      <input {...register("lyrics")} />
      <input type="file" {...register("audioFile")} />

      <input type="submit" />
    </form>
  );
}

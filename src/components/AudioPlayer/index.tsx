import React, {
  useState,
  useRef,
  useEffect,
  ReactElement,
  MutableRefObject,
} from "react";

import { streamAudioFileSrc } from "../../service/api";
import { AudioData } from "../../types/redux/audio";
import styles from "../../styles/audioPlayer.module.scss";
import { EuiIcon } from "@elastic/eui";
// import stylesWrapper from "playingTracks.module.scss"

interface Props {
  audioItem: AudioData;
}

// audio controls
export default function AudioPlayer({ audioItem }: Props): ReactElement {
  // state
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  // references
  const audioPlayer = useRef() as MutableRefObject<HTMLAudioElement>; // reference our audio component
  const progressBar = useRef() as MutableRefObject<HTMLInputElement>; // reference our progress bar
  const animationRef = useRef() as MutableRefObject<number>; // reference the animation

  useEffect(() => {
    const seconds = Math.floor(audioPlayer.current.duration);
    setDuration(seconds);
    progressBar.current.max = seconds.toString();
    //  loadedmetadata
  }, [
    audioPlayer?.current?.onloadedmetadata,
    audioPlayer?.current?.readyState,
  ]);

  const calculateTime = (secs: number) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const togglePlayPause = () => {
    const prevValue = isPlaying;
    setIsPlaying(!prevValue);
    if (!prevValue) {
      audioPlayer.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    } else {
      audioPlayer.current.pause();
      cancelAnimationFrame(animationRef.current);
    }
  };

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime.toString();
    changePlayerCurrentTime();
    animationRef.current = requestAnimationFrame(whilePlaying);
  };

  const changeRange = () => {
    audioPlayer.current.currentTime = +progressBar.current.value;
    changePlayerCurrentTime();
  };

  const changePlayerCurrentTime = () => {
    progressBar.current.style.setProperty(
      "--seek-before-width",
      `${(+progressBar.current.value / duration) * 100}%`
    );
    setCurrentTime(+progressBar.current.value);
  };

  const backThirty = () => {
    progressBar.current.value = Number(
      +progressBar.current.value - 30
    ).toString();
    changeRange();
  };

  const forwardThirty = () => {
    progressBar.current.value = Number(
      progressBar.current.value + 30
    ).toString();
    changeRange();
  };

  return (
    <div className={styles.audioPlayer}>
      <audio
        ref={audioPlayer}
        src={streamAudioFileSrc(audioItem.filename)}
        preload="metadata"
      ></audio>
      <button className={styles.forwardBackward} onClick={backThirty}>
        <EuiIcon type="arrowLeft" />
        30
      </button>
      <button onClick={togglePlayPause} className={styles.playPause}>
        {isPlaying ? (
          <EuiIcon type="pause" />
        ) : (
          <EuiIcon type="play" className={styles.play} />
        )}
      </button>
      <button className={styles.forwardBackward} onClick={forwardThirty}>
        30 <EuiIcon type="arrowRight" />
      </button>

      {/* current time */}
      <div className={styles.currentTime}>{calculateTime(currentTime)}</div>

      {/* progress bar */}
      <div>
        <input
          type="range"
          className={styles.progressBar}
          defaultValue="0"
          ref={progressBar}
          onChange={changeRange}
        />
      </div>

      {/* duration */}
      <div className={styles.duration}>
        {duration && !isNaN(duration) && calculateTime(duration)}
      </div>
    </div>
  );
}

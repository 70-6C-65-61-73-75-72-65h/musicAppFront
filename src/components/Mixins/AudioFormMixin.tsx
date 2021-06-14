import { EuiButton , EuiFieldText } from "@elastic/eui";
import React, { ReactElement } from "react";

// import { useForm, NestedValue } from 'react-hook-form';


interface Props {}

export default function AudioFormMixin({
  handleSubmit,
  clear,
  dispatch,
  audioData,
  setAudioData,
  audioId,
  audio,


}: Props): ReactElement {
    //  autoComplete="off"
    // noValidate
  return (
    <form onSubmit={handleSubmit}>
      {/* <Typography variant="h6">
        {audioId ? `Editing "${audio.filename}"` : "Creating a Memory"}
      </Typography> */}
      <EuiFieldText
       placeholder="Composition name"
         value={audioData.compositionName}
        onChange={(e) => setAudioData({ ...audioData, compositionName: e.target.value })}
        aria-label="Composition name input" 
        fullWidth
        // prepend={'//'}
      />
      <TextField
        name="author"
        variant="outlined"
        label="author"
        fullWidth
        multiline
        rows={4}
        value={audioData.author}
        onChange={(e) => setAudioData({ ...audioData, author: e.target.value })}
      />
      <TextField
        name="lyrics"
        variant="outlined"
        label="lyrics"
        fullWidth
        value={audioData.lyrics}
        onChange={(e) => setAudioData({ ...audioData, lyrics: e.target.value })}
      />
      <div>
        <EuiButton  >
          Upload File
          <input
            type="file"
            onChange={(e) => {
              const l = e.target.files?.[0] as File;
              setAudioData({
                ...audioData,
                audioFile: e.target.files?.[0] as File,
              });
            }}
            hidden
          />
        </Button>
      </div>EuiButton
      <EuiButton onClick={handleSubmit}>Submit</EuiButton>
      <EuiButton color="secondary" onClick={clear}>
        Clear
      </EuiButton>
    </form>
  );
}

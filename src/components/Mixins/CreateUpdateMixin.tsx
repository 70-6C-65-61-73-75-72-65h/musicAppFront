import React, { ReactElement, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { AudioCreationState, AudioFormData } from "../../types/redux/audio";

import { useForm, SubmitHandler } from "react-hook-form";
import { useTypedSelector } from "../../hooks/useTypedSelector";
import AddTrack from "../../pages/CreateMusic/AddTrack";

const initialState: AudioCreationState = {
  compositionName: "",
  author: "",
  lyrics: "",
  audioFile: {} as File,
  //   additional data that could be uploaded from card that we gonna update
};


interface Props {}

  const updateFile =
    (audioId: any, history: any, dispatch: any) => (audioData: any) => {
      dispatch(updateAudioCard(audioId, { ...audioData }, history));
    };
  const uploadFile = (audioData: AudioFormData) => {
    // TODO check  it to strings .trim()
    // if (!audioData.compositionName || !audioData.audioFile.name) {
    //   return alert("Caption or file is missing");
    // }

    let formData = new FormData();
    formData.append("compositionName", audioData.compositionName);
    formData.append("author", audioData.author);
    formData.append("ownerName", audioData.ownerName);
    formData.append("lyrics", audioData.lyrics);
    formData.append("file", audioData.audioFile);

    dispatch(createAudioCard(formData, history));
  };


  const l = uploadFile({...audioData, ownerName: user.result.name}) 

export default function CreateUpdateMixin({}: Props): ReactElement {
     const [audioData, setAudioData] = useState(initialState);

     const audioId = localStorage?.getItem("selectedAudioId");

     const audio = useTypedSelector((state) =>
       audioId ?  Array.prototype.find.call(state.audios, (a) => a._id === audioId) : null
     );
     const dispatch = useDispatch();
     const history = useHistory();

 const user = JSON.parse((localStorage.getItem("profile") as string));

 
  useEffect(() => {
    if (audio) setAudioData(audio);
  }, [audio]);

  const clear = () => {
    setAudioData({
      compositionName: "",
      author: "",
      lyrics: "",
      audioFile: {} as File,
    });
  };

  // const handleSubmit = (operation:Function) => async (e) => {
  //   e.preventDefault(); 
  //   operation(); 
  //   clear();
  //   localStorage.removeItem("selectedAudioId");
  // };
  

  
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm<AudioCreationState>();

  // const handleSubmitWrapper = (operation: Function) => handleSubmit
  // const onSubmit =  
  //   (operation: Function) => async (e) => {
  //     e.preventDefault();
  //     operation();
  //     clear();
  //     localStorage.removeItem("selectedAudioId");
  //   };

    // const { register, handleSubmit } = useForm<FormValues>();
    const onSubmitWrapper =
      (operation: Function): SubmitHandler<AudioCreationState> =>
      (data) => {
        // e.preventDefault();
            operation(data);
            clear();
            localStorage.removeItem("selectedAudioId");
      };

    return (
      <AddTrack
        onSubmitWrapper={onSubmitWrapper}
        register={register}
        listOfFields = {["compositionName",
"author",
"lyrics",
"audioFile"]}  /> 
 
    );

  // useEffect(() => {
  //   register("autocomplete", {
  //     validate: (value) => value.length || "This is required.",
  //   });
  //   register("select", {
  //     validate: (value) => value.length || "This is required.",
  //   });
  // }, [register]);

  
  // // return <div>CreateUpdateMixin</div>;
  // return (
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     {/* register your input into the hook by invoking the "register" function */}
  //     <input
  //       defaultValue="test"
  //       {...register((initialState as AudioCreationDefaultState).audioFile)}
  //     />

  //     {/* include validation with required or other standard HTML validation rules */}
  //     <input {...register("exampleRequired", { required: true })} />
  //     {/* errors will return when field validation fails  */}
  //     {errors.exampleRequired && <span>This field is required</span>}

  //     <input type="submit" />
  //   </form>
  // );
}


// import React, { useState, useEffect } from "react";
// import { TextField, Button, Typography, Paper } from "@material-ui/core";
// import { useDispatch, useSelector } from "react-redux";
// import { useHistory, useLocation } from "react-router-dom";

// import FileBase from "react-file-base64";

// import { createAudioCard, updateAudioCard } from "../../actions/audio";
// import useStyles from "./styles";
// import { useTypedSelector } from "../../hooks/useTypedSelector";
// import { AudioCreationState } from "../../types/redux/audio";

// const initialState = {
//   compositionName: "",
//   author: "",
//   lyrics: "",
//   audioFile: {},
// };

// const Form = () => {
//   const [audioData, setAudioData] = useState(initialState);

//   const audioId = localStorage.getItem("selectedAudioId");

//   const audio = useTypedSelector((state) =>
//     audioId
//       ? Array.prototype.find.call(state.audios, (a) => a._id === audioId)
//       : null
//   );
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const classes = useStyles();
//   const user = JSON.parse(localStorage.getItem("profile"));

//   useEffect(() => {
//     if (audio) setAudioData(audio);
//   }, [audio]);

//   const clear = () => {
//     setAudioData({
//       compositionName: "",
//       author: "",
//       lyrics: "",
//       audioFile: {} as File,
//     });
//   };


//   const {
//     register,
//     handleSubmit,
//     watch,
//     formState: { errors },
//   } = useForm<Inputs>();
//   const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);


//    useEffect(() => {
//      register("autocomplete", {
//        validate: (value) => value.length || "This is required.",
//      });
//      register("select", {
//        validate: (value) => value.length || "This is required.",
//      });
//    }, [register]);

//   const handleSubmit = (operation) => async (e) => {
//     e.preventDefault();

//     operation();

//     // if (audioId === null) {
//     //   uploadFile();
//     // } else {
//     //   updateFile();
//     // }
//     clear();
//     localStorage.removeItem("selectedAudioId");
//   };

//   const updateFile = () => {
//     dispatch(updateAudioCard(audioId, { ...audioData }, history));
//   };
//   const uploadFile = () => {
//     // TODO check  it to strings .trim()
//     // if (!audioData.compositionName || !audioData.audioFile.name) {
//     //   return alert("Caption or file is missing");
//     // }

//     let formData = new FormData();
//     formData.append("compositionName", audioData.compositionName);
//     formData.append("author", audioData.author);
//     formData.append("ownerName", user.result.name);
//     formData.append("lyrics", audioData.lyrics);
//     formData.append("file", audioData.audioFile);

//     dispatch(createAudioCard(formData, history));
//   };

//   if (!user?.result?.name) {
//     return (
//       <Paper className={classes.paper}>
//         <Typography variant="h6" align="center">
//           Please Sign In to create your own memories and like other's memories.
//         </Typography>
//       </Paper>
//     );
//   }

//   return (
//     <Paper className={classes.paper}>
//       <form
//         autoComplete="off"
//         noValidate
//         className={`${classes.root} ${classes.form}`}
//         onSubmit={handleSubmit}
//       >
//         <Typography variant="h6">
//           {audioId ? `Editing "${audio.filename}"` : "Creating a Memory"}
//         </Typography>
//         <TextField
//           name="compositionName"
//           variant="outlined"
//           label="compositionName"
//           fullWidth
//           value={audioData.compositionName}
//           onChange={(e) =>
//             setAudioData({ ...audioData, compositionName: e.target.value })
//           }
//         />
//         <TextField
//           name="author"
//           variant="outlined"
//           label="author"
//           fullWidth
//           multiline
//           rows={4}
//           value={audioData.author}
//           onChange={(e) =>
//             setAudioData({ ...audioData, author: e.target.value })
//           }
//         />
//         <TextField
//           name="lyrics"
//           variant="outlined"
//           label="lyrics"
//           fullWidth
//           value={audioData.lyrics}
//           onChange={(e) =>
//             setAudioData({ ...audioData, lyrics: e.target.value })
//           }
//         />
//         <div className={classes.fileInput}>
//           <Button variant="contained" component="label">
//             Upload File
//             <input
//               type="file"
//               onChange={(e) =>{
//                   const l = e.target.files?.[0] as File;
//                 setAudioData({
//                   ...audioData,
//                   audioFile: e.target.files?.[0] as File,
//                 });}
//               }
//               hidden
//             />
//           </Button>
//         </div>
//         <Button
//           className={classes.buttonSubmit}
//           variant="contained"
//           color="primary"
//           size="large"
//           type="submit"
//           fullWidth
//         >
//           Submit
//         </Button>
//         <Button
//           variant="contained"
//           color="secondary"
//           size="small"
//           onClick={clear}
//           fullWidth
//         >
//           Clear
//         </Button>
//       </form>
//     </Paper>
//   );
// };

// export default Form;
// // update -  create

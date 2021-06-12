import './App.scss';
import {useState} from "react";

import MountainSvg from "./Assest/image.svg";
import {LoadingScreen} from "./components/Upload";
import {EndScreen} from "./components/UploadedScreen";
import axios from "axios";




function App() {

  const [dragEnters,setDragEnter]=useState(false);
  const [upload,setUpload]=useState(false);
  const [progress,setProgress]=useState(false);
  const [link,setLink]=useState("https://images.unsplash.com/photo-1611095786283-c2f965646ef1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80");

  function onDragEnter(e){
    e.stopPropagation();
    e.preventDefault();
    setDragEnter(true);
  }

  function Drop(e){
    e.preventDefault();
    e.stopPropagation();
    const Img=e.dataTransfer.files;
    console.log(Img);




    setDragEnter(false);
    setUpload(true);
  }

  function InputDrop(e){
    e.preventDefault();
    e.stopPropagation();
    const Img=e.target.files;
    console.log(Img);




    setDragEnter(false);
    setUpload(true);
  }

  function dragOver(e){
    e.preventDefault();
  }

  function dragLeave(e){
    e.preventDefault();
  }

  return (
    <div className="App">
      {upload ? (progress?<EndScreen link={link} setLoad={setProgress} />:<LoadingScreen/>) :
          (<div  className="number-1">
        <span>Upload your image</span>
        <span>File should be Jpeg, Png...</span>
        <div onDragEnter={onDragEnter} onDrop={Drop} onDragOver={dragOver} onDragLeave={dragLeave}  style={dragEnters?{border:"3px solid #97BEF4"}:null} >
        <img src={MountainSvg} width="114.13px" height="88.24px"/>
        <span>Drag & Drop your image here</span>
        </div>
        <span>Or</span>
        <div>
        <input type="file" id="file" multiple={true} accept="image/png, image/jpeg" onInput={InputDrop}/>
        <label htmlFor="file">Choose a file</label>
        </div>
        </div>)
      }
    </div>
  );
}

export default App;

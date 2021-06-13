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
  const [errorMsg,setErrorMsg]=useState(false);
  const [link,setLink]=useState("https://images.unsplash.com/photo-1611095786283-c2f965646ef1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=751&q=80");
  let Img;


  function onDragEnter(e){
    e.stopPropagation();
    e.preventDefault();
    setDragEnter(true);
  }



  async function Uploadandreturn (file){

    const formData=new FormData();
    formData.append(file[0].name,file[0]);
    try{
      const Response= await axios.post("http://127.0.0.1:8080/uploadimage",formData);
      return Response
    }catch (e){
      // window.location.href="http://localhost:3000/"

      console.log(e);

    }
  }


  function validator(Img){

    if(Img[0].type==="image/png"|Img[0].type==="image/jpeg"){

      console.log(Img);

      setDragEnter(false);
      setUpload(true);
      Uploadandreturn(Img).then((res)=>{
        if(res.status===200){
          setLink(res.data.Location);
          setProgress(true);
        }
      });

    }else{
      setErrorMsg(true);

      setTimeout(()=>{
        setErrorMsg(false);
      },1000);

    }

  }



  function Drop(e){
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
    Img=e.dataTransfer.files;
    validator(Img);
  }

  function InputDrop(e){
    e.preventDefault();
    e.stopPropagation();
    Img = e.target.files;
    validator(Img);
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
        <span>{errorMsg?"Please Upload Valid files only":"File should be Jpeg, Png..."}</span>
        <div onDragEnter={onDragEnter} onDrop={Drop} onDragOver={dragOver} onDragLeave={dragLeave}  style={dragEnters?{border:"3px solid #97BEF4"}:null} >
        <img src={MountainSvg} width="114.13px" height="88.24px" alt="Image Not found"/>
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

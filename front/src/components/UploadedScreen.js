import "./UploadedScreen.scss";
import {useEffect, useRef, useState} from "react";

export const EndScreen=({link})=>{

    const [copy,setCopy]=useState("Copy Link");
    const [load,setLoaded]=useState(false);

    function copyFunc(){
        navigator.clipboard.writeText(`${link}`);
        setCopy("Copied !");


        setTimeout(()=>{
            setCopy("Copy Link");
        },1000);
    }

    function onImageLoad(){
       setLoaded(true);
    }


    return(
      <div className="number-3">
      <span className="material-icons">check_circle</span>
      <span>Uploaded Successfully!</span>
      <div>
          {load?null:"Loading..."}

          {<img
              src={link.toString()}
              onLoad={onImageLoad}
              style={{display:load?"block":"none"}}
          />}

      </div>

      <div>
          <span>
              {link}
          </span>
          <button onClick={copyFunc}>{copy}</button>
      </div>
      </div>
    );
}
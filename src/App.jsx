import React,{useState, useEffect, Component} from 'react';
import  { findDOMNode }  from 'react-dom'

import "../node_modules/video-react/dist/video-react.css"; // import css
import ReactPlayer from 'react-player'

import './App.css';

const App = () => {

  const lista = [];
  

  const [selectedFile, setSelectedFile] = useState(null)
  const onChangeHandler = event => {
      const { files } = event.target
      let reader = new FileReader()
      reader.readAsDataURL(files[0])

      reader.onload = (e) => {
          setSelectedFile(e.target.result)
      }
  }

  return (
    <>
      <div className="container">
          <div className="videos">
            {
              /*
                <ReactPlayer width='100%' height='50%' url='https://www.youtube.com/watch?v=nYTrIcn4rjg&ab_channel=ClipsHay' volume={0.5} />

              */
            }
            <input type="file" name="file" onChange={onChangeHandler} />
            <ReactPlayer
              //width='100%' height='100%' 
              playing
              loop
              url={selectedFile} controls
              volume={10/100}
            />

          </div>
      </div>     
    </>
  )
}
export default App;

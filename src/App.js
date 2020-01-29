import React, {useState, useEffect, useRef} from 'react';
import './App.css';
import NamePicker from './A2_component.js';
import {db, useDB} from './db'
import {BrowserRouter, Route} from 'react-router-dom'
import {FiCamera } from "react-icons/fi";
import Camera from 'react-snap-pic'
import * as firebase from "firebase/app"
import "firebase/storage"


function App(){
  useEffect(()=>{
    const {pathname} = window.location
    if(pathname.length<2) window.location.pathname='home'
  }, [])

  return <BrowserRouter>
    <Route path="/:room" component={Room} /> 
  </BrowserRouter>
}


function Room(props) {

  // array of messages
  // inside the useState is [] because we want an empty array
  // message is the state variable
  // setMessages is the function
  const {room} = props.match.params
  const messages = useDB(room)
  const [username, setName] = useState("")
  console.log(messages)
  const [showCamera, setShowCamera] = useState(false)

  async function takePicture(img) {
    setShowCamera(false)
    const imgID = Math.random().toString(36).substring(7)
    var storageRef = firebase.storage().ref()
    var ref = storageRef.child(imgID + '.jpg')
    await ref.putString(img, 'data_url')
    db.send({ img: imgID, name:username, ts: new Date(), room })
  }
  
  
  return <main>

    <header className = "main-title">
      <img
        alt='logo'  
        src='https://thumbs.dreamstime.com/t/white-animal-paw-print-icon-isolated-black-background-white-animal-paw-print-icon-isolated-black-background-vector-111946193.jpg'  
        style={{height:"100%"}}
      />
       &nbsp; Chatter

       <NamePicker onSend={name => {
          console.log(name)
          setName(name)
         }}/>

    </header>


    <div className='scroll-messages'>
      {messages.map((m, i)=> <Message key={i} m={m} username={username}/>)}
    </div>
    

    <TextInput onSend={(text)=> {
      db.send({
        text, name:username, ts: new Date(), room,
      })
    }}
      showCamera={()=>setShowCamera(true)
    }/>

    {showCamera && <Camera takePicture={takePicture} />}

  </main>
}


const bucket = 'https://firebasestorage.googleapis.com/v0/b/chatter2020.appspot.com/o/'
const suffix = '.jpg?alt=media'


function Message({m, username}){
  return <div className='message-wrap'
  from={m.name===username?'me':'you'}>
    <div className='message'>
      <div className='message-user'>{m.name}</div>
      <div className='message-text'>{m.text}</div>
    </div>
</div>
}



function TextInput(props){
  var [text, setText] = useState('')
  const inputEl = useRef(null)

  // input box for text messages
  return <div className="text-input-wrap">
    <div className='bottom'>

      <button onClick={props.showCamera}
         className="camera-button">
                <FiCamera /> 
      </button>

      <input 
        className='input-text'
        value={text} 
        ref={inputEl}
        placeholder= 'write your message'
        onChange={e=> setText(e.target.value)}
        onKeyPress={e=> {
          if(e.key ==='Enter') {
            if(text) props.onSend(text)
            inputEl.current.focus()
            setText('')
          }
        }}
      />

      <button onClick={()=> {
        if(text) 
          props.onSend(text)
          inputEl.current.focus()
          setText('')
        }} className="button button-text"
        >
        <div><center><b>&uarr;</b></center></div>
      </button>

      
    </div>
    

    
  </div>
}






export default App;

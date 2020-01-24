import React, {useState, useEffect} from 'react';
import './App.css';
import NamePicker from './A2_component.js';
import {db, useDB} from './db'
import {BrowserRouter, Route} from 'react-router-dom'



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
      {messages.map((m, i)=>{
        return <div key={i} className='message-wrap'
          from={m.name===username?'me':'you'}>
            <div className='message'>
              <div className='message-user'>{m.name}</div>
              <div className='message-text'>{m.text}</div>
            </div>
        </div>
      })}
    </div>
    
    
    <TextInput onSend={(text)=> {
      // const msgs = messages.concat(text)
      // setMessages(msgs)
      db.send({
        text, name:username, ts: new Date(), room
      })
      //setMessages([text, ...messages])
    }}/>

  </main>
}


function TextInput(props){
  var [text, setText] = useState('')

  // input box for text messages
  return <div className="text-input-wrap">
    <input 
      className='input-text'
      value={text} 
      placeholder= 'write your message'
      onChange={e=> setText(e.target.value)}
      onKeyPress={e=> {
        if(e.key ==='Enter') {
          if(text) props.onSend(text)
          setText('')
        }
      }}
    />
    

  <button onClick={()=> {
    if(text) props.onSend(text)
    setText('')
    }} className="button button-text"
    >
    <div><center><b>&uarr;</b></center></div>
  </button>
  </div>
}






export default App;

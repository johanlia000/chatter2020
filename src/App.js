import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {

  // array of messages
  // inside the useState is [] because we want an empty array
  // message is the state variable
  // setMessages is the function
  const [messages, setMessages] = useState([])
  console.log(messages)
  return <main>

    <header className = "main-title">
    <img
      alt='logo'  
      src='https://thumbs.dreamstime.com/t/white-animal-paw-print-icon-isolated-black-background-white-animal-paw-print-icon-isolated-black-background-vector-111946193.jpg'  
      style={{height:"100%"}}
    />
       &nbsp; Chatter
    </header>

    <div className='scroll-messages'>
      {messages.map((m, i)=>{
        return <div key={i} className='message-wrap'>
            <div className='message'>{m}</div>
          </div>
      })}
    </div>
    
    
    <TextInput onSend={(text)=> {
      // const msgs = messages.concat(text)
      // setMessages(msgs)
      setMessages([text, ...messages])
    }}/>

  </main>
}


function TextInput(props){
  const [text, setText] = useState('')

  // input box for text messages
  return <div className="text-input">
    <input
      value={text} 
      placeholder= 'write your message'
      onChange={e=> setText(e.target.value)}
    />
    
  <button className='button' onClick={()=> {
    if(text) {
      props.onSend(text)
    }
    setText('')
    }}>
      
       <div><b>&uarr;</b></div>
  </button>
  </div>
}


function Hi(props) {
  return props.a + props.b
}




export default App;

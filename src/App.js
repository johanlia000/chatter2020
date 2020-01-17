import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return <main>

    <header className = "main-title">
    <img
      alt='logo'  
      src='https://thumbs.dreamstime.com/t/white-animal-paw-print-icon-isolated-black-background-white-animal-paw-print-icon-isolated-black-background-vector-111946193.jpg'  
      style={{width:40, height:40,}}
    />
       &nbsp; Chatter
    </header>

   

    <div className='text text-one'>
      Hey! Do you want to go to dinner?
    </div>

    <div className='arrow-left arrow-one'></div>

    <div className='text text-two'>
      Sure, what time?
    </div>

    <div className='arrow-right arrow-two'></div>

    <TextInput onSend={t=> console.log(t)}/>


  </main>
}


function TextInput(props){
  const [text, setText] = useState('')

  return <div className="text-input">
    <input size='35' value={text} 
      placeholder= 'write your message'
      onChange={e=> setText(e.target.value)}
    />

    <button className='button' onClick={()=> {
      props.onSend(text)
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

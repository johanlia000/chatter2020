import React, {useState, useRef, useEffect} from 'react';
import './App.css';
import { FiSave } from "react-icons/fi";
import { db } from './db';


function NamePicker(props) {
    const [editName, setEditName] = useState(false)
    const [name, setName] = useState('enter username') 
    const inputEl = useRef(null)

    let saveData = localStorage.getItem('name')
    if(!saveData) {
       saveData = "Add User" 
    }

 
    if (editName === false) {
        props.onSend(saveData)
        return <div>
            <div 
                onClick={()=>{
                    setName('')
                    console.log(name)
                    setEditName(true)
                }} className='button-user-click2'>{name}
            </div>

            <img onClick={()=> {
                setName('')
                console.log(name)
                setEditName(true)
                }} 
                src="https://www.stickpng.com/assets/images/585e4bf3cb11b227491c339a.png" id='profile'
                className='button-user-click'
            />
        </div>
    }
    else {
        return <div>
        <input 
            className='input-username'
            value={name}
            ref={inputEl}
            placeholder='username'
            onChange={e=> setName(e.target.value)}

            onKeyPress={e=> {
                if(e.key ==='Enter') {
                    if(name) 
                        props.onSend(name)
                        setName(name)
                        localStorage.setItem('name',name)
                        setEditName(false)
                }
            }}  
        />
        
        <button onClick={()=> {
                if(name) 
                    props.onSend(name)
                    setName(name)
                    localStorage.setItem('name',name)
                    setEditName(false)
            }} className="button-username"
        >
            <FiSave />
            {/*<div><b>ok</b></div>*/}
        </button>

    </div>

    }
    

}

export default NamePicker
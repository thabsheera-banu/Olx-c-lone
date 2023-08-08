import React, { useContext, useReducer, useState } from 'react';

import Logo from '../../olx-logo.png';
import './Signup.css';
import { FirebaseContext } from '../../store/Context';
import { useHistory , Link } from 'react-router-dom/cjs/react-router-dom.min';


export default function Signup() {
  const history =useHistory()
  const [username,Setusername]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [password,setpassword]=useState('')
  const {firebase}=useContext(FirebaseContext)
  const handlesubmit =(e)=>{
    e.preventDefault()
    if(username==='' || email===''){
      alert('Username or email cannot be empty')
      return
    }
    const whitespace=username.trim()
    if(!whitespace){
      alert("Enter a valid Username")
      return
    }
    if(phone.length >10 || phone.length<10 ){
      alert("Phone number must be 10 digits")
      return
    }
    if(password.length <6){
      alert("password should be atlest 6 characters")
      return
    }
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!email.match(emailRegex)) {
      window.alert("Please enter a valid email address.");
      return
    } 





    firebase.auth().createUserWithEmailAndPassword(email,password).then((result)=>{
      console.log(result.user);
      result.user.updateProfile({displayName:username}).then(()=>{
        firebase.firestore().collection('users').add({
          id:result.user.uid,
          username:username,
          phone:phone
        }).then(()=>{history.push('/login')
      })
      })
    })

  }
  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form onSubmit={handlesubmit}>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            value={username}
            onChange={(e)=>Setusername(e.target.value)}
            id="fname"
            name="name"
            defaultValue="John"
          />
          <br />
          
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            id="fname"
            name="email"
            defaultValue="John"
          />
          <br />
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            id="lname"
            name="phone"
            defaultValue="Doe"
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e)=>setpassword(e.target.value)}
            id="lname"
            name="password"
            defaultValue="Doe"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
          <Link to='/login' >Login</Link>
        
      </div>
    </div>
  );
}

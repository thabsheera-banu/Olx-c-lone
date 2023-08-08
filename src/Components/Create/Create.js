import React, { Fragment, useContext, useRef, useState } from 'react';
import './Create.css';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/Context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

const Create = () => {
  const history=useHistory()
  const {firebase}=useContext(FirebaseContext)
  const {user}=useContext(AuthContext)
  const [name,setName]=useState('')
  const [category,setCategory]=useState('')
  const [price,setPrice]=useState('')
  const [image,setImage]=useState(null)
  const date=new Date()
 
  const handleSubmit =(e)=>{
    e.preventDefault()
    if (!user) {
      alert("please login")
      history.push('/login')
      return
    }
    if(name=='' || category=='' || price==''){
      alert("plese fill the all fields")
      return
    }
    
    if(!name.trim() || !category.trim()){
      alert("cannot be null")
      return
    }
    
    if(image === null){
      alert("image field is required ")
      return
    }
    
    firebase.storage().ref(`/image/${image.name}`).put(image).then(({ref})=>{
      ref.getDownloadURL().then((url)=>{
        firebase.firestore().collection('products').add({
          name,
          category,
          price,
          url,
          userId:user.uid,
          createdAt:date.toDateString()

        })
        history.push('/')
      })
    }) 

  }
  return (
    <Fragment>
      <Header /> 
      <card>
        <div className="centerDiv">
          <form>
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              id="fname"
              name="Name"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              value={category}
              onChange={(e)=>setCategory(e.target.value)}
              id="fname"
              name="category"
              defaultValue="John"
            />
            <br />
            <label htmlFor="fname">Price</label>
            <br />
            <input value={price} onChange={(e)=>setPrice(e.target.value)} className="input" type="number" id="fname" name="Price" />
            <br />
          </form>
          <br />
          <img alt="Posts" width="200px" height="200px" src={ image ? URL.createObjectURL(image) : ''}></img>
         
            <br />
            <input onChange={(e)=>setImage(e.target.files[0])} type="file"  />
            <br />
            <button onClick={handleSubmit} className="uploadBtn">upload and Submit</button>
         
        </div>
      </card>
    </Fragment>
  );
};

export default Create;

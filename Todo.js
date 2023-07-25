import './App.css';
import React, { useState,useEffect } from 'react';

const getLocalStorageDate = ()=> {
  const list = localStorage.getItem("my todo list");
  if(list) {
    return JSON.parse(list);
  }
  else {
    return [];
  }
}



const Todo = () => {
  const [inputdata, setInputdata] = useState('');
  const [items, setItems] = useState(getLocalStorageDate);
  const [editItem,setEditItem]=useState("");
  const [toggleButton,setToggleButton]=useState(false);


  // Add the items in list
  const addItems = () => {
    if (!inputdata) {
      alert('Please fill the data....');
    } 
    else if(inputdata && toggleButton) {
      setItems(
        items.map((curElem) => {
           if(curElem.id === editItem) {
            return{...curElem,name:inputdata}
           }
           return curElem;
        })
      );
      setInputdata('');
      setEditItem(null);
      setToggleButton(false);
    }
    else {
      const myNewInputData = {
        id:new Date().getTime().toString(),
        name:inputdata,
      }
      setItems([...items, myNewInputData]);
      setInputdata(''); 
    }
  };
  //Edit Items
  const editItems = (index)=> {
    const todo_editItem = items.find((curElem) => {
      return curElem.id===index;
    });
    setInputdata(todo_editItem.name);
    setEditItem(index);
    setToggleButton(true);
  };



  // How to delete a task
  const deleteItems = (index)=>{
     const updateItem = items.filter((curElem) => {
      return curElem.id !== index;
     });
     setItems(updateItem);
  };
  // Remove all
  const removeAll = () => {
    const confirmed = window.confirm('Are you sure you want to remove all items?');
    if (confirmed) {
      setItems([]);
    }
  };
// Adding Local Storage
useEffect(()=>{
 localStorage.setItem("my todo list",JSON.stringify(items))
},[items])

  return (
    <div className='main-div'>
      <div className='logo'>
        <img src='todolist.png' alt='Not found' />
        <h3>Add Your List Here</h3>
      </div>
      <div className='input_field'>
        <input
          type='text'
          id='text'
          placeholder='📝Enter your Task Here....'
          value={inputdata}
          onChange={(e) => setInputdata(e.target.value)}
        />
        {toggleButton ? (  <button className='btn'>
              <i className='fa-solid fa-pen-to-square ' onClick={addItems}></i>
            </button> ) : (
        <button id='add_Text' onClick={addItems}>
          Add Text
        </button>
            )
}
      </div>
      {/* Show item section */}
      <div className='ShowItems'>
        {items.map((curElem) => (
          <div key={curElem.id}>
            <h3>{curElem.name}</h3>
            <button className='btn'>
              <i  className='fa-solid fa-pen-to-square' onClick={()=> editItems(curElem.id)}></i>
            </button>
            <button className='btn' onClick={()=> deleteItems(curElem.id)}>
              <i  className='fa-solid fa-trash trash-btn  '></i>
            </button>
          </div>
        ))}
        <button className='clear_All' onClick={removeAll}>Remove All</button>
      </div>
    </div>
  );
};

export default Todo;

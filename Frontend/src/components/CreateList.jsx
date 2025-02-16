import React, { useState } from 'react'

export default function CreateList({setListFunc, darkMode}) {
  const [description, setDescription] = useState("");

  function submitHandle(e) {
    e.preventDefault();
    if(!description) return;

    const obj = {
      id: Date.now(),
      list: description,
      status: false
    }
    setListFunc(obj);
    setDescription("");
  }

  return (
    <form className={`${darkMode?`bg-neutral-800`:`bg-purple-600`} fixed w-[100%] bottom-0 px-3 py-4 flex justify-center items-center rounded-t-lg`} onSubmit={submitHandle}>
      <input className={`${darkMode?`bg-neutral-800`:`bg-white`} w-[75%] md:w-[50%] lg:w-[30%] h-13 text-xl border-1 text-center rounded-lg`} 
        type="text" 
        placeholder='Enter List'
        value={description}
        onChange={(e)=>{setDescription(e.target.value)}}
      />
      <button className='border-1 w-[20%] lg:w-[10%] h-13 text-white text-md font-bold rounded-lg'
      >Add</button>
    </form>
  )
}

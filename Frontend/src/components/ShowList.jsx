import React from 'react'

export default function ShowList({item, index, onDelete, statusChange, darkMode}) {
  
  return (
    <div className={`${darkMode?`bg-stone-900`:`bg-white`}  shadow-xl rounded-xl my-1 w-[95%] h-[50px] mx-auto flex justify-between items-center py-2`}>
      <button className=' mx-4 ' onClick={()=>statusChange(item.id)}>{item.status?`🔄️`:`✅`}</button>
      <div className={`${item.status?`line-through text-gray-400`:``} custom-scrollbar overflow-x-auto text-xl w-[80%] text-left mx-auto`}>({index+1}) {item.list}</div>
      <button className=' mx-2 ' onClick={()=>onDelete(item.id)}>❌</button>
    </div>
  )
}

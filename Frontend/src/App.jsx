import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import ShowList from './components/ShowList'
import CreateList from './components/CreateList'

function App() {
  const [list, setList] = useState([]);
  const [sort, setSort] = useState("input");

  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);
  
  let sortedItem = list;

  useEffect(() => {
    const initialLists = JSON.parse(localStorage.getItem("lists")) || [];
    setList(initialLists);
  }, []);

  if(sort === "input") sortedItem = list;

  if(sort === "text") {
    sortedItem = list.slice().sort((a, b) => a.list.localeCompare(b.list))
  }

  if (sort === "status") {
    sortedItem = list.slice().sort((a, b) => Number(a.status) - Number(b.status));
  }

  function addItemOnList(obj) {
    setList((ele) => {
      const newList = [...ele, obj];
      localStorage.setItem("lists", JSON.stringify(newList));
      return newList;
    });
  }
  function deleteItemOnList(id) {
    setList((ele)=>{
      const newList = ele.filter((item)=>item.id !== id);
      localStorage.setItem("lists", JSON.stringify(newList));
      return newList;
    });
  }

  function onStatusChange(id) {
    setList((ele)=>{
      const newList = ele.map((item) => 
        item.id === id ? { ...item, status: !item.status } : item
      );
      localStorage.setItem("lists", JSON.stringify(newList));
      return newList;
    })
  }

  function onAllClear() {
    if (window.confirm("Are you sure?")) {
      console.log("User clicked Yes");
      localStorage.removeItem("lists");
      location.reload();
    } else {
      console.log("User clicked No");
    }
  }

  return (
    <div>
      <Navbar allClear={onAllClear} sort={sort} setSort={setSort} darkMode={darkMode} setDarkMode={setDarkMode}/>
      <div className=' w-[100%] pb-8 pt-2 mx-auto px-2 hide-scrollbar overflow-auto text-center grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
        {list && sortedItem.map((ele,i)=>
          <ShowList 
            item={ele}
            index={i} 
            key={i} 
            onDelete={deleteItemOnList} 
            statusChange={onStatusChange}
            darkMode={darkMode}
          />)
        }
      </div>
      <Stats items={list} darkMode={darkMode}/>
      <CreateList setListFunc={addItemOnList} darkMode={darkMode}/>
    </div>
  )
}

function Stats({ items, darkMode }) {
  if (!items.length)
    return (
      <p className={`${darkMode?`text-white`:`text-black`} w-[70%] mx-auto text-center text-xl font-bold`}>
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );

  const numItems = items.length;
  const numPacked = items.filter((item) => item.status).length;
  const percentage = Math.round((numPacked / numItems) * 100);

  return (
    <footer className={`${darkMode?`text-white`:`text-black`} w-[70%] mx-auto pb-28 text-center text-xl font-bold`}>
      <em>
        {percentage === 100
          ? "You got everything! Ready to go ✈️"
          : `You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
}

export default App

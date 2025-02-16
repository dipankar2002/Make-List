import React from 'react'
import logoW from '../../public/logo-white.png';
import logoB from '../../public/logo-black.png';

export default function Navbar({allClear, sort, setSort, darkMode, setDarkMode}) {
  return (
    <nav className={`${darkMode?`bg-neutral-800`:`bg-purple-600`} flex justify-between py-4 px-6 sm:px-20 lg:px-40 items-center rounded-b-lg`}>
      <div className='flex items-center text-white text-2xl font-bold'>
        <img className='w-[35px]' src={logoW} alt="" />
        Make List
        <button className='ml-2' onClick={() => setDarkMode((ele)=>!ele)}>🌘</button>
      </div>
      <div className=''>
        <select className=' w-18 h-10 text-white text-md font-bold rounded-lg text-center appearance-none'
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="none" disabled hidden>Sort</option>
          <option value="input">By input</option>
          <option value="text">By text</option>
          <option value="status">By status</option>
        </select>
        <button className='border-1 w-15 h-10 text-white text-md font-bold rounded-lg'
          onClick={allClear}
        >Clear</button>
      </div>
    </nav>
  )
}
 

import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'
import Banner from '../components/Banner'

export default function Navbar() {

  const router = useRouter();

  function handleLogout(){
      
      let url = 'http://localhost:3001/logout';
      let method = 'GET';
      let msgError = "Error, logout wasn't possible.";
  
      var requestOptions = {
          method: method,
          headers: { 'Content-Type': 'application/json'},
      };
      
      fetch(url, requestOptions)
      .then(response => {
          if (response.ok){
              return Promise.all([response.ok]);
          }
          else{
              return response.text().then(text => {throw new Error(text)});
          }
      })
      .then(([responseOk]) => {
        router.push('/login');
      })
      .catch((error) => {
        setError(error.message);
      });
  }

  

  return (
    <header className="bg-white border-b ">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex flex-1">
            <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only text-indigo-500">Car app company</span>
                <img
                    className="mx-auto h-10 w-auto"
                    src="/favicon.ico"
                    alt="Car app company"
                />          
            </a>
        </div>
        <div className="justify-end">
            <a href="/" className="text-md font-medium leading-6 text-indigo-500 border-solid border-r-2 px-8 py-2 border-gray-300"> 
                All cars 
            </a>
        </div>
        <div className="justify-end mr-8">
            <a href="/newCar" className="text-md font-medium leading-6 text-indigo-500 border-solid border-r-2 px-8 py-2 border-gray-300"> 
                Create car 
            </a>
        </div>
        <div className="justify-end">
            <button className="text-md font-medium leading-6 text-indigo-500" onClick={()=>handleLogout()}> 
                Log out <span aria-hidden="true">&rarr;</span>
            </button>
        </div>
        <div className="justify-end">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 text-indigo-500">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
          </svg>
        </div>
      </nav>
      <Banner></Banner>
    </header>
  )
}
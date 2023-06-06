import { Fragment, useState } from 'react'
import { useRouter } from 'next/router'


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
        <div className="flex lg:flex-1">
            <a href="/" className="-m-1.5 p-1.5">
                <span className="sr-only text-indigo-500">Car app company</span>
                <img
                    className="mx-auto h-10 w-auto"
                    src="/favicon.ico"
                    alt="Car app company"
                />          
            </a>
        </div>
        <div className=" lg:flex lg:flex-1 lg:justify-end">
            <a href="/newCar" className="text-sm font-semibold leading-6 text-indigo-500"> 
                create car 
            </a>
        </div>
        <div className=" lg:flex lg:flex-1 lg:justify-end">
            <button className="text-sm font-semibold leading-6 text-indigo-500" onClick={()=>handleLogout()}> 
                Log out <span aria-hidden="true">&rarr;</span>
            </button>
        </div>
      </nav>
    </header>
  )
}
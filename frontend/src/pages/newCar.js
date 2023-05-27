import { useState, useEffect, Fragment } from 'react';
import { useRouter } from 'next/router'
import Navbar from 'i/components/Navbar';
import { Listbox, Transition } from '@headlessui/react'

export default function NewCar(){
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState({});
    const [loading, setLoading] = useState('');

    useEffect(() => {

        getData('brands');
  
    }, [])

    function getData(params){
        setLoading(true);
    
        let url = 'http://localhost:3001/' + params;
        let method = 'GET';
        let msgError = "Error, there was a problem while fetching the cars.";
    
        var requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json'},
        };
        
        fetch(url, requestOptions)
        .then(response => {
            if (response.ok){
                return response.json();
            }
            else{
                return response.text().then(text => {throw new Error(text)});
            }
        })
        .then((response) => {
            if(params === 'brands'){
                setBrands(response);
            }
          
          
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
            //setError(error.message);
        });
      }

     
  /*const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleEmailChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let url = 'http://localhost:3001/login';
    let method = 'POST';
    let msgError = "Error, the password or username is invalid.";
    let data = {username: username, password: password};

    var requestOptions = {
            method: method,
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(data)
    };
    
    fetch(url, requestOptions)
    .then(response => {
        if (response.ok){
            return Promise.all([response.ok, response.json()]);
        }
        else{
            return response.text().then(text => {throw new Error(text)});
        }
    })
    .then(([responseOk, body]) => {
        
        setUsername('');
        setPassword('');
        router.push('/');
        //window.location.replace('/');
    })
    .catch((error) => {
        setError(error.message);
    });
  };*/

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <>
    <Navbar></Navbar>
    <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
        <h2 className=" text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new Car
        </h2>
      <div className="z-0 grid gap-4 grid-cols-3 grid-rows-3 mt-10 space-y-6 ">
        <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Brand</label>
            <Listbox value={selectedBrand} onChange={setSelectedBrand}>
                
                <Listbox.Button className="w-full h-10 mt-2 rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
                    {selectedBrand.name}
                </Listbox.Button>
                <Listbox.Options className="z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {brands.map((brand) => (
                    <Listbox.Option
                        key={brand.id}
                        className={({ active }) =>
                        classNames(
                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                            'relative cursor-default select-none py-2 pl-3 pr-9'
                        )
                        }
                        value={brand}
                    >
                        {({ selected, active }) => (
                        <>
                            <div className="flex items-center">
                            <span
                                className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                            >
                                {brand.name}
                            </span>
                            </div>

                            {selected ? (
                            <span
                                className={classNames(
                                active ? 'text-white' : 'text-indigo-600',
                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                )}
                            >
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                            </span>
                            ) : null}
                        </>
                        )}
                    </Listbox.Option>))}
              </Listbox.Options>
            </Listbox>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Model</label>
            <div className="mt-2">
              <input name="model" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Version</label>
            <div className="mt-2">
              <input name="version" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Year</label>
            <div className="mt-2">
              <input name="version" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Transmission</label>
            <div className="mt-2">
              <input name="version" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Condition</label>
            <div className="mt-2">
              <input name="condition" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Price</label>
            <div className="mt-2">
              <input name="price" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Mileage</label>
            <div className="mt-2">
              <input name="mileage" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Promoted</label>
            <div className="mt-2">
              <input name="promoted" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Financing</label>
            <div className="mt-2">
              <input name="financing" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">State</label>
            <div className="mt-2">
              <input name="state" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">City</label>
            <div className="mt-2">
              <input name="version" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
          {/* <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="#" className="font-semibold text-indigo-500 hover:text-indigo-400">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handlePasswordChange} 
              />
            </div>
          </div> */}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              /* onClick={handleSubmit} */
            >
              Sign in
            </button>
          </div>
      

        {/* <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <a href="/register" className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400">
            Sign up here!
          </a>
        </p> */}
      </div>
    </div>
  </>
  );
};

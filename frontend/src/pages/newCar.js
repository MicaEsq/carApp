import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Navbar from 'i/components/Navbar';
import Dropdown from 'i/components/Dropdown';

export default function NewCar(){
    const [brands, setBrands] = useState([]);
    const [selectedBrand, setSelectedBrand] = useState({});
    const [models, setModels] = useState([]);
    const [selectedModel, setSelectedModel] = useState({});
    const [states, setStates] = useState([]);
    const [selectedState, setSelectedState] = useState({});
    const [cities, setCities] = useState([]);
    const [selectedCity, setSelectedCity] = useState({});
    const [selectedTransimission, setSelectedTransimission] = useState([]);
    const [selectedPromoted, setSelectedPromoted] = useState([]);
    const [selectedFinancing, setSelectedFinancing] = useState([]);
    const [selectedCondition, setSelectedCondition] = useState([]);
    const [loading, setLoading] = useState('');

    const prevSelectedBrandRef = useRef();
    const prevSelectedModelRef = useRef();
    const prevSelectedStateRef = useRef();
    const prevSelectedCityRef = useRef();

    useEffect(() => {

        getFilters('brands', '');
        prevSelectedBrandRef.current = selectedBrand;
        getFilters('models', '');
        prevSelectedModelRef.current = selectedModel;
        getFilters('states', '');
        prevSelectedStateRef.current = selectedState;
        getFilters('cities', '');
        prevSelectedCityRef.current = selectedCity;
  
    }, [])

    useEffect(() => {
        if(prevSelectedBrandRef.current !== selectedBrand){
            getFilters('models', selectedBrand.id);
            prevSelectedBrandRef.current = selectedBrand;
        }
        else if(prevSelectedStateRef.current !== selectedState){
            getFilters('cities', selectedState.id);
            prevSelectedStateRef.current = selectedState;
        }        
        else if(prevSelectedModelRef.current !== selectedModel){
            getFilters('brands', selectedModel.name);
            prevSelectedModelRef.current = selectedModel;
        }
        else if(prevSelectedCityRef.current !== selectedCity){
          getFilters('states', selectedCity.id);
          prevSelectedCityRef.current = selectedCity;
        } 
    
        
    }, [selectedBrand, selectedState, selectedModel, selectedCity])


    function getFilters(extension, primary){
        let url = 'http://localhost:3001/filters';
        let method = 'POST';
        let msgError = "Error, filters could not be loaded.";
        let data = {primaryFilter: primary, type: extension };
        var requestOptions = {};
  
        requestOptions = {
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
        .then(([responseOk, response]) => {
          if(extension === 'brands'){
            setBrands(response)
          }
          else if(extension === 'models'){
            setModels(response)
          }
          else if(extension === 'states'){
            setStates(response)
          }
          else if(extension === 'cities'){
            setCities(response)
          }
          else{

          }
        })
        .catch((error) => {
          console.log(error);
            //setError(error.message);
        });
    }

    /* function getData(params){
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
      } */

     
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

  

  return (
    <>
    <Navbar></Navbar>
    <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
        <h2 className=" text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new Car
        </h2>
        <div className="z-0 grid gap-4 grid-cols-3 grid-rows-3 mt-10 space-y-6 ">
            <div className='relative'>
                <Dropdown label='Brand' selectedOption={selectedBrand} setSelectedOption={setSelectedBrand} allOptions={brands}/>
            </div>
            <div>
                <Dropdown label='Model' selectedOption={selectedModel} setSelectedOption={setSelectedModel} allOptions={models}/>
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
            <Dropdown label='Transmission' selectedOption={selectedTransimission} setSelectedOption={setSelectedTransimission} allOptions={[{id:1, name:'Automatic'}, {id:2, name:'Manual'}]}/>
          </div>
          <div>
            <Dropdown label='Condition' selectedOption={selectedCondition} setSelectedOption={setSelectedCondition} allOptions={[{id:1, name:'New'}, {id:2, name:'Used'}]}/>
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
            <Dropdown label='Promoted' selectedOption={selectedPromoted} setSelectedOption={setSelectedPromoted} allOptions={[{id:1, name:'Yes'}, {id:2, name:'No'}]}/>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Financing</label>
            <div className="mt-2">
              <input name="financing" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                /* onChange={handleEmailChange} */ />
            </div>
          </div>
            <div>
                <Dropdown label='State' selectedOption={selectedState} setSelectedOption={setSelectedState} allOptions={states}/>
            </div>
            <div>
                <Dropdown label='City' selectedOption={selectedCity} setSelectedOption={setSelectedCity} allOptions={cities}/>
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

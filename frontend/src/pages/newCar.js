import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Navbar from 'i/components/Navbar';
import Dropdown from 'i/components/Dropdown';

export default function NewCar(){
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState([]);
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState([]);
  const [selectedTransimission, setSelectedTransimission] = useState([]);
  const [selectedPromoted, setSelectedPromoted] = useState([]);
  const [selectedFinancing, setSelectedFinancing] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedPrice, setSelectedPrice] = useState('');
  const [selectedMileage, setSelectedMileage] = useState('');
  const [loading, setLoading] = useState('');

  const router = useRouter();

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
  

  function formatData(){
    let result = {brand_id: selectedBrand.id, model_id: selectedModel.id, state_id: selectedState.id, city_id: selectedCity.id, year: selectedYear, version: selectedVersion, transmission: selectedTransimission.name, condition: selectedCondition.name, price: selectedPrice, mileage: selectedMileage, promoted: selectedPromoted.name, financing: selectedFinancing.name};
    return result;
  }
    
  const handleChange=(event)=>{
    console.log(event.target.value);
    if(event.target.name === 'year'){
      setSelectedYear(event.target.value);
    }
    else if(event.target.name === 'version'){
      setSelectedVersion(event.target.value);
    }
    else if(event.target.name === 'price'){
      setSelectedPrice(event.target.value);
    }
    else if(event.target.name === 'mileage'){
      setSelectedMileage(event.target.value);
    }
    else{

    }
  }
  

  const handleSubmit = (event) => {
    event.preventDefault();
    
    let url = 'http://localhost:3001/newCar';
    let method = 'POST';
    let msgError = "Error, .";
    let data = formatData();

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
        
        router.push('/');
        //window.location.replace('/');
    })
    .catch((error) => {
        //setError(error.message);
    });
  };

  

  return (
    <>
    <Navbar></Navbar>
    <div className="flex min-h-full flex-1 flex-col px-6 py-12 lg:px-8">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Create a new Car
        </h2>
        <div className="grid gap-4 grid-cols-4 grid-rows-3 mt-10 space-y-6 px-6">
            <div className='mt-6'>
                <Dropdown label='Brand' selectedOption={selectedBrand} setSelectedOption={setSelectedBrand} allOptions={brands}/>
            </div>
            <div>
                <Dropdown label='Model' selectedOption={selectedModel} setSelectedOption={setSelectedModel} allOptions={models}/>
            </div>
            <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">Version</label>
                <div className="mt-2">
                <input name="version" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                    onChange={handleChange}/>
                </div>
            </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Year</label>
            <div className="mt-2">
              <input name="year" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                onChange={handleChange} />
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
                onChange={handleChange}/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Mileage</label>
            <div className="mt-2">
              <input name="mileage" required className="block w-full rounded-md border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                onChange={handleChange}/>
            </div>
          </div>
          <div>
            <Dropdown label='Promoted' selectedOption={selectedPromoted} setSelectedOption={setSelectedPromoted} allOptions={[{id:1, name:'Yes'}, {id:2, name:'No'}]}/>
          </div>
          <div>
            <Dropdown label='Financing' selectedOption={selectedFinancing} setSelectedOption={setSelectedFinancing} allOptions={[{id:1, name:'Yes'}, {id:2, name:'No'}]}/>
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

          <div className=''>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={handleSubmit}
            >
              Sign in
            </button>
          </div>
      
      </div>
    </div>
  </>
  );
};

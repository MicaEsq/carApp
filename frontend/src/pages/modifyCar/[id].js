import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/router'
import Navbar from 'i/components/Navbar';
import Dropdown from 'i/components/Dropdown';

export default function ModifyCar(){

  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [states, setStates] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedTransimission, setSelectedTransimission] = useState("");
  const transmissionOptions = [{id:1, name:'Automatic'}, {id:2, name:'Manual'}];
  const [selectedPromoted, setSelectedPromoted] = useState("");
  const promfinOptions = [{id:1, name:'Yes'}, {id:2, name:'No'}];
  const [selectedFinancing, setSelectedFinancing] = useState("");
  const conditionOptions = [{id:1, name:'New'}, {id:2, name:'Used'}];
  const [selectedCondition, setSelectedCondition] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");
  const [selectedMileage, setSelectedMileage] = useState("");
  const [dataReceived, setDataReceived] = useState([]);
  const [dataToUse, setDataToUse] = useState("");
  const [loading, setLoading] = useState("");
  const [error, setError] = useState("");
  
  let count = 1; 
  const router = useRouter();
  const { id } = router.query;

  const prevSelectedBrandRef = useRef();
  const prevSelectedModelRef = useRef();
  const prevSelectedStateRef = useRef();
  const prevSelectedCityRef = useRef();
  const isFirstLoadRef = useRef(true);

  useEffect(() => {
    if(id && count === 1){
      count=2;
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/cars/${id}`);
          if (response.ok) {
            const data = await response.json();

            setDataReceived(data);
            setDataToUse(JSON.parse(JSON.stringify(data)));
            setSelectedTransimission(data.transmission === 'Automatic' ? transmissionOptions[0] : transmissionOptions[1])
            setSelectedPromoted(data.promoted === 'Yes' ? promfinOptions[0] : promfinOptions[1])
            setSelectedFinancing(data.financing === 'Yes' ? promfinOptions[0] : promfinOptions[1])
            setSelectedCondition(data.condition === 'New' ? conditionOptions[0] : conditionOptions[1])
            setSelectedVersion(data.version)
            setSelectedYear(data.year)
            setSelectedPrice(data.price)
            setSelectedMileage(data.mileage)

            prevSelectedBrandRef.current = data.brand;
            prevSelectedModelRef.current = data.model;
            prevSelectedStateRef.current = data.city;
            prevSelectedCityRef.current = data.state;

            await getFilters('brands', '');
            await getFilters('models', '');
            await getFilters('states', '');
            await getFilters('cities', '');

          } else {
            throw new Error('Error, there was a problem while fetching the cars.');
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
          isFirstLoadRef.current = false;
        }
      };

      fetchData();

    }
  }, [id]);

  useEffect(() => {
    if(!isFirstLoadRef.current){
      
      if(prevSelectedBrandRef.current !== selectedBrand && selectedBrand.id){
        getFilters('models', selectedBrand.id);
        prevSelectedBrandRef.current = selectedBrand;
      }
      else if(prevSelectedModelRef.current !== selectedModel && selectedModel.name){
        getFilters('brands', selectedModel.name);
        prevSelectedModelRef.current = selectedModel;
      }
      else if(prevSelectedStateRef.current !== selectedState && selectedState.id){
        getFilters('cities', selectedState.id);
        prevSelectedStateRef.current = selectedState;
      }   
      else if(prevSelectedCityRef.current !== selectedCity && selectedCity.id){
        getFilters('states', selectedCity.id);
        prevSelectedCityRef.current = selectedCity;
      }
    }
  }, [selectedBrand, selectedModel, selectedState, selectedCity])


  async function getFilters(extension, primary){
      try{
          let url = 'http://localhost:3001/filters';
          let method = 'POST';
          let data = {primaryFilter: primary, type: extension };
          var requestOptions = {};

          requestOptions = {
              method: method,
              headers: { 'Content-Type': 'application/json'},
              body: JSON.stringify(data)
          };
          
          const response = await fetch(url, requestOptions);
          
          if (response.ok){
            const responseData = await response.json();

            if (extension === 'brands') {
              setBrands(responseData);
            } else if (extension === 'models') {
              setModels(responseData);
            } else if (extension === 'states') {
              setStates(responseData);
            } else if (extension === 'cities') {
              setCities(responseData);
            }

          } else {
            throw new Error('Error, there was a problem while fetching the filters.');
          }
        } catch (error) {
          throw new Error(error.message);
        }
  }
    
  const handleChange=(event)=>{
    if(event.target.name === 'year'){
      dataToUse.year = event.target.value;
    }
    else if(event.target.name === 'version'){
      dataToUse.version = event.target.value;
    }
    else if(event.target.name === 'price'){
      dataToUse.price = event.target.value;
    }
    else if(event.target.name === 'mileage'){
      dataToUse.mileage = event.target.value;
    }
    else{}
  }

  function formatData(){
    let data = {};

    for(let newData in dataToUse){ 
      if(typeof(dataToUse[newData])==='object' && newData !== 'image'){
          if(dataToUse[newData].id !== dataReceived[newData].id){
            let name = newData + '_id';
            data[name]=dataToUse[newData].id;
          }
      }
      else if(typeof(dataToUse[newData])==='string'){
          if(dataToUse[newData].localeCompare(dataReceived[newData])!==0){
              data[newData]=dataToUse[newData];
          }
      }
      else{ 
          if(dataToUse[newData] !== dataReceived[newData]){
              data[newData]=dataToUse[newData];
          }
      }
    }
        
    return data;
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();

    let url = `http://localhost:3001/cars/${id}`;
    let method = 'PUT';
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
        router.push(`/carView/${id}`);
        setError('');
    })
    .catch((error) => {
        setError(error.message);
    }); 
  };

  

  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-1 flex-col px-6 py-12 lg:px-8">
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Modify Car
        </h2>
        <h3 className="text-sm leading-9 tracking-tight text-gray-900">
            All fields with an * are Required
        </h3>
        {dataToUse !== "" && <div className="grid gap-4 grid-cols-3 mt-10 space-y-6 px-6 shadow-md rounded-lg pb-5">
           <div className='mt-6'>
              <Dropdown label='Brand' selectedOption={dataToUse.brand} allData={dataToUse} setSelectedOption={setDataToUse} allOptions={brands} updateFilter={setSelectedBrand}/>
          </div>
          <div>
              <Dropdown label='Model' selectedOption={dataToUse.model} allData={dataToUse} setSelectedOption={setDataToUse} allOptions={models} updateFilter={setSelectedModel}/>
          </div>
          <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">Version</label>
              <div className="mt-2">
              <input name="version" required value={dataToUse.version} className="block w-full rounded-lg border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                  onChange={handleChange}/>
              </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Year</label>
            <div className="mt-2">
              <input name="year" required value={dataToUse.year} className="block w-full rounded-lg border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                onChange={handleChange} />
            </div>
          </div>
          <div>
            <Dropdown label='Transmission' selectedOption={dataToUse.transmission === 'Automatic' ? transmissionOptions[0] : transmissionOptions[1]} allData={dataToUse} setSelectedOption={setDataToUse} allOptions={transmissionOptions} updateFilter={''}/>
          </div>
          <div>
            <Dropdown label='Condition' selectedOption={dataToUse.condition === 'New' ? conditionOptions[0] : conditionOptions[1]} allData={dataToUse} setSelectedOption={setDataToUse} allOptions={conditionOptions} updateFilter={''}/>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Price</label>
            <div className="mt-2">
              <input name="price" required value={dataToUse.price} className="block w-full rounded-lg border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                onChange={handleChange}/>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">Mileage</label>
            <div className="mt-2">
              <input name="mileage" required value={dataToUse.mileage} className="block w-full rounded-lg border py-1.5 pl-3 text-gray-900 shadow-sm border-gray-300 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 sm:text-sm sm:leading-6"
                onChange={handleChange}/>
            </div>
          </div>
          <div>
            <Dropdown label='Promoted' selectedOption={dataToUse.promoted === true ? promfinOptions[0] : promfinOptions[1]} allData={dataToUse} setSelectedOption={setDataToUse} allOptions={promfinOptions} updateFilter={''}/>
          </div>
          <div>
            <Dropdown label='Financing' selectedOption={dataToUse.financing === true ? promfinOptions[0] : promfinOptions[1]} allData={dataToUse} setSelectedOption={setDataToUse} allOptions={promfinOptions} updateFilter={''}/>
          </div>
          <div>
              <Dropdown label='State' selectedOption={dataToUse.state} allData={dataToUse} setSelectedOption={setDataToUse} allOptions={states} updateFilter={setSelectedState}/>
          </div>
          <div>
              <Dropdown label='City' selectedOption={dataToUse.city} allData={dataToUse} setSelectedOption={setDataToUse} allOptions={cities} updateFilter={setSelectedCity}/>
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

          <div className='h-full'>
            <button
              type="submit"
              className="flex w-full justify-center rounded-lg bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
      
        </div>}
      </div>
  </>
  );
};
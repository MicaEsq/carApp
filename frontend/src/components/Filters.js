import { Disclosure } from '@headlessui/react'
import { useState, useEffect } from 'react'

function getButtons(options, getFilters, setFiltersApplied, filtersApplied, setModifiedFilter){
  const [minimum, setMinimum] = useState('');
  const [maximum, setMaximum] = useState('');

  var newSetOptions = filtersApplied.slice();
  
  function addToSet(opt, type){
    var obj = {label:type, value:opt};
    if(!newSetOptions.some(filter => filter.label === obj.label && filter.value === obj.value)){
      newSetOptions.push({label:type, value:opt})
      setFiltersApplied(newSetOptions)
      setModifiedFilter(true)
    }
  } 

  function checkGet(idPrimary){
    if(options.type === 'brands'){
      getFilters('models', idPrimary)
    }
    else if(options.type === 'states'){ 
      getFilters('cities', idPrimary)
    }
    else{
    }
  }

  const handleChangeMinimum = evt => {
    const value = evt.target.value
    setMinimum(value)
  }

  const handleChangeMaximum = evt => {
    const value = evt.target.value
    setMaximum(value)
  }
  
  if(options.type === 'states' || options.type === 'cities' || options.type === 'brands' || options.type === 'models' || options.type === 'transmission'){
    return options.values.map((option, index) => {
        return <Disclosure.Button key={index} className='text-[#1B2141] pb-4 text-left' onClick={()=>{addToSet(option.name, options.type); checkGet(option.id)}}>{option.name}</Disclosure.Button>
    } )
  }
  else{
        return <div className="flex flex-row">{/*  //modify depending on filter */}
          
            <div className="relative my-6">
              <input
                id="min"
                type="text"
                placeholder="Minimum"
                value={minimum}
                className="peer relative h-10 w-full border-b border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-indigo-500 focus:outline-none focus-visible:outline-none "
                onChange={handleChangeMinimum}
              />
              <label
                htmlFor="min"
                className="absolute left-2 -top-2 z-[1] cursor-text  text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm"
              >
                Min.
              </label>
            </div>
            <div className="relative my-6">
              <input
                id="max"
                type="text"
                placeholder="Maximum"
                value={maximum}
                className="peer relative h-10 w-full border-b border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white focus:border-indigo-500 focus:outline-none focus-visible:outline-none "
                onChange={handleChangeMaximum}
              />
              <label
                htmlFor="max"
                className="absolute left-2 -top-2 z-[1] cursor-text  text-xs text-slate-400 transition-all before:absolute before:top-0 before:left-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm"
              >
                Max.
              </label>
            </div>
      </div>
      }
    
}

export default function Filters({setFiltersApplied, filtersApplied, setModifiedFilter}) {

  const [filters, setFilters] = useState(['brand', 'model', 'year', 'state', 'city', 'transmission', 'price', 'mileage']);
  const [filters2, setFilters2] = useState([{type:'brands', values:[]}, {type:'models', values:[]}, {type:'year', values:[]}, {type:'states', values:[]}, {type:'cities', values:[]}, {type:'transmission', values:[{id:1, name:'Automatic'}, {id:2, name:'Manual'}]}, {type:'price', values:[]}, {type:'mileage', values:[]}]);
  
  useEffect(() => {
    
    getFilters('brands', '')
    getFilters('states', '')

  }, [])

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
        for(var i=0; i < filters2.length; i++){
          if(filters2[i].type === extension){
            filters2[i].values = response;
          }
        }
      })
      .catch((error) => {
        console.log(error);
          //setError(error.message);
      });
  }

  return (
    <div className="flex flex-col bg-white mt-16 rounded-lg">
      {filters.map((filter, index) => {
        return <Disclosure key={filter.type}>
          {({ open }) => ( 
            <>
            <Disclosure.Button className="grid grid-rows-1 grid-flow-col items-center text-left py-5 text-[#1B2141] font-bold">
              {filter[0].toUpperCase() + filter.substring(1)}
              <div className={open ? 'justify-self-end rotate-180 transform' : 'justify-self-end'} >
                <svg width="10" height="6" viewBox="0 0 10 6" fill="#5F647A" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.292989 0.293001C0.480517 0.10553 0.734825 0.000214245 0.999989 0.000214268C1.26515 0.000214291 1.51946 0.10553 1.70699 0.293001L4.99999 3.586L8.29299 0.293002C8.48159 0.110844 8.73419 0.0100492 8.99639 0.0123276C9.25859 0.0146059 9.5094 0.119775 9.69481 0.305183C9.88022 0.490591 9.98539 0.741404 9.98766 1.0036C9.98994 1.2658 9.88915 1.5184 9.70699 1.707L5.70699 5.707C5.51946 5.89447 5.26515 5.99979 4.99999 5.99979C4.73482 5.99979 4.48052 5.89447 4.29299 5.707L0.292989 1.707C0.105518 1.51947 0.000202593 1.26516 0.000202616 1C0.000202639 0.734836 0.105518 0.480528 0.292989 0.293001Z" fill="#5F647A"/>
                </svg>
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="grid grid-cols-1 justify-items-start text-gray-900 text-sm">
              {getButtons(filters2[index], getFilters, setFiltersApplied, filtersApplied, setModifiedFilter)} 
            </Disclosure.Panel>
            <hr/> 
            </>
            )}
        </Disclosure>
      })}
    </div>
  );
}
import { Disclosure } from '@headlessui/react'


function getButtons(options, typeOfFilterEnglish, setFiltersApplied, filtersApplied, setModifiedFilter){

  var newSetOptions = filtersApplied.slice();
  
  function addToSet(opt, type){
    var obj = {label:type, value:opt};
    if(!newSetOptions.some(filter => filter.label === obj.label && filter.value === obj.value)){
      newSetOptions.push({label:type, value:opt})
      setFiltersApplied(newSetOptions)
      setModifiedFilter(true)
    }
  }

  return options.map((option, index) => {
    return <Disclosure.Button key={index} className='text-[#1B2141] pb-4 text-left' onClick={()=>addToSet(option, typeOfFilterEnglish)}>{option}</Disclosure.Button>
  })
}

export default function Filters({data, setFiltersApplied, filtersApplied, setModifiedFilter}) {
  var filters=["marca", "modelo", "version", "año", "ciudad"];
  var filterEnglish = ['brand', 'model', 'version', 'year', 'city'];

  return (
    <div className="flex flex-col bg-white mt-16 rounded-lg">
      {filters.map((typeOfFilter, index) => {
        return <Disclosure key={typeOfFilter}>
          {({ open }) => ( 
            <>
            <Disclosure.Button className="grid grid-rows-1 grid-flow-col items-center text-left py-5 text-[#1B2141] font-bold">
              {typeOfFilter[0].toUpperCase() + typeOfFilter.substring(1)}
              <div className={open ? 'justify-self-end rotate-180 transform' : 'justify-self-end'} >
                <svg width="10" height="6" viewBox="0 0 10 6" fill="#5F647A" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M0.292989 0.293001C0.480517 0.10553 0.734825 0.000214245 0.999989 0.000214268C1.26515 0.000214291 1.51946 0.10553 1.70699 0.293001L4.99999 3.586L8.29299 0.293002C8.48159 0.110844 8.73419 0.0100492 8.99639 0.0123276C9.25859 0.0146059 9.5094 0.119775 9.69481 0.305183C9.88022 0.490591 9.98539 0.741404 9.98766 1.0036C9.98994 1.2658 9.88915 1.5184 9.70699 1.707L5.70699 5.707C5.51946 5.89447 5.26515 5.99979 4.99999 5.99979C4.73482 5.99979 4.48052 5.89447 4.29299 5.707L0.292989 1.707C0.105518 1.51947 0.000202593 1.26516 0.000202616 1C0.000202639 0.734836 0.105518 0.480528 0.292989 0.293001Z" fill="#5F647A"/>
                </svg>
              </div>
            </Disclosure.Button>
            <Disclosure.Panel className="grid grid-cols-1 justify-items-start text-gray-900 text-sm">
              {getButtons(data[typeOfFilter], filterEnglish[index], setFiltersApplied, filtersApplied, setModifiedFilter)}
            </Disclosure.Panel>
            <hr/> 
            </>
            )}
        </Disclosure>
      })}
    </div>
  );
}
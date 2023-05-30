import { Fragment, useState } from 'react'
import { Listbox, Transition } from '@headlessui/react'

export default function Dropdown({label, selectedOption, setSelectedOption, allOptions}) {
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  return (
    <Listbox value={selectedOption} onChange={setSelectedOption}>
        <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">{label}</Listbox.Label>
        <Listbox.Button className="relative z-10 w-full h-10 mt-2 rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm sm:leading-6">
            {selectedOption.name}
        </Listbox.Button>
        <Listbox.Options className="absolute z-20 mt-1 max-h-56 w-[450px] overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {allOptions.map((option) => (
            <Listbox.Option
                key={option.id}
                className={({ active }) =>
                classNames(
                    active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                    'relative cursor-default select-none py-2 pl-3 pr-9'
                )}
                value={option}
            >
                {({ selected, active }) => (
                <>
                    <div className="flex items-center">
                    <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}>
                        {option.name}
                    </span>
                    </div>
                </>)}
            </Listbox.Option>))}
        </Listbox.Options>
    </Listbox>
  )
}
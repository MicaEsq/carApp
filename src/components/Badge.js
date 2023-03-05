

function deleteFilter(data, setFiltersApplied, filtersApplied){
    var newOptions = new Set(filtersApplied)
    newOptions.delete(data)
    setFiltersApplied(newOptions) 
}

export default function CardCuadricula({data, type, setFiltersApplied, filtersApplied}) {
    return(
        <div className={type === 'card-details' ? "text-xs bg-[#EBECF5] text-[#1B2141] rounded-full py-1 px-2 mr-2" : "flex flex-row items-center gap-2 text-sm text-[#566DED] border border-[#566DED] rounded-full py-1 px-2 mr-2"}>
            <p className={type === 'filters-applied' ? "pl-1" : ""}>{data}</p>
            {type === "filters-applied" && 
                <div onClick={() => deleteFilter(data, setFiltersApplied, filtersApplied)}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 cursor-pointer">
                        <path fill-rule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clip-rule="evenodd" />
                    </svg>
                </div>
            }
        </div>
    )
}
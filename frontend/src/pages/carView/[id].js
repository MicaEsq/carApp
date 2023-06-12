import { useState, useEffect } from 'react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import Badge from 'i/components/Badge';
import Carousel from 'i/components/Carousel';
import { modifyFavorites } from 'i/reusableFunctions/modifyFavorites';
import Navbar from 'i/components/Navbar';
import Error404 from 'i/components/Error404';

function CarView() {
  const router = useRouter();
  const [carData, setCarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [varaux, setVarAux] = useState();
  const { id } = router.query;

  useEffect(() => {
    if(id){
      setLoading(true);
      const fetchData = async () => {
        try {
          const response = await fetch(`http://localhost:3001/cars/${id}`, {method: 'GET', headers: { 'Content-Type': 'application/json'}});
          if (response.ok) {
            const data = await response.json();
            setCarData(data);
            setLoading(false);
          } else {
            throw new Error('Error, there was a problem while fetching the cars.');
          }
        } catch (error) {
          setError(error.message);
          setLoading(false);
        } 
      };

      fetchData();
    }
  }, [router.query]);

  function handleDeleteCar(){ 
    setLoading(true);

    let url = 'http://localhost:3001/' + `cars/${id}`;

    var requestOptions = {
        method: 'DELETE',
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
      router.push('/');
      setLoading(false);
    })
    .catch((error) => {
      setError(error.message);
    });
  };

  const handleRedirection =()=>{
    router.push(`/modifyCar/${carData.id}`)
  }

  return (
     <>
    <Navbar></Navbar>
    <p className="mt-10 mx-5 text-sm text-gray-500">
      <a href="/" className="font-semibold leading-6 text-indigo-500 hover:text-indigo-400">
        {'Back to catalogue'}
      </a>
    </p>
    {loading && <div>Lodeanding</div>}
    {carData.length !== 0 ? <div key={carData.id} className="my-5 mx-5 bg-[#ffffff] rounded-lg shadow-md">
      <div className='flex flex-row items-center'>
        <h2 className="text-2xl font-bold leading-9 tracking-tight text-gray-900 p-5">
            {carData.brand.name + ' ' + carData.model.name} - {carData.version}
        </h2>
        <div>
          <svg onClick={handleRedirection} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
          </svg>
        </div>
        <div>
          <svg onClick={handleDeleteCar} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </div>
      </div>
      <div className="grid grid-cols-2  justify-between relative m-2 px-5 pb-5">
        <div className="w-4/5 relative p-5">
          {/* <button className="rounded-full bg-white absolute z-10 top-2 right-2 p-1.5" onClick={() => setFavorites(modifyFavorites(carData, favorites))}>
            {favorites.find(element => element.id === carData.id.toString()) !== undefined ? 
              <svg width="20" height="20" viewBox="1.5 1 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#87899C" d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z"/>
              </svg> : 
              <svg width="20" height="20" viewBox="1.5 1 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="">
                <path fill="#87899C" d="M12 19.7501C11.8012 19.7499 11.6105 19.6708 11.47 19.5301L4.70001 12.7401C3.78387 11.8054 3.27072 10.5488 3.27072 9.24006C3.27072 7.9313 3.78387 6.6747 4.70001 5.74006C5.6283 4.81186 6.88727 4.29042 8.20001 4.29042C9.51274 4.29042 10.7717 4.81186 11.7 5.74006L12 6.00006L12.28 5.72006C12.739 5.25606 13.2857 4.88801 13.8883 4.63736C14.4909 4.3867 15.1374 4.25845 15.79 4.26006C16.442 4.25714 17.088 4.38382 17.6906 4.63274C18.2931 4.88167 18.8402 5.24786 19.3 5.71006C20.2161 6.6447 20.7293 7.9013 20.7293 9.21006C20.7293 10.5188 20.2161 11.7754 19.3 12.7101L12.53 19.5001C12.463 19.5752 12.3815 19.636 12.2904 19.679C12.1994 19.7219 12.1006 19.7461 12 19.7501ZM8.21001 5.75006C7.75584 5.74675 7.30551 5.83342 6.885 6.00505C6.4645 6.17669 6.08215 6.42989 5.76001 6.75006C5.11088 7.40221 4.74646 8.28491 4.74646 9.20506C4.74646 10.1252 5.11088 11.0079 5.76001 11.6601L12 17.9401L18.23 11.6801C18.5526 11.3578 18.8086 10.9751 18.9832 10.5538C19.1578 10.1326 19.2477 9.68107 19.2477 9.22506C19.2477 8.76905 19.1578 8.31752 18.9832 7.89627C18.8086 7.47503 18.5526 7.09233 18.23 6.77006C17.9104 6.44929 17.5299 6.1956 17.1109 6.02387C16.6919 5.85215 16.2428 5.76586 15.79 5.77006C15.3358 5.76675 14.8855 5.85342 14.465 6.02505C14.0445 6.19669 13.6621 6.44989 13.34 6.77006L12.53 7.58006C12.3869 7.71581 12.1972 7.79149 12 7.79149C11.8028 7.79149 11.6131 7.71581 11.47 7.58006L10.66 6.77006C10.3395 6.44628 9.95791 6.18939 9.53733 6.01429C9.11675 5.83919 8.66558 5.74937 8.21001 5.75006Z"/>
              </svg>
            }
          </button> */}
          <Carousel image={carData.image}></Carousel>
        </div>
        <div className="mt-3 pb-3 flex justify-between ">
          <div className="">
            <div className='flex flex-row'>
              <Badge data={carData.year} type={"card-details"}/>
              <Badge data={Number(carData.mileage).toLocaleString('spa') + ' km'} type={"card-details"}/>
            </div>
            <h3 className="text-base text-[#1B2141] font-bold mt-2">
            {carData.brand.name + ' ' + carData.model.name}
            </h3>
            <p className="text-base text-[#1B2141] font-light">{carData.version}</p>
            <p className="text-[22px] text-[#FF7042] mt-2">{"$ " + Number(carData.price).toLocaleString('spa')}</p>
            <div className="flex flex-row items-center"> 
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.94263 12.9333L9.7713 10.1047C10.5171 9.35876 11.0251 8.40845 11.2308 7.3739C11.4366 6.33934 11.331 5.267 10.9273 4.29247C10.5236 3.31795 9.84003 2.48501 8.96297 1.89899C8.08592 1.31297 7.05478 1.00018 5.99996 1.00018C4.94514 1.00018 3.91401 1.31297 3.03695 1.89899C2.15989 2.48501 1.47631 3.31795 1.07263 4.29247C0.668955 5.267 0.563321 6.33934 0.769087 7.3739C0.974852 8.40845 1.48278 9.35876 2.22863 10.1047L5.05796 12.9333C5.18167 13.0571 5.32856 13.1554 5.49026 13.2224C5.65195 13.2894 5.82526 13.3239 6.0003 13.3239C6.17533 13.3239 6.34864 13.2894 6.51033 13.2224C6.67203 13.1554 6.81892 13.0571 6.94263 12.9333Z" stroke="#87899C" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.41418 7.74754C7.78925 7.37246 7.99996 6.86375 7.99996 6.33332C7.99996 5.80289 7.78925 5.29418 7.41418 4.91911C7.0391 4.54404 6.53039 4.33332 5.99996 4.33332C5.46953 4.33332 4.96082 4.54404 4.58575 4.91911C4.21068 5.29418 3.99996 5.80289 3.99996 6.33332C3.99996 6.86375 4.21068 7.37246 4.58575 7.74754C4.96082 8.12261 5.46953 8.33332 5.99996 8.33332C6.53039 8.33332 7.0391 8.12261 7.41418 7.74754Z" stroke="#87899C" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <h5 className="text-sm text-[#87899C] font-light ml-1">{carData.city.name + ', ' + carData.state.name}</h5>
            </div>
            {carData.financing ? <Link href="" className="flex flex-row items-center mt-2 ml-1 text-sm font-bold text-[#566DED]">
              <svg width="15" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path fillRule="evenodd" clipRule="evenodd" d="M0.874969 3.16667C0.874969 1.90101 1.90098 0.875 3.16664 0.875H11.5C12.7656 0.875 13.7916 1.90101 13.7916 3.16667V6.5C13.7916 6.84518 13.5118 7.125 13.1666 7.125C12.8215 7.125 12.5416 6.84518 12.5416 6.5V3.16667C12.5416 2.59137 12.0753 2.125 11.5 2.125H3.16664C2.59134 2.125 2.12497 2.59137 2.12497 3.16667V14.8333C2.12497 15.4086 2.59134 15.875 3.16664 15.875H9.08331C9.42849 15.875 9.70831 16.1548 9.70831 16.5C9.70831 16.8452 9.42849 17.125 9.08331 17.125H3.16664C1.90098 17.125 0.874969 16.099 0.874969 14.8333V3.16667ZM4.20831 4.83333C4.20831 4.48816 4.48813 4.20833 4.83331 4.20833H9.8333C10.1785 4.20833 10.4583 4.48816 10.4583 4.83333C10.4583 5.17851 10.1785 5.45833 9.8333 5.45833H4.83331C4.48813 5.45833 4.20831 5.17851 4.20831 4.83333ZM4.20831 8.16667C4.20831 7.82149 4.48813 7.54167 4.83331 7.54167H4.84164C5.18682 7.54167 5.46664 7.82149 5.46664 8.16667C5.46664 8.51184 5.18682 8.79167 4.84164 8.79167H4.83331C4.48813 8.79167 4.20831 8.51184 4.20831 8.16667ZM6.7083 8.16667C6.7083 7.82149 6.98813 7.54167 7.3333 7.54167H7.34164C7.68682 7.54167 7.96664 7.82149 7.96664 8.16667C7.96664 8.51184 7.68682 8.79167 7.34164 8.79167H7.3333C6.98813 8.79167 6.7083 8.51184 6.7083 8.16667ZM9.2083 8.16667C9.2083 7.82149 9.48812 7.54167 9.8333 7.54167H9.84164C10.1868 7.54167 10.4666 7.82149 10.4666 8.16667C10.4666 8.51184 10.1868 8.79167 9.84164 8.79167H9.8333C9.48812 8.79167 9.2083 8.51184 9.2083 8.16667ZM4.20831 10.6667C4.20831 10.3215 4.48813 10.0417 4.83331 10.0417H4.84164C5.18682 10.0417 5.46664 10.3215 5.46664 10.6667C5.46664 11.0118 5.18682 11.2917 4.84164 11.2917H4.83331C4.48813 11.2917 4.20831 11.0118 4.20831 10.6667ZM6.7083 10.6667C6.7083 10.3215 6.98813 10.0417 7.3333 10.0417H7.34164C7.68682 10.0417 7.96664 10.3215 7.96664 10.6667C7.96664 11.0118 7.68682 11.2917 7.34164 11.2917H7.3333C6.98813 11.2917 6.7083 11.0118 6.7083 10.6667ZM4.20831 13.1667C4.20831 12.8215 4.48813 12.5417 4.83331 12.5417H4.84164C5.18682 12.5417 5.46664 12.8215 5.46664 13.1667C5.46664 13.5118 5.18682 13.7917 4.84164 13.7917H4.83331C4.48813 13.7917 4.20831 13.5118 4.20831 13.1667ZM6.7083 13.1667C6.7083 12.8215 6.98813 12.5417 7.3333 12.5417H7.34164C7.68682 12.5417 7.96664 12.8215 7.96664 13.1667C7.96664 13.5118 7.68682 13.7917 7.34164 13.7917H7.3333C6.98813 13.7917 6.7083 13.5118 6.7083 13.1667Z" fill="#566DED"/>
                <path fillRule="evenodd" clipRule="evenodd" d="M13.0833 8.375C13.4285 8.375 13.7083 8.65482 13.7083 9V9.17434C14.4317 9.29012 15.0847 9.60653 15.5046 10.0903C15.6927 10.307 15.709 10.624 15.5442 10.8589C15.3795 11.0938 15.0759 11.1864 14.8081 11.0833L13.7083 10.6601V12.1741C14.1987 12.2524 14.6508 12.4224 15.021 12.6692C15.54 13.0151 15.9583 13.5617 15.9583 14.25C15.9583 14.9383 15.54 15.4849 15.021 15.8308C14.6508 16.0776 14.1987 16.2476 13.7083 16.3259V16.5C13.7083 16.8452 13.4285 17.125 13.0833 17.125C12.7381 17.125 12.4583 16.8452 12.4583 16.5V16.3257C11.735 16.2099 11.0819 15.8935 10.662 15.4097C10.474 15.193 10.4576 14.876 10.6224 14.6411C10.7871 14.4062 11.0907 14.3136 11.3585 14.4167L12.4583 14.8399V13.3259C11.9679 13.2476 11.5158 13.0776 11.1456 12.8308C10.6266 12.4849 10.2083 11.9383 10.2083 11.25C10.2083 10.5617 10.6266 10.0151 11.1456 9.66917C11.5158 9.42239 11.9679 9.25243 12.4583 9.17411V9C12.4583 8.65482 12.7381 8.375 13.0833 8.375ZM12.4583 10.448C12.2135 10.5077 12.0029 10.6 11.8389 10.7093C11.5436 10.9061 11.4583 11.1095 11.4583 11.25C11.4583 11.3905 11.5436 11.5939 11.8389 11.7907C12.0029 11.9 12.2135 11.9923 12.4583 12.052V10.448ZM13.7083 13.448V15.052C13.9531 14.9923 14.1637 14.9 14.3277 14.7907C14.623 14.5939 14.7083 14.3905 14.7083 14.25C14.7083 14.1095 14.623 13.9061 14.3277 13.7093C14.1637 13.6 13.9531 13.5077 13.7083 13.448Z" fill="#566DED"/>
              </svg>
              Simulate financing</Link> : ''}
          </div>
        </div>
      </div>
    </div> : <div className='flex flex-col justify-center items-center'>
    <Error404 message={`There aren't any cars with id: ${id}`}/>
    <div className='mt-5'>
        <button
          type="submit"
          className="flex justify-center rounded-md bg-indigo-500 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={()=>router.push('/')}
        >
          Go back to catalogue
        </button>
    </div>
    </div>}
    
    </>
  );
}

export default CarView
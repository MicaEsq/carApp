import { useState , useEffect} from 'react';
import Link from 'next/link';
import Badge from 'i/components/Badge';
import { modifyFavorites } from 'i/reusableFunctions/modifyFavorites';
import Carousel from './Carousel';
import { useRouter } from 'next/router';

export default function CardHorizontal({product}) {
  const [favorites, setFavorites] = useState([]);
  const router = useRouter();

  useEffect(() => {
    let keys = Object.keys(sessionStorage);
    
    let dataAux = [];
    for(let key of keys) {
        dataAux.push(JSON.parse(sessionStorage.getItem(key)));
    }
    setFavorites(dataAux);
  }, [])

  return (
    <div key={product.id} className="grid grid-cols-3 my-4 cursor-pointer">
        <div className="col-span-1 relative overflow-hidden">
          <Carousel image={product.image} arrowsConstantVisibility={false}></Carousel>
        </div>
        <div className="col-span-1 pl-5 pt-2 justify-between" onClick={() => router.push(`/carView/${product.id}`)}>
          <div className="">
            <div className='flex flex-row'>
              <Badge data={product.year} type={"card-details"}/>
              <Badge data={Number(product.mileage).toLocaleString('spa') + ' km'} type={"card-details"}/>
            </div>
            <h3 className="text-sm text-[#1B2141] font-bold mt-2">
                {product.brand_name + ' ' + product.model_name}
            </h3>
            <p className="text-sm text-[#1B2141] font-light">{product.version}</p>
            <p className="text-[18px] text-[#FF7042] mt-1">{"$ " + Number(product.price).toLocaleString('spa')}</p>
            <div className="flex flex-row items-center"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#87899C" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <h5 className="text-xs text-[#87899C] font-light ml-1">{product.city_name + ', ' + product.state_name}</h5>
            </div>
            {product.financing ? <Link href="" className="flex flex-row items-center mt-2 ml-1 text-xs font-bold text-[#566DED] gap-1">
                <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M0.833313 2.33333C0.833313 1.32081 1.65412 0.5 2.66665 0.5H9.33331C10.3458 0.5 11.1666 1.32081 11.1666 2.33333V5C11.1666 5.27614 10.9428 5.5 10.6666 5.5C10.3905 5.5 10.1666 5.27614 10.1666 5V2.33333C10.1666 1.8731 9.79355 1.5 9.33331 1.5H2.66665C2.20641 1.5 1.83331 1.8731 1.83331 2.33333V11.6667C1.83331 12.1269 2.20641 12.5 2.66665 12.5H7.39999C7.67613 12.5 7.89999 12.7239 7.89999 13C7.89999 13.2761 7.67613 13.5 7.39999 13.5H2.66665C1.65412 13.5 0.833313 12.6792 0.833313 11.6667V2.33333ZM3.49998 3.66667C3.49998 3.39052 3.72384 3.16667 3.99998 3.16667H7.99998C8.27612 3.16667 8.49998 3.39052 8.49998 3.66667C8.49998 3.94281 8.27612 4.16667 7.99998 4.16667H3.99998C3.72384 4.16667 3.49998 3.94281 3.49998 3.66667ZM3.49998 6.33333C3.49998 6.05719 3.72384 5.83333 3.99998 5.83333H4.00665C4.28279 5.83333 4.50665 6.05719 4.50665 6.33333C4.50665 6.60948 4.28279 6.83333 4.00665 6.83333H3.99998C3.72384 6.83333 3.49998 6.60948 3.49998 6.33333ZM5.49998 6.33333C5.49998 6.05719 5.72384 5.83333 5.99998 5.83333H6.00665C6.28279 5.83333 6.50665 6.05719 6.50665 6.33333C6.50665 6.60948 6.28279 6.83333 6.00665 6.83333H5.99998C5.72384 6.83333 5.49998 6.60948 5.49998 6.33333ZM7.49998 6.33333C7.49998 6.05719 7.72384 5.83333 7.99998 5.83333H8.00665C8.28279 5.83333 8.50665 6.05719 8.50665 6.33333C8.50665 6.60948 8.28279 6.83333 8.00665 6.83333H7.99998C7.72384 6.83333 7.49998 6.60948 7.49998 6.33333ZM3.49998 8.33333C3.49998 8.05719 3.72384 7.83333 3.99998 7.83333H4.00665C4.28279 7.83333 4.50665 8.05719 4.50665 8.33333C4.50665 8.60948 4.28279 8.83333 4.00665 8.83333H3.99998C3.72384 8.83333 3.49998 8.60948 3.49998 8.33333ZM5.49998 8.33333C5.49998 8.05719 5.72384 7.83333 5.99998 7.83333H6.00665C6.28279 7.83333 6.50665 8.05719 6.50665 8.33333C6.50665 8.60948 6.28279 8.83333 6.00665 8.83333H5.99998C5.72384 8.83333 5.49998 8.60948 5.49998 8.33333ZM3.49998 10.3333C3.49998 10.0572 3.72384 9.83333 3.99998 9.83333H4.00665C4.28279 9.83333 4.50665 10.0572 4.50665 10.3333C4.50665 10.6095 4.28279 10.8333 4.00665 10.8333H3.99998C3.72384 10.8333 3.49998 10.6095 3.49998 10.3333ZM5.49998 10.3333C5.49998 10.0572 5.72384 9.83333 5.99998 9.83333H6.00665C6.28279 9.83333 6.50665 10.0572 6.50665 10.3333C6.50665 10.6095 6.28279 10.8333 6.00665 10.8333H5.99998C5.72384 10.8333 5.49998 10.6095 5.49998 10.3333Z" fill="#566DED"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M10.6 6.5C10.8761 6.5 11.1 6.72386 11.1 7V7.13947C11.6787 7.2321 12.2011 7.48523 12.537 7.87227C12.6875 8.04563 12.7005 8.29918 12.5687 8.48711C12.4369 8.67504 12.1941 8.74908 11.9798 8.66665L11.1 8.32812V9.53929C11.4923 9.60195 11.854 9.73791 12.1501 9.93533C12.5653 10.2121 12.9 10.6494 12.9 11.2C12.9 11.7506 12.5653 12.1879 12.1501 12.4647C11.854 12.6621 11.4923 12.7981 11.1 12.8607V13C11.1 13.2761 10.8761 13.5 10.6 13.5C10.3238 13.5 10.1 13.2761 10.1 13V12.8605C9.5213 12.7679 8.99888 12.5148 8.66297 12.1277C8.5125 11.9544 8.49942 11.7008 8.63123 11.5129C8.76304 11.325 9.00589 11.2509 9.22013 11.3334L10.1 11.6719V10.4607C9.70766 10.3981 9.34599 10.2621 9.04983 10.0647C8.63463 9.7879 8.29998 9.35064 8.29998 8.8C8.29998 8.24936 8.63463 7.8121 9.04983 7.53533C9.34599 7.33791 9.70766 7.20195 10.1 7.13929V7C10.1 6.72386 10.3238 6.5 10.6 6.5ZM10.1 8.15842C9.90414 8.2062 9.73564 8.27999 9.60448 8.36741C9.36823 8.5249 9.29998 8.68764 9.29998 8.8C9.29998 8.91236 9.36823 9.0751 9.60448 9.23259C9.73564 9.32001 9.90414 9.3938 10.1 9.44158V8.15842ZM11.1 10.5584V11.8416C11.2958 11.7938 11.4643 11.72 11.5955 11.6326C11.8317 11.4751 11.9 11.3124 11.9 11.2C11.9 11.0876 11.8317 10.9249 11.5955 10.7674C11.4643 10.68 11.2958 10.6062 11.1 10.5584Z" fill="#566DED"/>
                </svg>
                Simulate financing</Link> : ''}
          </div>
        </div>
        <div className="col-span-1">
          <button className="rounded-full bg-white absolute z-10 top-2 right-2 p-1.5 cursor-pointer" onClick={() => setFavorites(modifyFavorites(product.id, favorites))}>
            {favorites.find(element => element.id === product.id.toString()) !== undefined ? 
              <svg width="20" height="20" viewBox="1.5 1 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill="#87899C" d="M19.3 5.71002C18.841 5.24601 18.2943 4.87797 17.6917 4.62731C17.0891 4.37666 16.4426 4.2484 15.79 4.25002C15.1373 4.2484 14.4909 4.37666 13.8883 4.62731C13.2857 4.87797 12.739 5.24601 12.28 5.71002L12 6.00002L11.72 5.72001C10.7917 4.79182 9.53273 4.27037 8.22 4.27037C6.90726 4.27037 5.64829 4.79182 4.72 5.72001C3.80386 6.65466 3.29071 7.91125 3.29071 9.22002C3.29071 10.5288 3.80386 11.7854 4.72 12.72L11.49 19.51C11.6306 19.6505 11.8212 19.7294 12.02 19.7294C12.2187 19.7294 12.4094 19.6505 12.55 19.51L19.32 12.72C20.2365 11.7823 20.7479 10.5221 20.7442 9.21092C20.7405 7.89973 20.2218 6.64248 19.3 5.71002Z"/>
              </svg> : 
              <svg width="20" height="20" viewBox="1.5 1 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="">
                <path fill="#87899C" d="M12 19.7501C11.8012 19.7499 11.6105 19.6708 11.47 19.5301L4.70001 12.7401C3.78387 11.8054 3.27072 10.5488 3.27072 9.24006C3.27072 7.9313 3.78387 6.6747 4.70001 5.74006C5.6283 4.81186 6.88727 4.29042 8.20001 4.29042C9.51274 4.29042 10.7717 4.81186 11.7 5.74006L12 6.00006L12.28 5.72006C12.739 5.25606 13.2857 4.88801 13.8883 4.63736C14.4909 4.3867 15.1374 4.25845 15.79 4.26006C16.442 4.25714 17.088 4.38382 17.6906 4.63274C18.2931 4.88167 18.8402 5.24786 19.3 5.71006C20.2161 6.6447 20.7293 7.9013 20.7293 9.21006C20.7293 10.5188 20.2161 11.7754 19.3 12.7101L12.53 19.5001C12.463 19.5752 12.3815 19.636 12.2904 19.679C12.1994 19.7219 12.1006 19.7461 12 19.7501ZM8.21001 5.75006C7.75584 5.74675 7.30551 5.83342 6.885 6.00505C6.4645 6.17669 6.08215 6.42989 5.76001 6.75006C5.11088 7.40221 4.74646 8.28491 4.74646 9.20506C4.74646 10.1252 5.11088 11.0079 5.76001 11.6601L12 17.9401L18.23 11.6801C18.5526 11.3578 18.8086 10.9751 18.9832 10.5538C19.1578 10.1326 19.2477 9.68107 19.2477 9.22506C19.2477 8.76905 19.1578 8.31752 18.9832 7.89627C18.8086 7.47503 18.5526 7.09233 18.23 6.77006C17.9104 6.44929 17.5299 6.1956 17.1109 6.02387C16.6919 5.85215 16.2428 5.76586 15.79 5.77006C15.3358 5.76675 14.8855 5.85342 14.465 6.02505C14.0445 6.19669 13.6621 6.44989 13.34 6.77006L12.53 7.58006C12.3869 7.71581 12.1972 7.79149 12 7.79149C11.8028 7.79149 11.6131 7.71581 11.47 7.58006L10.66 6.77006C10.3395 6.44628 9.95791 6.18939 9.53733 6.01429C9.11675 5.83919 8.66558 5.74937 8.21001 5.75006Z"/>
              </svg>
            }
          </button>
        </div>
    </div>
  );
}
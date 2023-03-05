import Image from 'next/image';
import Link from 'next/link';
import Badge from 'i/components/Badge';


export default function CardCuadricula({product}) {
  return (
    <div key={product.id} className="my-2 mb-3 bg-[#ffffff] rounded-lg shadow-md">
      <div className="group relative m-2">
        <div className="w-full relative">
          <div className="rounded-full bg-white absolute top-2 right-2 p-1.5 cursor-pointer">
            <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.85 14.55C8.7 14.55 8.55 14.5 8.4 14.35L2.05 7.94997C1.65 7.54997 1.3 7.04997 1.1 6.54997C0.9 6.04997 0.75 5.44997 0.75 4.89997C0.75 4.29997 0.85 3.74997 1.1 3.24997C1.3 2.69997 1.65 2.24997 2.05 1.84997C2.45 1.44997 2.95 1.09997 3.45 0.899974C4.5 0.449974 5.75 0.449974 6.8 0.899974C7.35 1.09997 7.8 1.44997 8.2 1.84997L8.85 2.49997L9.5 1.84997C10.35 0.949974 11.45 0.499974 12.65 0.499974C13.85 0.499974 14.9 0.949974 15.75 1.79997C16.6 2.64997 17.05 3.74997 17.05 4.89997C17.05 6.04997 16.6 7.14997 15.75 7.99997L9.3 14.35C9.2 14.5 9.05 14.55 8.85 14.55ZM2.9 2.64997C2.6 2.94997 2.4 3.29997 2.2 3.64997C2 3.99997 2 4.44997 2 4.89997C2 5.34997 2.1 5.69997 2.25 6.09997C2.4 6.49997 2.65 6.79997 2.95 7.09997L8.9 13.05L14.85 7.09997C15.4 6.49997 15.75 5.69997 15.75 4.89997C15.75 4.09997 15.4 3.29997 14.85 2.69997C14.25 2.09997 13.45 1.79997 12.65 1.79997C11.85 1.79997 11.05 2.09997 10.45 2.69997L9.35 3.79997C9.1 4.04997 8.7 4.04997 8.45 3.79997L7.35 2.69997C7.05 2.39997 6.7 2.19997 6.35 1.99997C5.55 1.64997 4.7 1.64997 3.95 1.99997C3.55 2.14997 3.2 2.34997 2.9 2.64997Z" fill="#87899C"/>
            </svg>
          </div>
          <img
              src={product.image}
              className="rounded-lg block"
              height={"100%"}
              width={"100%"}
              alt={product.brand + ' ' + product.model + ' ' + product.version}
              title={product.brand + ' ' + product.model + ' ' + product.version}
            />
            
        </div>
        <div className="mt-3 pl-2 pb-3 flex justify-between">
          <div className="">
            <div className='flex flex-row'>
              <Badge data={product.year} type={"card-details"}/>
              <Badge data={Number(product.mileage).toLocaleString('spa') + ' km'} type={"card-details"}/>
            </div>
            <h3 className="text-base text-[#1B2141] font-bold mt-2">
                {product.brand + ' ' + product.model}
            </h3>
            <p className="text-base text-[#1B2141] font-light">{product.version}</p>
            <p className="text-[22px] text-[#FF7042] mt-2">{"R$ " + Number(product.price).toLocaleString('spa')}</p>
            <div className="flex flex-row items-center"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#87899C" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
              </svg>
              <h5 className="text-sm text-[#87899C] font-light ml-1">{product.city + ', ' + product.state}</h5>
            </div>
            {product.financing ? <Link href="" className="flex flex-row items-center mt-2 ml-1 text-sm font-bold text-[#566DED]">
              <svg width="15" height="16" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-1">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M0.874969 3.16667C0.874969 1.90101 1.90098 0.875 3.16664 0.875H11.5C12.7656 0.875 13.7916 1.90101 13.7916 3.16667V6.5C13.7916 6.84518 13.5118 7.125 13.1666 7.125C12.8215 7.125 12.5416 6.84518 12.5416 6.5V3.16667C12.5416 2.59137 12.0753 2.125 11.5 2.125H3.16664C2.59134 2.125 2.12497 2.59137 2.12497 3.16667V14.8333C2.12497 15.4086 2.59134 15.875 3.16664 15.875H9.08331C9.42849 15.875 9.70831 16.1548 9.70831 16.5C9.70831 16.8452 9.42849 17.125 9.08331 17.125H3.16664C1.90098 17.125 0.874969 16.099 0.874969 14.8333V3.16667ZM4.20831 4.83333C4.20831 4.48816 4.48813 4.20833 4.83331 4.20833H9.8333C10.1785 4.20833 10.4583 4.48816 10.4583 4.83333C10.4583 5.17851 10.1785 5.45833 9.8333 5.45833H4.83331C4.48813 5.45833 4.20831 5.17851 4.20831 4.83333ZM4.20831 8.16667C4.20831 7.82149 4.48813 7.54167 4.83331 7.54167H4.84164C5.18682 7.54167 5.46664 7.82149 5.46664 8.16667C5.46664 8.51184 5.18682 8.79167 4.84164 8.79167H4.83331C4.48813 8.79167 4.20831 8.51184 4.20831 8.16667ZM6.7083 8.16667C6.7083 7.82149 6.98813 7.54167 7.3333 7.54167H7.34164C7.68682 7.54167 7.96664 7.82149 7.96664 8.16667C7.96664 8.51184 7.68682 8.79167 7.34164 8.79167H7.3333C6.98813 8.79167 6.7083 8.51184 6.7083 8.16667ZM9.2083 8.16667C9.2083 7.82149 9.48812 7.54167 9.8333 7.54167H9.84164C10.1868 7.54167 10.4666 7.82149 10.4666 8.16667C10.4666 8.51184 10.1868 8.79167 9.84164 8.79167H9.8333C9.48812 8.79167 9.2083 8.51184 9.2083 8.16667ZM4.20831 10.6667C4.20831 10.3215 4.48813 10.0417 4.83331 10.0417H4.84164C5.18682 10.0417 5.46664 10.3215 5.46664 10.6667C5.46664 11.0118 5.18682 11.2917 4.84164 11.2917H4.83331C4.48813 11.2917 4.20831 11.0118 4.20831 10.6667ZM6.7083 10.6667C6.7083 10.3215 6.98813 10.0417 7.3333 10.0417H7.34164C7.68682 10.0417 7.96664 10.3215 7.96664 10.6667C7.96664 11.0118 7.68682 11.2917 7.34164 11.2917H7.3333C6.98813 11.2917 6.7083 11.0118 6.7083 10.6667ZM4.20831 13.1667C4.20831 12.8215 4.48813 12.5417 4.83331 12.5417H4.84164C5.18682 12.5417 5.46664 12.8215 5.46664 13.1667C5.46664 13.5118 5.18682 13.7917 4.84164 13.7917H4.83331C4.48813 13.7917 4.20831 13.5118 4.20831 13.1667ZM6.7083 13.1667C6.7083 12.8215 6.98813 12.5417 7.3333 12.5417H7.34164C7.68682 12.5417 7.96664 12.8215 7.96664 13.1667C7.96664 13.5118 7.68682 13.7917 7.34164 13.7917H7.3333C6.98813 13.7917 6.7083 13.5118 6.7083 13.1667Z" fill="#566DED"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13.0833 8.375C13.4285 8.375 13.7083 8.65482 13.7083 9V9.17434C14.4317 9.29012 15.0847 9.60653 15.5046 10.0903C15.6927 10.307 15.709 10.624 15.5442 10.8589C15.3795 11.0938 15.0759 11.1864 14.8081 11.0833L13.7083 10.6601V12.1741C14.1987 12.2524 14.6508 12.4224 15.021 12.6692C15.54 13.0151 15.9583 13.5617 15.9583 14.25C15.9583 14.9383 15.54 15.4849 15.021 15.8308C14.6508 16.0776 14.1987 16.2476 13.7083 16.3259V16.5C13.7083 16.8452 13.4285 17.125 13.0833 17.125C12.7381 17.125 12.4583 16.8452 12.4583 16.5V16.3257C11.735 16.2099 11.0819 15.8935 10.662 15.4097C10.474 15.193 10.4576 14.876 10.6224 14.6411C10.7871 14.4062 11.0907 14.3136 11.3585 14.4167L12.4583 14.8399V13.3259C11.9679 13.2476 11.5158 13.0776 11.1456 12.8308C10.6266 12.4849 10.2083 11.9383 10.2083 11.25C10.2083 10.5617 10.6266 10.0151 11.1456 9.66917C11.5158 9.42239 11.9679 9.25243 12.4583 9.17411V9C12.4583 8.65482 12.7381 8.375 13.0833 8.375ZM12.4583 10.448C12.2135 10.5077 12.0029 10.6 11.8389 10.7093C11.5436 10.9061 11.4583 11.1095 11.4583 11.25C11.4583 11.3905 11.5436 11.5939 11.8389 11.7907C12.0029 11.9 12.2135 11.9923 12.4583 12.052V10.448ZM13.7083 13.448V15.052C13.9531 14.9923 14.1637 14.9 14.3277 14.7907C14.623 14.5939 14.7083 14.3905 14.7083 14.25C14.7083 14.1095 14.623 13.9061 14.3277 13.7093C14.1637 13.6 13.9531 13.5077 13.7083 13.448Z" fill="#566DED"/>
              </svg>
              Simular parcelas</Link> : ''}
          </div>
        </div>
      </div>
    </div>
  );
}
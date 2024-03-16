import Image from "next/image"; 

export default function Home() {
  return (
    <main className='h-screen w-screen text-lg sm:text-lg md:text-lg lg:text-xl xl:text-2xl relative'>
      <header className='text-center flex items-center justify-center w-full font-bold p-2 text-4xl mt-20 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl'>
        <h1 className='text-3xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-5'>
          PraFazê
        </h1>
        <svg 
          width="50px" 
          height="50px" 
          viewBox="0 -2 16 16" 
          className="sm:ml-1 md:ml-2 lg:ml-3 xl:ml-5
          scale-75 sm:scale-90 md:scale-110 lg:scale-150 xl:scale-150"
          fill="black"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path fill="#000000" fill-rule="evenodd" d="M4,4 L9,4 C9.55228,4 10,3.55228 10,3 C10,2.44772 9.55228,2 9,2 L4,2 C2.89543,2 2,2.89543 2,4 L2,12 C2,13.1046 2.89543,14 4,14 L12,14 C13.1046,14 14,13.1046 14,12 L14,10 C14,9.44771 13.5523,9 13,9 C12.4477,9 12,9.44771 12,10 L12,12 L4,12 L4,4 Z M15.2071,2.29289 C14.8166,1.90237 14.1834,1.90237 13.7929,2.29289 L8.5,7.58579 L7.70711,6.79289 C7.31658,6.40237 6.68342,6.40237 6.29289,6.79289 C5.90237,7.18342 5.90237,7.81658 6.29289,8.20711 L7.79289,9.70711 C7.98043,9.89464 8.23478,10 8.5,10 C8.76522,10 9.01957,9.89464 9.20711,9.70711 L15.2071,3.70711 C15.5976,3.31658 15.5976,2.68342 15.2071,2.29289 Z"/>
        </svg>
      </header>
      <main className="m-auto w-1/2 flex border-2 pt-2 rounded-xl flex-col mb-10">
        <section className="text-justify w-full items-center border-2 p-1 px-2 flex-grow flex-row ">
          <div className="w-full">
            <input type="text" />
            <button className="border-2 p-1 m-2 ml-1">
              Add
            </button>
          </div>
        </section>
      </main>
    </main>
  );
}
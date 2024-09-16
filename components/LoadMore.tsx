"use client"
import { fetchAnime } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
export type AnimeCard=JSX.Element
function LoadMore() {
  const { ref, inView } = useInView({})
  const [page,setPage]=useState(2)
  const [data,setData]=useState<AnimeCard[]>([])
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (inView) {
      timeoutId = setTimeout(() => {
        fetchAnime(page)
          .then((res) => setData([...data, ...res]))
          .catch((error) => console.error(error));
        
        setPage(page + 1);
        console.log('test');
      }, 200)
    }
  
    return () => clearTimeout(timeoutId);
  }, [inView,data])
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  return (
    <>
     <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
    {data}
  </section>

      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          <Image
            src="./spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      </section>
    </>
  );
}

export default LoadMore;

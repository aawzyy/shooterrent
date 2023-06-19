import React, { useState, useEffect } from 'react'
import IndexNavbar from '../components/Navbars/IndexNavbar'

import { BsChevronCompactLeft, BsChevronCompactRight } from 'react-icons/bs';
import { AiOutlineLeftCircle, AiOutlineRightCircle } from "react-icons/ai";
import { getCorousel } from '../services/enpoint/auth';
import useGeoLocation from '../hooks/useGeolocation';

const HomePage = () => {
    const location = useGeoLocation()
    const [Corousel, setCorousel] = useState([])

    const [currentIndex, setCurrentIndex] = React.useState(0);

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? Corousel.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === Corousel.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex);
    };

    useEffect(() => {
        getCorousel()
        .then((result) => {
            const resp = result.data
            let arrayImage = []
            for (let i = 0; i < resp.length; i++) {
                const element = resp[i];
                arrayImage.push({
                    url : element?.image?.src
                })
            }
            setCorousel(arrayImage)
        }).catch((err) => {
            console.log(err);
        });
    }, [])

    console.log(Corousel);

    return (
        <>
            <IndexNavbar fixed />
            <section className='header relative pb-24 pt-16 items-center flex h-screen max-h-860-px'>
                <div className='max-w-[1400px] h-[780px] w-full m-auto py-16 px-4 relative group'>
                    <div class="flex flex-wrap justify-center rounded items-center">
                        {/* Left Arrow */}
                        <div className=''>
                            <AiOutlineLeftCircle onClick={prevSlide} size={40} color='#0EA5E9' />
                        </div>
                        <div class="w-full lg:w-6/12 px-6" style={{height : 500, alignContent:"center"}}>
                            <img src={Corousel[currentIndex]?.url} alt="..." className='rounded max-h-full w-full' style={{width: "auto", height: "100%"}}/>
                        </div>
                        {/* Right Arrow */}
                        <div className=''>
                            <AiOutlineRightCircle onClick={nextSlide} size={40} color='#0EA5E9' />
                        </div>
                    </div>
                    
                    {/* className='hidden group-hover:block absolute top-[50%] -translate-x-0 translate-y-[-50%] right-5 text-2xl rounded-full p-2 bg-black/20 text-white cursor-pointer' */}
                    <div className='flex top-4 justify-center py-2 mt-4'>
                        <ul class="flex pl-0 rounded list-none flex-wrap">
                            {Corousel.map((slide, slideIndex) => (
                                <li>
                                    <a onClick={() => goToSlide(slideIndex)} href="#pablo" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-pink-500 bg-white text-pink-500">
                                        {slideIndex + 1}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HomePage
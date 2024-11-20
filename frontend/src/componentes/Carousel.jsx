import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay,} from 'swiper/modules';
import 'swiper/swiper-bundle.css';
import './Carousel.css'
// poner en la terminar
// npm install swiper

// para tener mejor obtimizadas las imagenes del carusel
// deben de ser imagenes en 1600 x350px
// el contenido tiene que estar bien centrado así evitamos
// que se pierda el contenido importante

// tengo que hacer que tome las imagenes de una carpeta especifica
//(probablemente "/public/noticias/" y dejar una cantidad especifica)
// proximamente hacer que no tenga limitacion de cantidad

const Carousel = () => {
  
  return (
    <Swiper
      className='swiperR'
      modules={[Navigation, Pagination, Autoplay]}
      spaceBetween={0} 
      slidesPerView={1} 
      navigation 
      pagination={{ clickable: true, dynamicBullets: true, }} 
      loop={true} 
      autoplay={{ delay : 5000}}
    >
      <SwiperSlide>
        <img className='imgCR' src="https://http2.mlstatic.com/D_NQ_782850-MLA80692086387_112024-OO.webp/" alt="Slide 1" />
      </SwiperSlide>
      <SwiperSlide>
        <img className='imgCR' src="https://http2.mlstatic.com/D_NQ_875512-MLA80367743746_112024-OO.webp" alt="Slide 2" />
      </SwiperSlide>
      <SwiperSlide>
        <img className='imgCR' src="https://http2.mlstatic.com/D_NQ_927293-MLA80332625178_112024-OO.webp" alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img className='imgCR' src="https://http2.mlstatic.com/D_NQ_601593-MLA80388683188_112024-OO.webp" alt="Slide 3" />
      </SwiperSlide>
      <SwiperSlide>
        <img className='imgCR' src="https://http2.mlstatic.com/D_NQ_778913-MLA80717485897_112024-OO.webp" alt="Slide 3" />
      </SwiperSlide>
    </Swiper>
  );
};


export default Carousel;
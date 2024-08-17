// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// Import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Import images
import ban1 from '../../assets/images/Banner/10242390.jpg';
import ban2 from '../../assets/images/Banner/black_friday_facebook_banner_05.jpg';
import ban3 from '../../assets/images/Banner/87833912_Black-Friday_web_banner_20.jpg';
import ban4 from '../../assets/images/Banner/10242390.jpg';

export default function Carousel() {
    return (
        <div className='border lg:h-[500px] h-[300px] flex items-center justify-center'>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}

                autoplay={{
                    delay: 4500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper w-full h-full"
            >
                <SwiperSlide className="flex items-center justify-center">
                    <img className="object-cover w-full h-full" src={ban1} alt="Banner 1" />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                    <img className="object-cover w-full h-full" src={ban2} alt="Banner 2" />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                    <img className="object-cover w-full h-full" src={ban3} alt="Banner 3" />
                </SwiperSlide>
                <SwiperSlide className="flex items-center justify-center">
                    <img className="object-cover w-full h-full" src={ban4} alt="Banner 4" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

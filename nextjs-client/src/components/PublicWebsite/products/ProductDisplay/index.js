import { makeStyles } from '@mui/styles';
import DisplayCard from './DisplayCard';
import productService from '../../../../services/product';
import { useTranslation } from 'react-i18next';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import './styles.css'


const useStyles = makeStyles({
    productContainer: {
        backgroundColor: 'white',
        padding: '3rem 0'
    },
    productCard: {
        width: '20rem',
        height: '30rem',
        margin: '30px',
    },
    productImage: {
        height: '15rem'
    },
    productTitle: {
        fontWeight: 'bold'
    },
    productButton: {
        marginTop: '1rem'
    },
    Deck: {
        transition: 'transform 0.3s ease',
    },
    DeckSelected: {
        transform: 'scale(1)',
    },
    DeckUnselected: {
        transform: 'scale(0.3)',
    },

    swiperFixedWidth300: {
        width: '300px',
    },
});

export async function getServerSideProps(context) {
    // const { id } = context.query;
    id = null
    const similarProducts = await productService.similarProducts(id, i18n.language)
    return {
      props: {
        products,
      },
    };
  }

const ProductDisplay = ({
    products
}) => {
    const classes = useStyles();
    const { i18n } = useTranslation();
    return (
        <>
            {/* <animated.div {...bind()} style={{transform}}>
                        <ProductCardTest />
                </animated.div> */}
            <Swiper
                // install Swiper modules
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={50}
                slidesPerView={3}
                style={{
                    padding: '30px'
                }}
                breakpoints={{
                    // when window width is >= 0px
                    0: {
                        slidesPerView: 1
                    },
                    // when window width is >= 640px
                    640: {
                        slidesPerView: 2
                    },
                    //when window width is >= 1100px
                    1100: {
                        slidesPerView: 3
                    }
                }}
                loop={true}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={{
                    el: '.swiper-pagination',
                    clickable: true,

                }}
                onSwiper={(swiper) => console.log(swiper)}
                onSlideChange={() => console.log('slide change')}
            >
                {products.map((product, index) => (
                    <SwiperSlide className="swiperFixedWidth300" key={index}>
                        <DisplayCard product={product} />
                    </SwiperSlide>
                ))}
                {/* <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide>
                <SwiperSlide className="swiperFixedWidth300">
                    <ProductCardTest />
                </SwiperSlide> */}
            </Swiper>
            <div className='swiper-button-container'>
                <div className="icon-arrow-long-right swiper-button-next"></div>
                <div className="icon-arrow-long-left swiper-button-prev"></div>
            </div>
            <div className='swiper-pagination swiper-pagination-clickable swiper-pagination-bullets swiper-pagination-horizontal'></div>
        </>
    );
};

export default ProductDisplay;
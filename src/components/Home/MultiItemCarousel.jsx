import React, { Component } from 'react'
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { topMeals } from './topMeals';
import { CarouselItem } from './CarouselItem';

const responsive= [
  {
    breakpoint: 1024,
    settings: {
      slidesToShow: 5,
      
    }
  },
  {
    breakpoint: 900,
    settings: {
      slidesToShow: 3,
    }
  },
  {
    breakpoint: 600,
    settings: {
      slidesToShow: 2,
    }
  },
  {
    breakpoint: 480,
    settings: {
      slidesToShow: 1,
      
    }
  }
]

export default class MultiItemCarousel extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2000,
      pauseOnHover: true,
      arrows: false,
      responsive
      
    };
    return (
      <div>
        <Slider {...settings}>
            {topMeals.map((item)=><CarouselItem item = {item} image={item.image} title={item.title}/>)}
        </Slider>
      </div>
    );
  }
}
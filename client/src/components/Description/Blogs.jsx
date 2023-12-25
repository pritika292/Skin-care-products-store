import React from 'react';
import Slider from 'react-slick';
import './MyBlogCarousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const BlogSlide = ({ imageUrl, title, description, blogUrl }) => (
  <div className="blog-slide">
    <img className="blog-image" src={imageUrl} alt={title} />
    <div className="blog-text">
      <h2>{title}</h2>
      <p>{description}</p>
      <a href={blogUrl} target="_blank" rel="noopener noreferrer">
        Read More
      </a>
    </div>
  </div>
);

const Blogs = () => {
  const data = [
    {
      imageUrl: '/Images/blog1.jpg',
      title: 'New Serums to Try!',
      description: 'Discover the best serums in the skincare world, all reviewed just for you. Click to check out the list.',
      blogUrl: 'https://www.totalbeauty.com/content/slideshows/brightening-eye-serums-230706',
    },
    {
      imageUrl: '/Images/blog2.jpg',
      title: 'Your Holiday Gift Guide!',
      description: 'Gift yourself and your loved ones these popular products. Click here to check them out.',
      blogUrl: 'https://www.totalbeauty.com/content/slideshows/holiday-gift-guide-2023-231106',
    },
    {
      imageUrl: '/Images/blog3.jpg',
      title: 'Treat Acne Scars with These Products!',
      description: 'Make those scars disappear! Click here to know how.',
      blogUrl: 'https://www.totalbeauty.com/content/slideshows/scar-care-products-231120',
    },
    {
      imageUrl: '/Images/blog4.jpg',
      title: 'Best Face Moisturizers!',
      description: 'Find the best face moisturizers here. Click to know more.',
      blogUrl: 'https://www.totalbeauty.com/review/the-best-face-moisturizers/',
    },
    {
      imageUrl: '/Images/blog5.jpg',
      title: 'Try These Eye Serums!',
      description: 'Say goodbye to those dark circles and pigmentation. Click here to know more.',
      blogUrl: 'https://www.totalbeauty.com/content/slideshows/brightening-eye-serums-230706',
    },
    {
      imageUrl: '/Images/blog6.jpg',
      title: 'New Products to Try in Dec 2023!',
      description: 'Explore the hottest end-of-year skincare trends. Click here to know more.',
      blogUrl: 'https://www.totalbeauty.com/content/slideshows/new-products-october-2023-231002',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="blog-main-container">
    <h1 className='blog-main-title'>Explore these blogs to find the latest trends!</h1>
      <div style={{ height: 100 }} />
      <Slider {...settings}>
        {data.map((item, index) => (
          <BlogSlide key={index} {...item} />
        ))}
      </Slider>
      <div style={{ height: 100 }} />
    </div>
  );
};

export default Blogs;
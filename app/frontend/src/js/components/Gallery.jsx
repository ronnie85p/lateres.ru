import React, { useState } from "react";
import Image from "react-bootstrap/Image";
import Carousel from "better-react-carousel";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "./Gallery/styles.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const defaultCarouselProps = {
  cols: 1,
  rows: 1,
  gap: 10,
  showDots: true,
  containerStyle: {},
  hideArrow: false,
  // dotColorActive: '',
  // dotColorInactive: '',
  // responsiveLayout: [],
  // mobileBreakpoint: 767,
  // arrowLeft: null,
  // arrowRight: null,
  // dot: null,
  // loop: false,
};

const defaultGalleryProps = {
  animation: { swipe: 0 },
  carousel: { preload: 10 },
  plugins: [Thumbnails],
  thumbnails: {
    position: "start",
    width: 120,
    height: 80,
    border: 0,
    borderRadius: 10,
    padding: 0,
    gap: 16,
  },
};

const defaultImageProps = {
  rounded: true,
};

const Gallery = (props) => {
  const [open, setOpen] = useState(false);

  const {
    carouselProps = {},
    galleryProps = {},
    imageProps = {},
    images = [],
    onImageClick = () => {},
  } = props;

  const handleCarouselItemClick = (event) => {
    setOpen(true);
    onImageClick(event);
  };

  const getSlides = () => {
    const slides = [];

    for (let im of images) {
      slides.push({
        src: im.url,
        alt: im.name,
        width: im.width || 3840,
        height: im.height || 2560,
        srcSet: [{ src: im.url, width: 320, height: 213 }],
      });
    }

    return slides;
  };

  return (
    <>
      <Carousel {...defaultCarouselProps} {...carouselProps}>
        {images.map((im) => (
          <Carousel.Item key={im.id}>
            <Image
              {...defaultImageProps}
              {...imageProps}
              src={im.url}
              onClick={(event) => handleCarouselItemClick(event, im)}
            />
          </Carousel.Item>
        ))}
      </Carousel>

      <Lightbox
        {...defaultGalleryProps}
        {...galleryProps}
        open={open}
        close={() => setOpen(false)}
        slides={getSlides()}
      />
    </>
  );
};

export default Gallery;


import React from 'react'
import Carousel from 'react-bootstrap/Carousel';

export default function HeaderSection() {

  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://st4.depositphotos.com/35003014/40970/i/450/depositphotos_409704886-stock-photo-three-bottles-men-perfume-background.jpg" height={650}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://img.freepik.com/premium-photo/mockup-design-perfume-bottle-with-plant-branch-empty-blank-copy-space-wallpaper-bottle-essential-oil-with-herbs-elegant-minimalistic-podium-scene-product-presentation_146482-9328.jpg" height={650}
          alt="Second slide"
        />

      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://res.cloudinary.com/zinodavidoff/image/upload/v1654769222/2022-06/DAV_CW_REB_22_CPV_CW_M_InStore_16-9.jpg" height={650}
          alt="Third slide"
        />

      </Carousel.Item>
    </Carousel>
  )
}
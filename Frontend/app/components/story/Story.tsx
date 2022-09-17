import React from "react";
import { storys } from "../utils/storys";
import Image from "next/image";
// import Swiper core and required modules
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

const Story = () => {
  return (
    <section id="story">
      <h5>About</h5>
      <h2>me</h2>

      <Swiper
        className="container story__container"
        spaceBetween={40}
        slidesPerView={1}
        pagination={{
          type: "bullets",
        }}
        modules={[Pagination]}
      >
        {storys.map((v) => {
          return (
            <SwiperSlide key={v.id} className="story">
              <div className="avatar">
                <Image
                  src={v.href}
                  alt={v.title}
                  width="64px"
                  height="64"
                ></Image>
              </div>
              <h5>{v.title}</h5>
              <small className="story__review">{v.text}</small>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Story;

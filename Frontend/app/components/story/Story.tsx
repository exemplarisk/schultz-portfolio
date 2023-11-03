import React from "react";
import { storys } from "./data/storys";
import { linkifyText } from "../../utils/linkifyText"
import Image from "next/image";
import { Pagination } from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/pagination";

const links: { [key: string]: string } = {
  array:
    "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array"
};

const Story = () => {
  return (
    <section id="story">
      <h5>More facts</h5>
      <h2>about me</h2>

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
              <small className="story__review">
                {linkifyText({ text: v.text, links })}
              </small>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Story;

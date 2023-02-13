import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

require("./Slides.css");

export default function App(props) {
	console.log(props.businesses);
	return (
		<>
			<Swiper
				slidesPerView={2}
				spaceBetween={30}
				pagination={{
					clickable: true,
				}}
				modules={[Pagination]}
				className="mySwiper"
			>
				{props.businesses.map((el) => {
					return (
						<SwiperSlide>
							<div className="slide">
								<p>{el.name}</p>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</>
	);
}

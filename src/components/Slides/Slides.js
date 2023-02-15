import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Pagination } from "swiper";

require("./Slides.css");

export default function App(props) {
	const navigate = useNavigate();

	const viewBusiness = (id) => {
		navigate(`/business/${id}`);
	};

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
								<div
									className="image"
									style={{ backgroundImage: "url(" + el.image_url + ")" }}
								></div>
								<div className="slide-content">
									<p>{el.name}</p>

									<div className="card-rating-price">
										<p>⭐⭐⭐⭐</p>
										<p>•</p>
										<p>{el.price ? el.price : "$"}</p>
									</div>

									<button onClick={() => viewBusiness(el.id)}>
										View Details
									</button>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</>
	);
}

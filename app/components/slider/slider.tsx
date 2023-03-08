
import React from "react";

// @ts-ignore
import Slider from "react-slick";

const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 3000,
    cssEase: "linear",
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                autoplay: true,
                speed: 2000,
                autoplaySpeed: 2000,
                cssEase: "linear",
                dots: false,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                arrow: false,
                initialSlide: 1,
                autoplay: true,
                speed: 2000,
                autoplaySpeed: 2000,
                cssEase: "linear",
                dots: false,
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                speed: 2000,
                autoplaySpeed: 4000,
                cssEase: "linear",
                dots: false,
            }
        }
    ]
};


const OwlSlider = () => {
    function NextArrow(props:any) {
        const { className, style } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    right: 0,
                    backgroundImage:"linear-gradient(270deg, #fff, #fff 31%, hsla(0, 0%, 100%, 0))",
                    top:0,
                    zIndex:100,
                    width: "100px",
                    height: "100px",
                }}
            >
                <span style={{ width: 100, height: 100 }}>&lt;</span>
            </div>
        );
    }

    function PrevArrow(props:any) {
        const { className, style, onClick } = props;
        return (
            <div
                className={className}
                style={{
                    ...style,
                    backgroundImage:"linear-gradient(89deg, #fff, #fff 31%, hsla(0, 0%, 100%, 0));",
                    left: 0,
                    top:0,
                    zIndex:100,
                    width: "100px",
                    height: "100px",
                }}
            />
        );
    }
    return (
        <div>
            <div className="container-slider overflow-hidden border">
                <Slider  nextArrow={<NextArrow />}
                         prevArrow={<PrevArrow />}
                         {...settings}>
                    <div className={"mx-8 "}>
                        <img src="/images/636dd759d712872b6c7e62ad_g3707.svg"  alt={"slider"}/>
                    </div>
                    <div>
                        <img src="/images/636dd759d71287f1797e6321_Vector-4.svg" alt={"slider"} />
                    </div>
                    <div>
                        <img src="/images/636dd759d712872b6c7e62ad_g3707.svg"  alt={"slider"}/>
                    </div>
                    <div>
                        <img src="/images/636dd759d71287f1797e6321_Vector-4.svg" />
                    </div>
                    <div>
                        <img src="/images/636dd759d712872b6c7e62ad_g3707.svg"  alt={"slider"}/>
                    </div>
                    <div>
                        <img src="/images/636dd759d71287f1797e6321_Vector-4.svg" alt={"slider"} />
                    </div>
                    <div>
                        <img src="/images/636dd759d712872b6c7e62ad_g3707.svg"  alt={"slider"}/>
                    </div>
                    <div>
                        <img src="/images/636dd759d71287f1797e6321_Vector-4.svg" alt={"slider"} />
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default OwlSlider;
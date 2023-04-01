import KayaTalent from "@/app/components/HomePage/KayaTalent";
import LoginSignUP from "@/app/components/HomePage/LoginSignUP";
import Figures from "@/app/components/HomePage/figures";
import ScrollSilder from "@/app/utils/slider/slider";
import JobSeeker from "@/app/components/HomePage/JobSeeker";
import NeedTalent from "@/app/components/HomePage/NeedTalent";
import Ourusers from "@/app/components/HomePage/ourusers";
import GetFeatured from "@/app/components/HomePage/GetFeatured";
import BlogPost from "@/app/components/HomePage/blogPost";
import Footer from "@/app/shared/footer/footer";
import React, {useEffect, useState} from "react";
import BannerTop from "@/app/shared/banner-content";
import Heading from "@/app/shared/Heading";
import Header from "@/app/shared/NavBar";
import {DotLoader} from "react-spinners";


export default function Home() {

    const [loading, setloading] = useState(true)
    useEffect(() => {
        setTimeout(() => setloading(false), 1000)
    }, [])
    if (loading) return <div
        className={"backdrop-blur-xl   h-screen flex items-center justify-center"}>
        <Heading page={"خانه"} titlesite={" کایا"}/>
        <div className={"flex flex-col items-center justify-center "}>
            <DotLoader
                color="#36d7b7"
                size={150}
            />
        </div>
    </div>

    return (
        <>
            <Heading page={"صفحه اصلی"} titlesite={" کایا"}/>
            <div data-aos="fade-up">
                <div className={"hidden md:block"}>
                    <BannerTop title={" عصر جدیدی در راه است"}/>
                </div>
                <Header/>
                <div className={"pt-32 md:pt-0"}>
                    <KayaTalent/>

                </div>
                <LoginSignUP/>
                <Figures/>
                <ScrollSilder/>
                <JobSeeker/>
                <NeedTalent/>
                <Ourusers/>
                <GetFeatured/>
                <BlogPost/>
                <Footer/>
            </div>
        </>
    )
}

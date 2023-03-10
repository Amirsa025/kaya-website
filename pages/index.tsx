import Head from 'next/head'
import { Inter } from 'next/font/google'
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
import Header from "@/app/shared/NavBar";
import React from "react";
import BannerTop from "@/app/components/banner-content";
import Heading from "@/app/components/Heading";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
        <Heading page={"صفحه اصلی"} titlesite={" کایا"}/>
      <div>
          <BannerTop/>
          <Header/>
          <KayaTalent/>
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

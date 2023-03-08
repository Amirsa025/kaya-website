import Head from 'next/head'
import { Inter } from 'next/font/google'
import KayaTalent from "@/app/components/HomePage/KayaTalent";
import LoginSignUP from "@/app/components/HomePage/LoginSignUP";
import Figures from "@/app/components/HomePage/figures";
import ScrollSilder from "@/app/components/slider/slider";
import JobSeeker from "@/app/components/HomePage/JobSeeker";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Kaya | Home page</title>
        <meta charSet="UTF-8"/>
        <meta name="description" content="Kaya app"  />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
            <KayaTalent/>
            <LoginSignUP/>
            <Figures/>
            <ScrollSilder/>
            <JobSeeker/>
      </div>
    </>
  )
}

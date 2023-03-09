import Head from 'next/head'
import { Inter } from 'next/font/google'
import KayaTalent from "@/app/components/HomePage/KayaTalent";
import LoginSignUP from "@/app/components/HomePage/LoginSignUP";
import Figures from "@/app/components/HomePage/figures";
import ScrollSilder from "@/app/utils/slider/slider";
import JobSeeker from "@/app/components/HomePage/JobSeeker";
import NeedTalent from "@/app/components/HomePage/NeedTalent";
import Ourusers from "@/app/components/HomePage/ourusers";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>کایا | صفحه اصلی</title>
        <meta charSet="UTF-8"/>
        <meta name="description" content="Kaya app"  />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Asset.png" />
      </Head>
      <div>
            <KayaTalent/>
            <LoginSignUP/>
            <Figures/>
            <ScrollSilder/>
            <JobSeeker/>
          <NeedTalent/>
          <Ourusers/>
      </div>
    </>
  )
}

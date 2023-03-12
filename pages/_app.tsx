'use client'
import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/app/components/layout/Container";
import 'remixicon/fonts/remixicon.css'
import {ReactElement, ReactNode} from "react";
import {NextPage} from "next";
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
export default function App({ Component, pageProps }: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)
    return getLayout( <Container><Component {...pageProps} /></Container>)
}

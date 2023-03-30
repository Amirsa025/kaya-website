'use client'
import '@/styles/globals.css'

import type {AppProps} from 'next/app'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/app/components/layout/Container";
import 'remixicon/fonts/remixicon.css'
import React, {ReactElement, ReactNode, useEffect} from "react";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {NextPage} from "next";
import {
    Hydrate,
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}
type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}
export default function App({Component, pageProps}: AppPropsWithLayout) {
    const getLayout = Component.getLayout ?? ((page) => page)

    const [queryClient] = React.useState(() => new QueryClient())
    return getLayout(
        <Container >
            <QueryClientProvider client={queryClient}>
                <Hydrate state={pageProps.dehydratedState}>
                    <Component {...pageProps} />
                    <ToastContainer
                        bodyClassName="toastBody"
                        position="top-right"
                        autoClose={3000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </Hydrate>
                <ReactQueryDevtools initialIsOpen={false} />
            </QueryClientProvider>
        </Container>
    )

}

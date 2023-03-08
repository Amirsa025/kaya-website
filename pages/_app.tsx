import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Container from "@/app/components/layout/Container";
import 'remixicon/fonts/remixicon.css'
export default function App({Component, pageProps}: AppProps) {
    return <Container>
             <Component {...pageProps} />
         </Container>
}

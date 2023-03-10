import React from 'react';
import Head from "next/head";
interface Ititleprops {
    titlesite:string,
    page : string
}
const Heading:React.FC<Ititleprops> = ({titlesite,page}) => {
    return (
        <>
            <Head>
                <title>{`${page} | ${titlesite}`}</title>
                <meta charSet="UTF-8"/>
                <meta name="description" content="Kaya app"  />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/images/Asset.png" />
            </Head>
        </>
    );
};

export default Heading;
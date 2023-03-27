import React from 'react';
import {useRouter} from "next/router";

const productDetail = (data:any) => {
    console.log(data)
    const router =useRouter()
        console.log(router.query)
    return (
        <div>
            product
        </div>
    );
};

    export default productDetail;
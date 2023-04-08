import React from 'react';
import Link from "next/link";
interface  IBannerProps {
    title ?:string
    Subtitle ?:string,
    link?:string
}
const BannerTop:React.FC<IBannerProps> = ({title,Subtitle}) => {
    return (
        <div className={"notification-bar py-4"}>
                    <div className={"center-item pt-4 col-items  md:row-items text-10 space-y-2 md:space-x-2 md:space-y-0"}>
                        <span className={" font-medium"}>  {title}</span>
                        <span className={"font-light "}>  {Subtitle}</span>

                    </div>
        </div>
    );
};

export default BannerTop;
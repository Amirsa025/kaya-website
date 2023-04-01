import React from 'react';
interface  IBannerProps {
    title ?:string
    Subtitle ?:string
}
const BannerTop:React.FC<IBannerProps> = ({title,Subtitle}) => {
    return (
        <div className={"notification-bar py-4"}>
                    <div className={"center-item pt-4 col-items  md:row-items text-10 space-y-2 md:space-x-2 md:space-y-0"}>
                        <span className={"font-light "}>  {title}</span>
                        <span className={"font-light "}>  {Subtitle}</span>
                    </div>
        </div>
    );
};

export default BannerTop;
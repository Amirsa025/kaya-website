import React from 'react';

const BannerTop = () => {
    return (
        <div className={"notification-bar py-4"}>
                    <div className={"center-item pt-4 col-items  md:row-items text-10 space-y-2 md:space-x-2 md:space-y-0"}>
                        <span className={"font-light "}>   عصر جدیدی در راه است:</span>
                        <span className={"text-10 px-2 font-normal"}>لیست <b>اشتراک</b> ویژه <a href={"#"} className={"font-bold text-12 underline inline-block "}>کایا</a>  را مشاهد کنید. </span>
                    </div>
        </div>
    );
};

export default BannerTop;
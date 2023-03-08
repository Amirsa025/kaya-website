import React from 'react';
import BannerTop from "@/app/components/banner-content";
import Header from "@/app/shared/NavBar";

interface IContainer {
    children: React.ReactElement
}

const Container: React.FC<IContainer> = ({children}) => {
    return (
        <div>
            <BannerTop/>
            <div className={""}>
                <Header/>
                {children}
            </div>
            {/*footerItem*/}
        </div>
    );
};

export default Container;
import React, {useEffect} from 'react';
// @ts-ignore
import AOS from 'aos';
import 'aos/dist/aos.css';

interface IContainer {
    children: React.ReactElement
}

const Container: React.FC<IContainer> = ({children}) => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
        })
        AOS.refresh();
    }, [])
    return (
        <div className={"scroll-smooth hover:scroll-auto scroll-ml-6"} >
            <div >
                {children}
            </div>
        </div>
    );
};

export default Container;
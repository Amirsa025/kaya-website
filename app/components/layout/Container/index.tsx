import React from 'react';


interface IContainer {
    children: React.ReactElement
}

const Container: React.FC<IContainer> = ({children}) => {
    return (
        <div className={"scroll-smooth hover:scroll-auto scroll-ml-6"}>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Container;
import React from 'react';


interface IContainer {
    children: React.ReactElement
}

const Container: React.FC<IContainer> = ({children}) => {
    return (
        <div>
            <div>
                {children}
            </div>
        </div>
    );
};

export default Container;
import React from 'react';


interface IContainer {
    children: any
}

const PanelLayout: React.FC<IContainer> = ({children}) => {
    return (
        <>
            <>
                {children}
            </>
        </>
    );
};

export default PanelLayout;
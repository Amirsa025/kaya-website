import React, {ReactNode} from 'react';
interface IPropsAdmin {
    children:ReactNode
}
const GuestLayout:React.FC<IPropsAdmin> = ({children}) => {

    return (
        <div>
            {children}
        </div>
    );
};

export default GuestLayout;
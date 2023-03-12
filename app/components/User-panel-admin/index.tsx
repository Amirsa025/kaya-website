import React, {ReactNode} from 'react';
    interface IPropsAdmin {
        children:ReactNode
    }
const UserPanelAdmin:React.FC<IPropsAdmin> = ({children}) => {
    return (
        <div className={"w-full"}>
            {children}
        </div>
    );
};

export default UserPanelAdmin
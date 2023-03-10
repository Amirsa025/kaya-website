import React from 'react';
import Asideregister from "@/app/components/register/Asideregister";
import MainSginup from "@/app/components/register/MainSginUp";

const Register = () => {
    return (
        <>
            <div className={"grid grid-cols-1 lg:grid-cols-2 "}>
                <Asideregister/>
                <MainSginup/>
            </div>
        </>
    );
};

export default Register;
import React, { useState } from 'react';
import {Tooltip} from "@mui/material";
import {
    Dialog,
    DialogHeader,

    IconButton,
    Typography,
} from "@material-tailwind/react";
import FormFilter from "@/app/shared/form/filter-form";
const ModalFilter = ({onFilter}:any) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen((cur) => !cur);

    return (
        <div>
            <div className={"px-4 xl:hidden "}>
                <button onClick={handleOpen}>
                    <Tooltip title="filter" placement="top-start">
                        <i  className="ri-equalizer-fill text-2xl mt-1 block"></i>
                    </Tooltip>
                </button>
                <div className={"xl:hidden"}>

                </div>

                <Dialog size="xxl" className={"xl:hidden"}   open={open} handler={handleOpen}>
                    <DialogHeader className="justify-between border px-4">
                        <Typography variant="h5" color="blue-gray">
                             Filter
                        </Typography>
                        <IconButton
                            color="blue-gray"
                            size="sm"
                            variant="text"
                            onClick={handleOpen}
                        >
                            <i className="ri-close-line text-2xl"></i>
                        </IconButton>
                    </DialogHeader>
                    {/*start body*/}
                    <div className={"text-black px-2"}>
                        <FormFilter handleOpen={handleOpen} onSubmit={onFilter}/>
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default ModalFilter;
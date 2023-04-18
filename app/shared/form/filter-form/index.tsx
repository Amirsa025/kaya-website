import React, {useEffect, useState} from 'react';
import {Checkbox, ThemeProvider} from "@material-tailwind/react";
import {SelectSkills, skills} from "@/app/constant/MockData";
import {useQuery} from "@tanstack/react-query";
import {MockAPI} from "@/app/constant/Mock-filter";


const FormFilter = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const {
        data,
        isLoading,
        isError
    } = useQuery(['Skills', searchQuery], () => MockAPI.search(searchQuery));
    const [selectedValue, setSelectedValue] = useState('');
    const [filteredArray, setFilteredArray] = useState([]);
    const [AddSkills, setAddSkills] = useState(SelectSkills);
    const [checked, setChecked] = useState(false)
    const [Hourly, setHourly] = useState(false)
    const [show, setShow] = useState(false)
    const checkboxHandler = () => {
        setChecked(!checked)
    }
    const HourlyHandler = () => {
        setHourly(!Hourly)
    }
    const handleFilterArray = () => {
        const trimmedQuery = searchQuery.trim();
        const filtered = skills.filter(item => item.name.toLowerCase().includes(trimmedQuery));
        setShow(!show)
        // @ts-ignore
        setFilteredArray(filtered);
        setSearchQuery('')
    }
    //skill added
    const addSkillHandler = (name: any, id: number) => {
        console.log(id)
        const result = [...AddSkills, name]
        //remove duplicate node in array
        const set1 = new Set(result);
        setAddSkills(Array.from(new Set(set1)))
    }
    return (
        // <div className={"px-2 xl:px-0 "}>
        //     <h1 className={" text-lg pt-2 font-bold px-2"}>Budget</h1>
        //     <div>
        //         <div
        //             className={"flex items-center justify-start  xl:px-0 flex-row-reverse xl:flex-row"}>
        //             <Checkbox color="blue" id={"checkerMinMax"} className={"w-5 h-5"}
        //                       onChange={checkboxHandler}/>
        //             <label htmlFor="checkerMinMax" className={"text-[14px]"}> Fixed Price
        //                 Projects</label>
        //         </div>
        //         <div
        //             className={"direction-ltr xl:space-x-0 flex items-center justify-end gap-6 xl:gap-0 xl:justify-around px-4 xl:px-0"}>
        //             <input disabled={checked}
        //                    className={"border rounded-md py-2 px-1 w-full xl:w-[4.5rem] outline-0 placeholder:text-xs"}
        //                    placeholder={"Max"}/>
        //             <span>to</span>
        //             <input disabled={checked} id={""}
        //                    className={" border rounded-md py-2 px-1 w-full xl:w-[4.5rem] outline-0 placeholder:text-xs"}
        //                    placeholder={"Min"}/>
        //         </div>
        //     </div>
        //     <div className={"py-4"}>
        //         <div
        //             className={"flex items-center justify-start xl:px-0 flex-row-reverse xl:flex-row"}>
        //             <Checkbox color="blue" id={"checkerMax"} className={"w-5 h-5"}
        //                       onChange={HourlyHandler}/>
        //             <label htmlFor="checkerMax" className={"text-[14px]"}>Hourly Projects</label>
        //         </div>
        //         <div
        //             className={"direction-ltr xl:space-x-0 flex items-center justify-end gap-6 xl:gap-0 xl:justify-around px-4 xl:px-0"}>
        //             <input disabled={Hourly}
        //                    className={"border rounded-md py-2 px-1 w-full xl:w-[4.5rem] placeholder:text-xs outline-0"}
        //                    placeholder={"Max"}/>
        //             <span>to</span>
        //             <input disabled={Hourly}
        //                    className={"border rounded-md py-2 px-1 w-full xl:w-[4.5rem] placeholder:text-xs outline-0"}
        //                    placeholder={"Min"}/>
        //         </div>
        //         <div className={" py-4 px-2 direction-ltr text-sm"}>
        //         </div>
        //         <div className={"direction-ltr px-3 border-t py-2 space-y-2"}>
        //             <h2>skills</h2>
        //             {/*    Array with result    */}
        //             <div className={"flex flex-col"}>
        //                 {
        //                     AddSkills.flatMap((item, id) => {
        //                         return (
        //                             <div key={id}>
        //                                 <Checkbox color="blue" id={item} className={"w-5 h-5"}/>
        //                                 <label htmlFor={item}
        //                                        className={"text-[14px]"}>{item}</label>
        //                             </div>
        //                         )
        //                     })
        //                 }
        //             </div>
        //             <div className={"flex flex-col justify-start w-full items-center relative"}>
        //                 <div className={"absolute right-3 top-4 "} onClick={handleFilterArray}>
        //                     <svg className="Icon-image cursor-pointer"
        //                          xmlns="http://www.w3.org/2000/svg"
        //                          width="16`" height="16" viewBox="0 0 24 24">
        //                         <path
        //                             d="M12 6V1a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5H1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5h5a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-5z"
        //                             fillRule="evenodd"></path>
        //                     </svg>
        //                 </div>
        //                 <input placeholder={"add Skills"}
        //                        className={"w-full p-2.5 text-gray-500 placeholder:uppercase  bg-white border rounded-md shadow-sm outline-none border rounded-md py-2 px-1 w-full  outline-0 placeholder:text-xs"}
        //                        type="text" onChange={(e) => {
        //                     setSearchQuery(e.target.value)
        //                     setShow(true)
        //                 }}/>
        //                 <div className={`w-full  border`}>
        //                     {isLoading ?? <div>not found</div>}
        //                     {/*@ts-ignore*/}
        //                     {show && data?.slice(0, 4)?.map((item: any, id: number) => {
        //                         return (
        //                             <ul key={item.id}
        //                                 className={"text-sm bg-white  py-1 font-normal "}>
        //                                 <li className={"w-full py-2 hover:bg-blue-700 px-2 hover:text-white cursor-pointer"}
        //                                     onClick={() => addSkillHandler(item?.name, item.id)}>{item.name}</li>
        //                             </ul>
        //                         )
        //                     })}
        //                 </div>
        //
        //
        //             </div>
        //         </div>
        //     </div>
        // </div>
        <div></div>
    );
};

export default FormFilter;
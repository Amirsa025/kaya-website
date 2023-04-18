import React, {useState} from 'react';
// import FormFilter from "@/app/shared/form/filter-form";
import {useQuery} from "@tanstack/react-query";
import {MockAPI} from "@/app/constant/Mock-filter";
import {SelectSkills, skills} from "@/app/constant/MockData";
import {Checkbox} from "@material-tailwind/react";
import {useFormik} from "formik";

interface IOrederProps {
    onFilter: any
}
interface FilterValues {
    searchTerm: string;
    fixed_min: string;
    fixed_max: string;
    Hourly_max: string;
    Hourly_min: string;
    age: number;
    skills: string[];
}
const FilterOrder: React.FC<IOrederProps> = ({onFilter}) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const {
        data,
        isLoading,
        isError
    } = useQuery(['Skills', searchQuery], () => MockAPI.search(searchQuery));
    const [selectedValue, setSelectedValue] = useState('');
    const [filteredArray, setFilteredArray] = useState([]);
    const [AddSkills, setAddSkills] = useState(SelectSkills);
    const [skillId, setSkillId] = useState([])
    const [checked, setChecked] = useState(true)
    const [Hourly, setHourly] = useState(true)
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
        const result = [...AddSkills, {id: id, name: name}]
        let uniqueArray = Array.from(new Set(result.map(obj => JSON.stringify(obj)))).map(str => JSON.parse(str));
        const set1 = Array.from(new Set(uniqueArray));
        setShow(!show)
        setAddSkills(set1)
    }
    //submit checkbox and input
    const formik = useFormik({
        initialValues: {
            fixed_min: '',
            fixed_max: '',
            Hourly_max: '',
            Hourly_min: '',
            skills: [],

        },
        onSubmit: (values: any) => {
            onFilter(values)
        },
    });


    return (
        <>
            <aside
                className={"direction-ltr  hidden xl:block border border-gray-200 rounded-md py-2 2xl:w-[15rem]  min-h-[30rem]"}>
                <div className={" px-2"}>
                    <div className={"py-2 px-2"}>
                        <span className={"text-[1rem] font-bold  block"}>My recent searches </span>
                    </div>
                    <hr className={"mt-2 xl:mb-2 "}/>
                    {/*<FormFilter/>*/}
                    <form className={"px-2 xl:px-0 "} onSubmit={formik.handleSubmit}>
                        <h1 className={" text-lg pt-2 font-bold px-2"}>Budget</h1>
                        <div>
                            <div
                                className={"flex items-center justify-start  xl:px-0 flex-row-reverse xl:flex-row"}>
                                <Checkbox color="blue" name={"fixed"} defaultChecked={checked} id={"checkerMinMax"}
                                          className={"w-5 h-5"} onChange={checkboxHandler}/>
                                <label htmlFor="checkerMinMax" className={"text-[14px]"}> Fixed
                                    Price Projects</label>
                            </div>
                            <div
                                className={"direction-ltr xl:space-x-0 flex items-center justify-end gap-6 xl:gap-0 xl:justify-around px-4 xl:px-0"}>
                                <input
                                    id={"fixed_max"}
                                    name={"fixed_max"}
                                    disabled={checked}
                                    className={"border rounded-md py-2 px-1 w-full xl:w-[4.5rem] outline-0 placeholder:text-xs"}
                                    placeholder={"Max"}
                                    value={formik.values.fixed_max}
                                    onChange={formik.handleChange}
                                />
                                <span>to</span>
                                <input
                                    disabled={checked}
                                    id={"fixed_min"}
                                    name={"fixed_min"}
                                    value={formik.values.fixed_min}
                                    onChange={formik.handleChange}
                                    className={" border rounded-md py-2 px-1 w-full xl:w-[4.5rem] outline-0 placeholder:text-xs"}
                                    placeholder={"Min"}/>
                            </div>
                        </div>
                        <div className={" py-4 "}>
                            <div
                                className={"flex items-center justify-start xl:px-0 flex-row-reverse xl:flex-row"}>
                                <input type={"checkbox"} name={"fixed"} defaultChecked={Hourly}  id={"checkerMax"}
                                          className={""}
                                          onChange={HourlyHandler}/>
                                <label htmlFor="checkerMax" className={"text-[14px] px-4"}>Hourly
                                    Projects</label>
                            </div>
                            <div
                                className={"direction-ltr xl:space-x-0 flex items-center justify-end gap-6 xl:gap-0 xl:justify-around px-4 xl:px-0"}>
                                <input
                                    id={"Hourly_max"}
                                    name={"Hourly_max"}
                                    disabled={Hourly}
                                    className={"border rounded-md py-2 px-1 w-full xl:w-[4.5rem] placeholder:text-xs outline-0"}
                                    placeholder={"Max"}
                                    value={formik.values.Hourly_max}
                                    onChange={formik.handleChange}
                                />
                                <span>to</span>
                                <input
                                    id={"Hourly_min"}
                                    name={"Hourly_min"}
                                    disabled={Hourly}
                                    className={"border rounded-md py-2 px-1 w-full xl:w-[4.5rem] placeholder:text-xs outline-0"}
                                    placeholder={"Min"}
                                    value={formik.values.Hourly_min}
                                    onChange={formik.handleChange}
                                />
                            </div>
                            <div className={" py-4 px-2 direction-ltr text-sm"}>
                            </div>
                            {/**/}
                            <div className={" direction-ltr px-3 border-t py-2 space-y-2"}>
                                <h2>skills</h2>
                                {/*    Array with result    */}
                                <div className={"flex flex-col"}>
                                    {
                                        AddSkills.flatMap((item, id) => {
                                            return (
                                                <div key={id}>
                                                    {/*// @ts-ignore*/}
                                                    <input type={"checkbox"} name="skills"
                                                           onChange={formik.handleChange}
                                                           value={item.id} id={item.name}
                                                           className={"rounded-none w-3 h-3"}/>
                                                    <label htmlFor={item.name}
                                                           className={"text-[14px] px-2"}>{item.name}</label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div
                                    className={" flex flex-col justify-start w-full items-center relative"}>
                                    <div className={"absolute right-3 top-4 "}
                                         onClick={handleFilterArray}>
                                        <svg className="Icon-image cursor-pointer"
                                             xmlns="http://www.w3.org/2000/svg"
                                             width="16`" height="16" viewBox="0 0 24 24">
                                            <path
                                                d="M12 6V1a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v5H1a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h5v5a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-5h5a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-5z"
                                                fillRule="evenodd"></path>
                                        </svg>
                                    </div>
                                    <input
                                        placeholder={"add Skills"}
                                        className={"w-full p-2.5 text-gray-500 placeholder:uppercase  bg-white border rounded-md shadow-sm outline-none border rounded-md py-2 px-1 w-full  outline-0 placeholder:text-xs"}
                                        type="text" onChange={(e) => {
                                        setSearchQuery(e.target.value)
                                        setShow(true)
                                    }}/>
                                    <div className={`w-full  border`}>
                                        {isLoading ?? <div>not found</div>}
                                        {/*@ts-ignore*/}
                                        {show && data?.slice(0, 4)?.map((item: any, id: number) => {
                                            return (
                                                <ul key={item.id}
                                                    className={"text-sm bg-white  py-1 font-normal "}>
                                                    <li className={"w-full py-2 hover:bg-blue-700 px-2 hover:text-white cursor-pointer"}
                                                        onClick={() => addSkillHandler(item?.name, item?.id)}>{item.name}</li>
                                                </ul>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                                className={"w-full px-4 py-2 text-[15px]  border rounded-md hover:bg-[#eaebff] hover:border-indigo-600 hover:text-indigo-600 "}>Filter
                        </button>
                    </form>
                </div>
            </aside>
        </>
    );
};

export default FilterOrder;
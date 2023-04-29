import React from 'react';
import {NextPageWithLayout} from "@/pages/_app";
import UserPanelAdmin from "@/app/components/layout/User-panel-admin";
import ProjectList from "@/app/components/project/project-list/project-list";
import Pagination from '@mui/material/Pagination';
import {useQuery} from "@tanstack/react-query";
import callApi from "@/app/helper/callApi";
import Cookies from "universal-cookie";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {PaginationItem} from "@mui/material";
import Heading from "@/app/shared/Heading";
import {MoonLoader} from "react-spinners";
import EmptyList from "@/app/shared/EmptyList";
import ModalFilter from "@/app/utils/Modal/modal-filter";
import AsideFilter from "@/app/components/project/filter-order/filter-order";
import useAuth from "@/app/helper/useAuth";
import Link from "next/link";


interface FilterValues {
    searchTerm: string;
    fixed_min: string;
    fixed_max: string;
    Hourly_max: string;
    Hourly_min: string;
    age: number;
    skills: string[];
}

const Project: NextPageWithLayout<FilterValues> = () => {
   //variable
   const cookie = new Cookies();
    //state
    const [searchTerm, setSearchTerm] = React.useState(""),
        [offset, setOffset] = React.useState(1),
        [filters, setFilters] = React.useState<string[]>([]),
        [page, setPage]: any = React.useState(3);
    //function
    const onFilters = (filterValues: any) => {
        let FilterArray = []
        FilterArray.push(filterValues)
        setFilters(FilterArray)
        if (FilterArray.length === 0) {
            setFilters(FilterArray)
        }
    }
   const handleSearchChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setSearchTerm(event.target.value);
    }
    //query's React query All project
    const fetchProjects = async (offset: number) => {
        try {
            return await callApi().get(`/projects/projects?limit=5&offset=${offset}`, {
                headers: {
                    'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
                }
            })
        } catch (error) {
            console.log(error)
        }
    };
    const {data:AuthUser, isFetching, isLoading:loadingUser, isError:ErrorUser} = useAuth()
    const {isLoading, isError, data: project} = useQuery({
            queryKey: ['page', offset, searchTerm, filters],
            queryFn: () => fetchProjects(offset),
            keepPreviousData: true,
            staleTime: 500,
            cacheTime: 600000, // cache for 10 minutes
            refetchInterval: 60000, // prefetch every minute
        });
    //query's React query Filter project
    const feachFilterProject = async () => {
        try {
            const result = filters.map(async (item: any, id) => {
                return await callApi().get(`/projects/projects?limit=10&offset=${offset}&${item.skills.map(((skilled: any, id: number) => `skills[]=${skilled}`)).join('&')}&fixed=${item?.fixed}&hourly=${item?.hourly}&fixed_min=${item?.fixed_min}&fixed_max=${item?.fixed_max}&hourly_min=${item?.Hourly_min}&hourly_max=${item?.Hourly_max}`, {
                    headers: {
                        'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
                    }
                })
            })
            return Promise.all(result)
        } catch (error) {
            console.log(error)
        }


    };
    const {data: filtersDatas, status: statusCategories} = useQuery({
        queryKey: ["filter", filters, offset],
        queryFn: () => feachFilterProject(),
        keepPreviousData: true,
        staleTime: 500,
        cacheTime: 600000, // cache for 10 minutes
        refetchInterval: 60000, // refetch every minute
    })
    let searchTermsFilter;
    if (filtersDatas) {
        if (filtersDatas[0]?.data.projects.length) {
          searchTermsFilter = filtersDatas[0]?.data.projects.filter((item: any) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
            console.log(searchTermsFilter.length)
        }
    }
    //response first when loaded
    const response = project?.data.projects.filter((item: any) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const handleChangePage = (page: any) => {
        setOffset((page - 1) * 5)
        setPage(page + 1)
    }

    return (
        <section className={"md:container-app px-2 "}>
            <Heading page={"لیست پروژه ها "} titlesite={" کایا"}/>
            {
                AuthUser?.data.verify_status === 'unverified' ?<div>
                    <div className={" py-8"}>
                        <div
                            className={"bg-red-500 text-white w-1/2 flex w-full px-12 mx-auto py-2 rounded-md items-center"}>
                            <div className={" flex items-center justify-center w-full"}>
                                <div>
                                    <span className={"text-[15px] "}>احراز هویت شما کامل نیست .</span>
                                </div>
                                <div className={"underline text-[12px] font-medium"}>
                                    <Link href={'/user-panel/missions'}>تکمیل ثبت نام</Link>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>:null
            }
            {
                AuthUser?.data.verify_status === 'verified' ?<div>
                    <div className={"flex flex-col lg:flex-row items-center justify-between gap-4  pb-12"}>
                        <div className={"flex items-center px-4 border border-gray-200 bg-gray-50 rounded-md py-4 w-full  lg:w-1/3"}>
                            <div>
                                <svg className="text-yellow-900 flex-shrink-0" width="30"
                                     height="30" viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect width="30" height="30" rx="5" fill="currentColor"></rect>
                                    <path
                                        d="M8 19.6667C8 22.4117 9.29433 23 15.3333 23C21.3723 23 22.6667 22.4117 22.6667 19.6667C22.6667 16.9217 21.3723 16.3333 15.3333 16.3333C9.29433 16.3333 8 16.9217 8 19.6667Z"
                                        fill="white"></path>
                                    <path
                                        d="M11.3333 11C11.3333 13.2091 13.1242 15 15.3333 15C17.5425 15 19.3333 13.2091 19.3333 11C19.3333 8.79086 17.5425 7 15.3333 7C13.1242 7 11.3333 8.79086 11.3333 11Z"
                                        fill="white"></path>
                                </svg>
                            </div>
                            <span className={"px-2 text-yellow-800 font-medium text-[1.5rem]"}>{AuthUser?.data.profile?.first_name}</span>
                            <span className={"text-gray-700  text-[14px]"}>به داشبورد خوش آمدید</span>

                        </div>
                        {
                            AuthUser?.data.connected_to_projects_bot === false ?
                                <div className={""}>
                                    <div className={"flex items-center gap-2  px-4 border border-gray-200 bg-gray-50 rounded-md py-4"}>
                                        <div>
                                            <svg className="text-blue-700 flex-shrink-0" width="30"
                                                 height="30"
                                                 viewBox="0 0 30 30" fill="none"
                                                 xmlns="http://www.w3.org/2000/svg">
                                                <rect width="30" height="30" rx="5"
                                                      fill="currentColor"></rect>
                                                <path
                                                    d="M15 7C21.588 7 23 8.412 23 15C21.6667 21.6667 15 23 15 23C15 23 8.33333 21.6667 7 15C7 8.412 8.412 7 15 7ZM18.1381 12.5286C18.3984 12.789 18.3984 13.2111 18.1381 13.4714L14.8047 16.8047C14.5444 17.0651 14.1223 17.0651 13.8619 16.8047L12.5286 15.4714C12.2683 15.2111 12.2683 14.789 12.5286 14.5286C12.789 14.2683 13.2111 14.2683 13.4714 14.5286L14.3333 15.3905L17.1953 12.5286C17.4556 12.2683 17.8777 12.2683 18.1381 12.5286Z"
                                                    fill="white" clipRule="evenodd"
                                                    fillRule="evenodd"></path>
                                            </svg>
                                        </div>
                                        <div className={"flex  flex-col sm:flex-row flex-wrap sm:flex-nowrap sm:items-center  space-y-2"}>
                                        <span
                                            className={" text-gray-800 text-[12px] pt-1 md:text-[14px]"}> لطفا ربات تلگرامی کایا را برای سریعتر دریافت کردن اعلانات سایت فعال کنید.</span>
                                            <Link href={AuthUser?.data.messages_bot_connection_url}
                                                  className={"sm:mx-2 text-blue-600 hover:text-blue-400  hover:underline text-[12px]  sm:mx-4 cursor-pointer"}> فعال‌سازی
                                                ربات تلگرام</Link>
                                        </div>
                                    </div>
                                </div> : null
                        }
                    </div>

                </div>:null
            }
            {
                AuthUser?.data.verify_status === 'pending'?<div>
                    <div className={" pb-8"}>
                        <div className={"bg-gray-100 w-full  lg:w-10/12 py-6 rounded-md px-2  "}>
                            <div
                                className={"flex gap-4 items-center px-4 border border-gray-200 bg-gray-50 rounded-md py-2"}>
                                <div>
                                    <svg className="text-gray-350 flex-shrink-0" width="30" height="30"
                                         viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect width="30" height="30" rx="5" fill="#009938"></rect>
                                        <path
                                            d="M14.216 14.7457C14.5198 14.623 14.7893 14.4275 15 14.177C15.2107 14.4275 15.4802 14.623 15.784 14.7457C15.6104 15.0232 15.5075 15.3395 15.4845 15.6658C15.1666 15.5868 14.8334 15.5868 14.5155 15.6658C14.4925 15.3395 14.3896 15.0232 14.216 14.7457Z"
                                            fill="white"></path>
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                              d="M8.05257 14.1818C8.19103 14.2114 8.35338 14.2114 8.67809 14.2114C9.11559 14.2114 9.47025 14.6459 9.47025 15.182C9.47025 15.718 9.11559 16.1525 8.67809 16.1525C8.35991 16.1525 8.20082 16.1525 8.06305 16.1818C7.54076 16.2931 7.11139 16.742 7.02417 17.268C7.00116 17.4068 7.00782 17.5509 7.02115 17.8392C7.06347 18.7548 7.15793 19.4091 7.36869 19.9744C7.79087 21.1068 8.40002 21.8161 9.32428 22.3333C10.1604 22.8012 11.3671 23 13.5164 23H16.4836C18.6329 23 19.8396 22.8012 20.6757 22.3333C21.6 21.8161 22.2091 21.1068 22.6313 19.9744C22.8421 19.4091 22.9365 18.7548 22.9789 17.8392C22.9922 17.551 22.9988 17.4068 22.9758 17.268C22.8886 16.742 22.4592 16.2931 21.937 16.1818C21.7992 16.1525 21.6401 16.1525 21.3219 16.1525C20.8844 16.1525 20.5297 15.718 20.5297 15.182C20.5297 14.6459 20.8844 14.2114 21.3219 14.2114C21.6466 14.2114 21.809 14.2114 21.9474 14.1818C22.4658 14.0708 22.8858 13.6385 22.9811 13.1178C23.0065 12.9787 23.0019 12.8268 22.9926 12.523C22.9587 11.4131 22.8689 10.6628 22.6313 10.0256C22.2091 8.89319 21.6 8.18391 20.6757 7.66667C19.8396 7.19875 18.6329 7 16.4836 7H13.5164C11.3671 7 10.1604 7.19875 9.32428 7.66667C8.40002 8.18391 7.79087 8.89319 7.36869 10.0256C7.13113 10.6628 7.04134 11.4131 7.0074 12.523C6.99811 12.8268 6.99347 12.9787 7.01892 13.1178C7.11424 13.6385 7.53416 14.0708 8.05257 14.1818ZM14.365 12.2847C14.5648 11.6705 15.4352 11.6705 15.6351 12.2847L15.8995 13.0973C15.9889 13.3719 16.2453 13.5579 16.5345 13.5579H17.3903C18.0371 13.5579 18.3061 14.3843 17.7828 14.7639L17.0905 15.2661C16.8564 15.4359 16.7585 15.7368 16.8479 16.0115L17.1123 16.824C17.3122 17.4383 16.6081 17.949 16.0848 17.5694L15.3925 17.0672C15.1585 16.8974 14.8415 16.8974 14.6075 17.0672L13.9152 17.5694C13.3919 17.949 12.6878 17.4383 12.8877 16.824L13.1521 16.0115C13.2415 15.7368 13.1436 15.4359 12.9095 15.2661L12.2172 14.7639C11.6939 14.3843 11.9629 13.5579 12.6097 13.5579H13.4655C13.7547 13.5579 14.0111 13.3719 14.1005 13.0973L14.365 12.2847Z"
                                              fill="white"></path>
                                    </svg>
                                </div>
                                <div>
                                    <span className={"text-gray-800  text-sm  "}>احراز هویت شما در حال بررسی است </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:null
            }
            <div className={"flex items-start md:gap-4"}>

                <div className={"flex-1"}>
                    {isLoading ? (
                        <div className={"lg:px-24 w-full"}>
                            <div
                                className={"text-white center-item  tex-[12px] h-16 bg-blue-400 rounded-md px-2  w-full lg:w-10/12 "}>
                                <div
                                    className={" rounded-md w-full py-2 lg:px-1 bg-blue-300 flex  items-center  gap-4"}>
                                    <div className={"px-3"}>
                                        <MoonLoader
                                            color="#162f48"
                                            size={20}
                                        />
                                    </div>
                                    <span>  درحال دریافت اطلاعات از سرور...</span>
                                </div>

                            </div>
                        </div>
                    ) : isError ? (
                        <div className={"bg-red-300 rounded-md w-full lg:w-10/12 py-4 px-6"}>

                            <div
                                className={"bg-red-200 py-2  flex items-center gap-8 text-white  w-full tex-[12px]   rounded-md px-8"}>
                                <svg className="text-red-600 flex-shrink-0" width="30" height="30"
                                     viewBox="0 0 30 30" fill="none"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <rect width="30" height="30" rx="5" fill="currentColor"></rect>
                                    <path fillRule="evenodd" clipRule="evenodd"
                                          d="M22.9881 15.0544C22.9744 15.176 22.9547 15.2588 22.9154 15.4243C21.7287 20.421 17.5155 22.2845 15.7681 22.8529C15.4666 22.951 15.3159 23 15 23C14.6841 23 14.5334 22.951 14.2319 22.8529C12.4845 22.2845 8.27126 20.421 7.08458 15.4243C7.04526 15.2588 7.02559 15.176 7.01193 15.0544C6.99826 14.9328 6.99919 14.8325 7.00106 14.6321C7.05944 8.3602 8.54671 7 15 7C21.4533 7 22.9406 8.3602 22.9989 14.6321C23.0008 14.8325 23.0017 14.9328 22.9881 15.0544ZM15 11.0166C15.3682 11.0166 15.6667 11.3163 15.6667 11.686V15.7026C15.6667 16.0723 15.3682 16.372 15 16.372C14.6318 16.372 14.3333 16.0723 14.3333 15.7026V11.686C14.3333 11.3163 14.6318 11.0166 15 11.0166ZM14.3333 17.7109C14.3333 17.3411 14.6318 17.0414 15 17.0414C15.3682 17.0414 15.6667 17.3411 15.6667 17.7109C15.6667 18.0806 15.3682 18.3803 15 18.3803C14.6318 18.3803 14.3333 18.0806 14.3333 17.7109Z"
                                          fill="white"></path>
                                </svg>
                                <span>خطایی پیش بینی نشده ای به وجود امده دوباره امتحان کنید.</span>
                            </div>
                        </div>
                    ) : (
                        <div className={"flex flex-col md:flex-row gap-4"}>
                            {/*filter and lsit project */}
                            <div
                                className={" flex justify-start md:flex-1 border rounded-md  w-full flex flex-col  "}>
                                <div>
                                    <div className={"flex items-center"}>
                                        <ModalFilter onFilter={onFilters}/>
                                        <div
                                            className={"flex-1 direction-ltr px-8  flex items-center gap-4 px-2 md:py-2 border "}>
                                            <div>
                                                <i className="ri-search-line text-[1.5rem] text-gray-600"></i>
                                            </div>
                                            <input value={searchTerm} onChange={handleSearchChange}
                                                   type="text" placeholder={"Search Keyword"}
                                                   className={"outline-0 py-2 flex-1"}/>
                                        </div>
                                    </div>

                                    {
                                        filtersDatas ? filtersDatas[0]?.data.projects.length ? !searchTermsFilter.length ?
                                                    <EmptyList className={"sm:mx-0 mx-4 my-4"}
                                                               description={"پروژه برای نمایش وجود ندارد"}
                                                               title={"برای دیدن پروژه های بیشتر به صفحات قبل مراجعه کنید"}/> :
                                                    <ProjectList
                                                        projectItem={searchTermsFilter}/>


                                                : !response.length ?
                                                    <EmptyList className={"sm:mx-0 mx-4 my-4"}
                                                               description={"پروژه برای نمایش وجود ندارد"}
                                                               title={"برای دیدن پروژه های بیشتر به صفحات قبل مراجعه کنید"}/> :
                                                    <ProjectList projectItem={response}/>
                                            : <></>}

                                </div>
                                <div className={"direction-ltr py-6 w-full flex justify-center"}>
                                    {/*edit*/}
                                    <Pagination siblingCount={0} boundaryCount={1}
                                                renderItem={(item) => (
                                                    <PaginationItem
                                                        slots={{
                                                            previous: ArrowBackIcon,
                                                            next: ArrowForwardIcon
                                                        }}
                                                        {...item}
                                                    />
                                                )} count={page}
                                                onChange={(event, page) => handleChangePage(page)}/>
                                </div>
                            </div>

                        </div>
                    )}
                </div>

                <div className={""}>
                    <AsideFilter onFilter={onFilters}/>
                </div>
            </div>
        </section>
    );
};
Project.getLayout = (page) => <UserPanelAdmin>{page}</UserPanelAdmin>
export default Project;

















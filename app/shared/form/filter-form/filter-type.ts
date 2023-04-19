export interface IOrderProps {
    onFilter: (values: object)=>unknown
}
export interface FilterValues {
    searchTerm: string;
    fixed_min: string;
    fixed_max: string;
    Hourly_max: string;
    Hourly_min: string;
    age: number;
    skills: string[];
    fixed:boolean,
    hourly:boolean
}
export type MyType = { id: number; name: string; };
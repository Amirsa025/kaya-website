// @ts-ignore
interface Props {
    title : string,
    description : string,
    className? : string
}

export default function EmptyList({ title , description , className } : Props) {
    return (
        <div className={`text-center border-2 border-gray-300 border-dashed rounded-lg p-12 py-24 ${className ?? ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                 strokeWidth="1.5" stroke="currentColor" className="mx-auto h-12 w-12 text-gray-400">
                <path strokeLinecap="round" strokeLinejoin="round"
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
            </svg>

            {/*<EyeSlashIcon className="mx-auto h-12 w-12 text-gray-400" />*/}
            <h3 className="mt-2 text-base font-medium text-gray-900">{title}</h3>
            <p className="mt-1 text-sm text-gray-500">{description}</p>
        </div>
    );
}

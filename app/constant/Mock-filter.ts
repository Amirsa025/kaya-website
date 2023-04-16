import {skills} from "@/app/constant/MockData";

export const MockAPI = {
    async search(query:any) {
        return new Promise((resolve) => {
            setTimeout(() => {
                const filteredResults = skills.filter((result) =>
                    result.name.toLowerCase().includes(query.toLowerCase())
                );
                resolve(filteredResults);
            }, 1000);
        });
    },
};
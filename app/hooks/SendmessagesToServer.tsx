import {useRouter} from "next/router";
import Cookies from "universal-cookie";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import callApi from "@/app/helper/callApi";

const useGetmesaage = () => {
    const router = useRouter();
    const cookie = new Cookies();
    const userId = router.query.id;
    const queryClient = useQueryClient()
    return useMutation(
        (formPayload: void) => {
            ///threads/threads/1000/employer_message
            return callApi().post(`/threads/threads/${userId}/messages`, {
                //@ts-ignore
                text: formPayload?.message
            }, {
                headers: {
                    'Authorization': `Bearer ${cookie.get('signUp') || cookie.get('token')}`
                }
            })
        },
        {
            onSuccess: (data) => {
                queryClient.setQueryData(['SendMessageChat'], data)
            },
            onSettled: () => {
                queryClient.invalidateQueries(["SendMessageChat", userId]).then();
            }
        }
    );
};
export  {useGetmesaage}
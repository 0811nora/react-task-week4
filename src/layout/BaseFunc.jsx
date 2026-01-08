import { toast } from "@pheralb/toast";

export const successNotify = (test) =>{
    toast.success({
        text: test,
    })
}
export const errorNotify = (test) =>{
    toast.error({
        text: test,
    })
}
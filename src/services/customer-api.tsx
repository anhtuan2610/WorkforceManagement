import { TTicketForm } from "../components/Customer/TicketForm";
import { post } from "./axios-config";

type TBaseResponse = {
    code: number,
    message: string,
    data: any
}

export async function createPentestRequest({ data }: {data: TTicketForm}) {
    return await post<TBaseResponse>({
        url: "/Customer/CreateRequest",
        data
    })
}
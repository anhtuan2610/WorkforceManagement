import { get, post } from "./axios-config";

type TPendingTicketResponse = {
  code: number;
  message: string;
  data: TPendingTicketData[];
};

type TPendingTicketData = {
  id: number;
  projectName: string;
  description: string;
  createdAt: string;
};

export async function getPendingRequest() {
  return await get<TPendingTicketResponse>({
    url: "/SocManager/GetPendingRequests",
  });
}

export async function approveRequest({ id }: { id: number }) {
  return await post({
    url: `/SocManager/ApproveRequest/${id}`,
  });
}

export async function rejectRequest({
  id,
  rejectReason,
}: {
  id: number;
  rejectReason: string;
}) {
  return await post({
    url: `/SocManager/RejectRequest/${id}`,
    data: { rejectReason },
  });
}

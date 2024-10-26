import { get } from "./axios-config";

export type TResponseUsersInfo = {
    id: number;
    fullName: string;
    email: string;
    password: string | null;
    role: string;
    isLocked: boolean;
    isActive: boolean;
    typeAuthentication: string | null;
    createAt: string; 
    profileImage: string | null;
    address: string | null;
};

export type TResponseData = {
    users: TResponseUsersInfo[];
    totalUsers: number;
    currentPage: number;
    pageSize: number;
    totalPages: number;
};

export type TResponse = {
    code: number;
    message: string;
    data: TResponseData;
};

export type TResponseUserDetails = {
    code: number;
    message: string;
    data: TResponseUsersInfo;
};

type TParamsGetUsers = {
  searchString?: string,
  pageNumber?: number
  pageSize?: number
}

export async function getAllUsers({searchString, pageNumber, pageSize}: TParamsGetUsers) {
  return await get<TResponse>({
    url: "/Admin/GetAllUsers",
    params: {searchString, pageNumber, pageSize}
  });
}

export async function getUserDetails({emailUser}: {emailUser: string}) {
  return await get<TResponseUserDetails>({
    url: `/Admin/GetUserDetails/${emailUser}`,
  })
}
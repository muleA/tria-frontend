import { apiSlice } from "../store/app.api";
import { backOfficeEndPoints } from "./back-office.endpoint";

const backOfficeApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getUsers,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getUserById: builder.query<any, any>({
      query: (id) => ({
        url: `${backOfficeEndPoints.getUserById}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getServiceDetail: builder.query<any, any>({
      query: (id) => ({
        url: `${backOfficeEndPoints.getServiceDetail}${id}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),

    getActiveBpWithServiceId: builder.query<any, any>({
      query: (id) => ({
        url: `${backOfficeEndPoints.getActiveBpWithServiceId}/${id}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getRoles: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getRoles,
        method: "GET",
      }),
      providesTags: ["Role"],
    }),
    getArchivedUser: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getArchivedUser,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    
    getArchivedApps: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getArchivedApplication,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getArchivedEmpoyee: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getArchivedEmployees,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getTasks: builder.query<any, void>({
      query: (Id) => ({
        url: `${backOfficeEndPoints.getTasks}${Id}`,
        method: "GET",
      }),
      providesTags: ["Task"],
    }),
    getSavedWorkFlow: builder.query<any, any>({
      query: (Id) => ({
        url: `${backOfficeEndPoints.getSavedWorkFlow}${Id}`,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getServices: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getServices,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getBussinessProcess: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getBussinessProcess,
        method: "GET",
      }),
      providesTags: ["Service"],
    }),
    getApplications: builder.query<any, void>({
      query: () => ({
        url: backOfficeEndPoints.getApplications,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getApplicationDetailByUserId: builder.query<any, void>({
      query: (id) => ({
        url: `${backOfficeEndPoints.getApplicationDetailByUserId}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getArchivedUserByUserId: builder.query<any, void>({
      query: (id) => ({
        url: `${backOfficeEndPoints.getArchivedUserById}${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getArchivedEmployeesByEmployeeId: builder.query<any, void>({
      query: (id) => ({
        url: `${backOfficeEndPoints.getArchivedEmployeeById}/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    changeLicenseStatus: builder.mutation<any, any>({
      query:(newUser) => {
        const url = `${backOfficeEndPoints.ChangeLicenseStatus}/${newUser.appId}`;
        const method = "POST";
        const data = newUser;
        console.log("URL:", url);
        console.log("Method:", method);
        console.log("Data:", data);
        return {
          url: `${backOfficeEndPoints.ChangeLicenseStatus}/${newUser.appId}`,
          method: "POST",
          data: newUser,        };
      }/* ,
      query: (newUser) => ({
        url: `${backOfficeEndPoints.ChangeLicenseStatus}/${newUser.appId}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
      */
    }), 
  
    restoreEducation: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.createAccount}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Education"],
    }),

    createService: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.createServices}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Service"],
    }),
    updateService: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.updateServices}`,
        method: "PUT",
        data: newUser,
      }),
      invalidatesTags: ["Service"],
    }),
    deleteService: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.deleteService}${newUser}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Service"],
    }),
    deleteEmployee: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.deleteEmployee}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    deleteServices: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.deleteServices}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Service"],
    }),
   
    createTask: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.createTask}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Task"],
    }),
    saveWorkFlow: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.saveWorkFlow}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Service"],
    }),
    restoreUser: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.restoreUser}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    restoreEmployee: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.restoreEmployee}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    updatedUser: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.createUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["Education"],
    }),
    restoreApplication: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints}${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    archiveUser: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.archiveUser}/${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),
    archiveEmployee: builder.mutation<any, any>({
      query: (newUser) => ({
        url: `${backOfficeEndPoints.archiveEmployee}/${newUser}`,
        method: "POST",
        data: newUser,
      }),
      invalidatesTags: ["user"],
    }),

  })
});

export const {

  useGetUsersQuery,
  useRestoreEducationMutation,
   useRestoreApplicationMutation,
   useUpdatedUserMutation,
   useGetRolesQuery,
   useGetApplicationsQuery,
   useArchiveUserMutation,
   useGetApplicationDetailByUserIdQuery,
   useGetUserByIdQuery,useLazyGetUserByIdQuery,
   useGetArchivedAppsQuery,
   useGetArchivedEmpoyeeQuery,useGetArchivedUserQuery,
   useLazyGetApplicationDetailByUserIdQuery,
   useRestoreEmployeeMutation,
   useRestoreUserMutation,
   useChangeLicenseStatusMutation,
   useDeleteEmployeeMutation,
   useGetArchivedEmployeesByEmployeeIdQuery,
   useGetArchivedUserByUserIdQuery,
   useLazyGetArchivedEmployeesByEmployeeIdQuery,
   useLazyGetArchivedUserByUserIdQuery,
   useGetTasksQuery,
   useCreateTaskMutation,
   useGetServiceDetailQuery,
   useLazyGetServiceDetailQuery,
   useGetServicesQuery,
   useDeleteServicesMutation,
   useCreateServiceMutation,
   useGetSavedWorkFlowQuery,
   useLazyGetSavedWorkFlowQuery,
   useSaveWorkFlowMutation,
   useGetBussinessProcessQuery,
   useUpdateServiceMutation,
   useDeleteServiceMutation,
   useLazyGetActiveBpWithServiceIdQuery,
   useGetActiveBpWithServiceIdQuery,
   useLazyGetTasksQuery
} = backOfficeApi;

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./api";

const userSlice = createApi({
  reducerPath: "user",
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/users",
        method: "GET",
      }),
      providesTags: (result, error, arg) => {
        // Assuming the data is an array of objects with unique IDs
        if (result) {
          return [result.map(item => ({ type: 'User', id: item.id })),[{ type: "User", id: "LIST" }]];
        }
        return [{ type: "User", id: "LIST" }];
      },
    }),
    getUserByEmail: builder.query({
      query: (formData) => ({
        url: `/users?email=${formData.email}`,
        method: "GET",
      }),
      providesTags: (result, error, arg) => [
        result
          ? [
              ...result.map(({ id }) => ({ type: "User", id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
      ],
    }),
    addUser: builder.mutation({
      query: (formData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...formData,
        },
      }),
      invalidatesTags: [
        { type: "User" },
      ],
    }),
  }),
});

export const { useGetAllUsersQuery, useGetUserByEmailQuery, useAddUserMutation } = userSlice;

export default userSlice;

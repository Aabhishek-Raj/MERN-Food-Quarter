import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'      
import { apiSlice } from '../../app/api/apiSlice'

const userAdapter = createEntityAdapter({})

const initialState = userAdapter.getInitialState()

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getUsers: builder.query({
            query: () => '/users',
            validateStatus: (response, result) => {
                return response.status === 200 && !result.isError
            },
            keepUnusedDataFor: 5,
            transformResponse: responseData => {
                const loadedUsers = responseData.map(user => {
                    user.id = user._id
                    return user
                })
                return userAdapter.setAll(initialState, loadedUsers)
            },
            providesTags: (result, error, arg) => {
                if(result?.ids) {
                    return [
                        { type: 'User', id: 'LIST' },
                        ...result.ids.map(id => ({ type: 'User', id }))
                    ]
                } else return [{ type: 'User', id: 'LIST'}]
            }
        })
    })
})

export const {
    useGetUsersQuery,
} = userApiSlice

//return the query result object    
export const selectUserResult = userApiSlice.endpoints.getUsers.select()

//creates memoized selector
const selectUserData = createSelector(
    selectUserResult,
    userResult => userResult.data //normalized state object with ids & entities
)

//getSelector creates these selectors and we rename them with aliases using destructing
export const {
    selectAll: selectAllUsers,
    selectById: selectUserById,
    selectIds: selectUserIds
    //Pass in Selector that returns the supplier slice of sate
} = userAdapter.getSelectors(state => selectUserData(state) ??
initialState)   
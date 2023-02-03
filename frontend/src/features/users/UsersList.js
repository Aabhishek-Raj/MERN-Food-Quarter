import User from "./User"
import { useGetUsersQuery } from "./userApiSlice" 

const UsersList = () => {

  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error
  } = useGetUsersQuery()

  let content

  if (isLoading) content = <p>Loading...</p>

  if (isError) {
    content = <p className='errmsg'>{error?.data?.message}</p>
  }

  if (isSuccess) {
    const { ids } = users

    const tableContent = ids?.length ? ids.map(userId => <User key={userId} userId={userId} />) : null

    content = (
      <table className='table table--users'>
        <thead>
          <tr>
            <th scope="col" >Username</th>
            <th scope="col" >Roles</th>
            <th scope="col" >Edit</th>
          </tr>
        </thead>
        <tbody>
          {tableContent}
        </tbody>
      </table>
      
    )
  }

  return content
}

export default UsersList
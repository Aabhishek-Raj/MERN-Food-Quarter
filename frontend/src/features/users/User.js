import { useNavigate } from "react-router-dom";
import { FaTwitter, FaBars } from 'react-icons/fa'

import { useSelector } from "react-redux";
import { selectUserById } from "./userApiSlice";

const User = ({ userId }) => {

    const user = useSelector(state => selectUserById(state, userId))

    const navigate = useNavigate()

    if(user){
        const handleEdit = () => navigate(`/dash/users/${userId}`)

        const userRolesString = user.roles.toString().replaceAll(',', ', ')

        const cellStatus = user.active ? '' : 'table__cell--inactive'

        return(
            <tr className="table__row user">
                <td className={`table__cell ${cellStatus}`}>{user.username}</td>
                <td className={`table__cell ${cellStatus}`}>{userRolesString}</td>
                <td className={`table__cell ${cellStatus}`}>
                    <button
                        className="icon-button table__button"
                        onClick={handleEdit}
                    >
                        <FaTwitter  icon={FaBars} />
                    </button>
                </td>
            </tr>
        )

    } else return null 

}

export default User
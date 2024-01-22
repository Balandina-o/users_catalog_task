import React, { useContext } from 'react'
import classes from "./Table.module.css"
import PropTypes from 'prop-types'
import { Context } from "../index";

const Table = ({ columns, setShowCreateUserModal, getIdChoosenUser }) => {
    const { users } = useContext(Context);

    function rowOnClick(id) {
        setShowCreateUserModal(true)
        getIdChoosenUser(id);
    }

    return (
        <table className={classes.table}>
            <thead>
                <tr>
                    {columns.map((item, index) => <th key={index}>{item.heading}</th>)}
                </tr>
            </thead>
            <tbody>
                <>
                    {users.usersList1.map((user) => {
                        return (
                            <React.Fragment key={user.id}>
                                <tr onClick={() => rowOnClick(user.id)}>
                                    <td>{user.lastName} {user.firstName} {user.maidenName}</td>
                                    <td>{user.age}</td>
                                    <td>{user.gender}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.address.city}, {removeIndexFromAddress(user.address.address)}</td>
                                </tr>
                            </React.Fragment>
                        )
                    })}
                </>
            </tbody>
        </table>

    )
}

function removeIndexFromAddress(line) { //Адрес - "город и название улицы", поэтому избавляемся от цифр в начале строки
    let result;
    let lineArr = line.split(' ');
    lineArr.shift()
    result = lineArr.join(" ");
    return result;
}

Table.propTypes = {
    setShowCreateUserModal: PropTypes.func,
    getIdChoosenUser: PropTypes.func,
    columns: PropTypes.array,
}

export default Table


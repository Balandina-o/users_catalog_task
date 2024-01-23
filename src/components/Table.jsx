import React, { useContext } from 'react'
import classes from "./Table.module.css"
import PropTypes from 'prop-types'
import { Context } from "../index";
import { removeIndexFromAddress } from "../operations/DataTableOperations"

const Table = ({ columns, setShowCreateUserModal, getIdChosenUser }) => {
    const { users } = useContext(Context);

    // id - номер пользователся, на строку которого кликнули. Вызов модального окна и передача id на уровень выше
    function rowOnClick(id) {
        setShowCreateUserModal(true)
        getIdChosenUser(id);
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

Table.propTypes = {
    setShowCreateUserModal: PropTypes.func,
    getIdChosenUser: PropTypes.func,
    columns: PropTypes.array, //массив заголовков
}

export default Table


import React, { useContext, useEffect } from 'react'
import classes from "./Table.module.css"
import PropTypes from 'prop-types'
import { Context } from "../index";

const Table = ({ columns }) => {
    const { users } = useContext(Context);

    useEffect(() => {
        // console.log("muda ", JSON.parse(JSON.stringify(users.usersList1)));
    }, []);

    return (
        <table className={classes.table}>
            <thead>
                <tr>
                    {columns.map((item, index) => <th key={index}>{item.heading}</th>)}
                </tr>
            </thead>
            <tbody>
                <>
                    {JSON.parse(JSON.stringify(users.usersList1)).map((user) => {
                        return (
                            <React.Fragment key={user.id}>
                                <tr>
                                    <td>{user.id}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.maidenName}</td>
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
    columns: PropTypes.array,
}

export default Table


import React from 'react'
import classes from "./TopBar.module.css"

const TopBar = () => {
    return (
        <div className={classes.first_div}>
            <div className={classes.second_div}>
                <label >Введите строку для поиска:</label>
                <input type="text" />
                <input type="button" value="Искать" />
            </div>
        </div>
    )
}

export default TopBar

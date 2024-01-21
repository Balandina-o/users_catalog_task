import React, { useState } from 'react'
import classes from "./TopBar.module.css"
import PropTypes from 'prop-types'

const TopBar = ({ search }) => {
    const [serchData, setSerchData] = useState([]);

    return (
        <div className={classes.first_div}>
            <div className={classes.second_div}>
                <label >Введите строку для поиска:</label>
                <input type="text" onChange={(event) => setSerchData(event.target.value)} />
                <input type="button" value="Искать" onClick={() => search(serchData)} />
            </div>
        </div>
    )
}

TopBar.propTypes = {
    search: PropTypes.func,
}

export default TopBar

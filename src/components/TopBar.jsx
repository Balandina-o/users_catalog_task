import React, { useState } from 'react'
import classes from "./TopBar.module.css"
import PropTypes from 'prop-types'

const TopBar = ({ search, startSortLvlUp }) => {
    const [serchData, setSerchData] = useState([]);

    const [changeField, setChangeField] = useState("lastName");
    const [changeType, setChangeType] = useState(0);

    function startSort() {
        console.log("changeField", changeField);
        console.log("changeType", changeType);
        startSortLvlUp(changeField, changeType);
    }

    return (
        <div className={classes.first_div}>
            <div className={classes.second_div}>
                <label >Введите строку для поиска:</label>
                <input type="text" onChange={(event) => setSerchData(event.target.value)} />
                <input type="button" value="Искать" onClick={() => search(serchData)} />

                <label >Поле для сортировки: </label>
                <select onChange={(event) => setChangeField(event.target.value)}>
                    <option value="lastName">ФИО</option>
                    <option value="age">Возраст</option>
                    <option value="gender">Пол</option>
                    <option value="address.city">Адрес</option>
                </select>

                <label >Тип сортировки: </label>
                <select onChange={(event) => setChangeType(event.target.value)}>
                    <option value="0"> Без сортировки</option>
                    <option value="2">{changeField == "age" ? "По возрастанию" : "В алфавитном порядке"}</option>
                    <option value="1">{changeField == "age" ? "По убыванию" : "В обратном алфавитном порядке"}</option>
                </select>
                <input className="buttonClose" type="button" value="Отсортировать" onClick={startSort} />
            </div>
        </div>
    )
}

TopBar.propTypes = {
    search: PropTypes.func,
    startSortLvlUp: PropTypes.func,
}

export default TopBar

import React, { useState } from 'react'
import classes from "./TopBar.module.css"
import PropTypes from 'prop-types'

const TopBar = ({ search, startSortLvlUp }) => {
    const [changeField, setChangeField] = useState("lastName");
    const [changeType, setChangeType] = useState("0");
    const [serchData, setSerchData] = useState([]);

    //при нажатии на кнопку поиска значения выпадающих списков возвращаются к начальным
    function startSearch() {
        search(serchData);
        setChangeField("lastName");
        setChangeType("0");
    }

    return (
        <div className={classes.first_div}>
            <div className={classes.second_div}>
                <label >Введите строку для поиска:</label>
                <input type="text" onChange={(event) => setSerchData(event.target.value)} />
                <input type="button" value="Искать" onClick={() => startSearch()} />

                <label >Поле для сортировки: </label>
                <select value={changeField} onChange={(event) => setChangeField(event.target.value)}>
                    <option value="lastName">ФИО</option>
                    <option value="age">Возраст</option>
                    <option value="gender">Пол</option>
                    <option value="address.city">Адрес</option>
                </select>

                <label >Тип сортировки: </label>
                <select value={changeType} onChange={(event) => setChangeType(event.target.value)}>
                    <option value="0"> Без сортировки</option>
                    <option value="2">{changeField == "age" ? "По возрастанию" : "В алфавитном порядке"}</option>
                    <option value="1">{changeField == "age" ? "По убыванию" : "В обратном алфавитном порядке"}</option>
                </select>
                <input className="buttonClose" type="button" value="Отсортировать"
                    onClick={() => startSortLvlUp(changeField, changeType)} />
            </div>
        </div>
    )
}

TopBar.propTypes = {
    search: PropTypes.func, //функция поиска по строке компонента-родителя, передаем туда значение input-а по нажатию кнопки 
    startSortLvlUp: PropTypes.func, //функция сортировки в родительском компоненте, передаем значения select-ов по нажатию кнопки
}

export default TopBar

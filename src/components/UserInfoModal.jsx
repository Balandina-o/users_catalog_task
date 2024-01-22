import React from 'react'
import PropTypes from 'prop-types'
import "../components/UserInfoModalStyle.css"

const UserInfoModal = ({ show, onClose, chosenUser }) => {
    return (
        <div className={show ? "modal show" : "modal"}>
            <div className="modal_content">
                <div className="header">
                    Информация о пользователе<b> {chosenUser.firstName} {chosenUser.lastName}</b>
                </div>
                <div className='content'>
                    <div>
                        ФИО: {chosenUser.lastName} {chosenUser.firstName} {chosenUser.maidenName}<br />
                        Возраст: {chosenUser.age}<br />
                        Адрес: {chosenUser.address && chosenUser.address.city},
                        {chosenUser.address && removeIndexFromAddress(chosenUser.address.address)}<br />
                        Рост: {chosenUser.height}<br />
                        Вес: {chosenUser.weight}<br />
                        Телефон: {chosenUser.phone}<br />
                        E-mail: {chosenUser.email}<br />
                    </div>

                    <img
                        src={chosenUser.image}
                        className="avatar"
                        alt="аватар пользователя"
                    />

                </div>
            </div>
            <div className='buttonDiv'>
                <input className="buttonClose" type="button" value="Закрыть" onClick={() => onClose()} />
            </div>
        </div >
    )
}

function removeIndexFromAddress(line) { //Адрес - "город и название улицы", поэтому избавляемся от цифр в начале строки
    let result;
    let lineArr = line.split(' ');
    lineArr.shift()
    result = lineArr.join(" ");
    return result;
}

UserInfoModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    chosenUser: PropTypes.object,
}

export default UserInfoModal

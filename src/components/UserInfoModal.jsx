import React from 'react'
import PropTypes from 'prop-types'
import "../components/UserInfoModalStyle.css"
import { removeIndexFromAddress } from "../operations/DataTableOperations"

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
                        Адрес: {chosenUser.address && chosenUser.address.city}
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

//если значение show - true => устанавливаем главному div-у дополнительный класс, отвечающий за увеличение модального окна
//onClose - присваивает состоянию окна модального окна значение false => окно закрывается
UserInfoModal.propTypes = {
    show: PropTypes.bool,
    onClose: PropTypes.func,
    chosenUser: PropTypes.object, //выбранный пользователь, информация о конором отображается в модальном окне
}

export default UserInfoModal

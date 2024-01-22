import React from 'react'
import PropTypes from 'prop-types'
import "../components/UserInfoModalStyle.css"

const UserInfoModal = ({ show, onClose }) => {

    return (
        <div className={show ? "modal show" : "modal"}>
            <div className="modal_content">
                Инфа о юзере
                <input type="button" value="Закрыть" onClick={() => onClose()} />
            </div>
        </div >
    )
}

UserInfoModal.propTypes = {
    show: PropTypes.func,
    onClose: PropTypes.func,
}

export default UserInfoModal

import React, { useEffect, useState, useContext } from "react";
import { sortingDataTable } from "./operations/DataTableOperations"
import UserInfoModal from '../src/components/UserInfoModal';
import TopBar from "./components/TopBar";
import Table from "./components/Table";
import { Context } from "./index";

function App() {
  const { users } = useContext(Context);

  const [showCreateUserModal, setShowCreateUserModal] = useState();
  const [chosenUser, setChosenUser] = useState({});
  const [dataTable, setDataTable] = useState([]);
  const [sortField, setSortField] = useState("lastName");
  const [sortType, setSortType] = useState(0);

  const columns = [ //Массив объектов с заголовками столбцов таблицы
    { heading: "ФИО" },
    { heading: "Возраст" },
    { heading: "Пол" },
    { heading: "Номер телефона" },
    { heading: "Адрес" }
  ]

  function sorting(field, type) {
    setSortType(type);
    setSortField(field);
    users.setUsersList(sortingDataTable(field, type, dataTable));
    console.log(sortField);
    console.log(sortType);
  }

  //id - идентификатор пользователя, по строке которого кликнули
  function getIdChosenUser(id) {
    try {
      fetch('https://dummyjson.com/users/' + id)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 404) {//отлавливается ошибка со статусом 404, для остальных случаев - общее сообщение
            return Promise.reject('Ошибка 404. Невозможно получить данные по указанному URL')
          } else {
            return Promise.reject('Запрос к серверу завершился ошибкой. Статусный код ответа за пределами диапазона 200-299')
          }
        })
        .then((data) => {
          setChosenUser(data);
        });
    } catch (e) {
      console.log(e);
    }
  }

  // searchString - строка, по которой осуществляется поиск по таблице
  function SearchData(searchString) {
    try {
      fetch('https://dummyjson.com/users/search?q=' + searchString)
        .then(res => {
          if (res.ok) {
            return res.json();
          } else if (res.status === 404) {
            return Promise.reject('Ошибка 404. Невозможно получить данные по указанному URL')
          } else {
            return Promise.reject('Запрос к серверу завершился ошибкой. Статусный код ответа за пределами диапазона 200-299')
          }
        })
        .then((data) => {
          if (data.users.length == 0) {
            users.setUsersList([]);
            setDataTable([])
          }
          for (let i = 0; i < data.users.length; ++i) {
            //условие, чтобы не отображались данные извне таблицы (id > 30)
            if (data.users[i].id & data.users[i].id >= 30) {
              data.users.splice([i], 1)
            }
            users.setUsersList(data.users);
            setDataTable(data.users)
          }

        });
    } catch (e) {
      console.log(e);
    }
  }

  //получение актуального перечня данных по URL при открытии страницы
  function getData() {
    fetch('https://dummyjson.com/users')
      .then(res => {
        if (res.ok) {
          return res.json();
        } else if (res.status === 404) {
          return Promise.reject('Ошибка 404. Невозможно получить данные по указанному URL')
        } else {
          return Promise.reject('Запрос к серверу завершился ошибкой. Статусный код ответа за пределами диапазона 200-299')
        }
      })
      .then((data) => {
        users.setUsersList(data.users);
        setDataTable(data.users)
      })
      .catch((error) => {
        console.log(error)
      });
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <div className="App">
      <TopBar а
        search={(searchString) => { SearchData(searchString) }}
        startSortLvlUp={(field, type) => { sorting(field, type) }}
      />
      <Table
        data={dataTable}
        columns={columns}
        setShowCreateUserModal={setShowCreateUserModal}
        getIdChosenUser={getIdChosenUser}
      />
      <UserInfoModal
        show={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}
        chosenUser={chosenUser}
      />
    </div>
  );
}

export default App;

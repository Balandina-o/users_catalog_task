import React, { useEffect, useState, useContext } from "react";
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

  // field - поле, по которому сортируются данные, type - тип сортировки
  function sorting(field, type) {
    setSortType(type);
    setSortField(field);
    const sortedUsersList = [...dataTable] //массив - копия актуального перечня данных
    console.log(sortField);
    console.log(sortType);

    if (field == "age") {
      sortedUsersList.sort((a, b) => a[field] - b[field])

      //город - вложенный аттрибут => делим его по "." и сравниваем последовательно обе части
    } else if (field == "address.city") {
      let prop = field.split('.');
      var len = prop.length;

      sortedUsersList.sort((a, b) => {
        var i = 0;
        while (i < len) { a = a[prop[i]]; b = b[prop[i]]; i++; }
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
    }
    else {
      sortedUsersList.sort((a, b) => a[field].localeCompare(b[field]))
    }
    users.setUsersList(sortedUsersList);

    if (type == 0) { //без сортировки - помещаем в хранилище актуальный перечень данных
      users.setUsersList(dataTable);
    } else if (type == 1) {//сортировка "в обратном алфавитном порядке"
      users.setUsersList(sortedUsersList.reverse());
    } else {
      users.setUsersList(sortedUsersList);
    }
  }

  //id - идентификатор пользователя, по строке которого кликнули. Функция для модального окна с подробной информацией
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
          users.setChosenUser(data);
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
          users.setUsersList(data.users);
          setDataTable(data.users)
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
        startSortLvlUp={sorting}
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

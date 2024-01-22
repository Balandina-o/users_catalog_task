import React, { useEffect, useState, useContext } from "react";
import TopBar from "./components/TopBar";
import Table from "./components/Table";
import { Context } from "./index";
import "../src/App.css";
import UserInfoModal from '../src/components/UserInfoModal';

function App() {
  const [showCreateUserModal, setShowCreateUserModal] = useState();
  const { users } = useContext(Context);
  const [dataTable, setDataTable] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);

  //console.log("Состояние ", dataTable);
  //console.log("В сторе ", users.usersList1);
  const columns = [
    { heading: "№" },
    { heading: "Фамилия" },
    { heading: "Имя" },
    { heading: "Отчество" },
    { heading: "Возраст" },
    { heading: "Пол" },
    { heading: "Номер телефона" },
    { heading: "Адрес" }
  ]


  async function SearchData(searchString) {
    console.log(searchString);

    const response = await fetch('https://dummyjson.com/users/search?q=' + searchString)
    const data = await response.json();
    console.log("Поиск: ", data.users);
    setFilteredData(data.users)
    console.log(FilteredData);
    users.setUsersList(data.users);
    setDataTable(data.users)

  }

  async function getData() {
    try {
      fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then((data) => {
          users.setUsersList(data.users);
          setDataTable(data.users)
        });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    getData();
  }, []);


  return (
    <div className="App">
      <TopBar search={(searchString) => { SearchData(searchString) }} />
      <Table data={dataTable} columns={columns} setShowCreateUserModal={setShowCreateUserModal} />
      <UserInfoModal
        show={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)} />
    </div>

  );
}

export default App;

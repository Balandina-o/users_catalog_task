import React, { useEffect, useState, useContext } from "react";
import TopBar from "./components/TopBar";
import Table from "./components/Table";
import { Context } from "./index";
import "../src/App.css";
import UserInfoModal from '../src/components/UserInfoModal';

function App() {
  const [showCreateUserModal, setShowCreateUserModal] = useState();
  const [chosenUserId, setChosenUserId] = useState();
  const [chosenUser, setChosenUser] = useState({});
  const { users } = useContext(Context);
  const [dataTable, setDataTable] = useState([]);
  const [FilteredData, setFilteredData] = useState([]);

  const columns = [
    { heading: "№" },
    { heading: "ФИО" },
    { heading: "Возраст" },
    { heading: "Пол" },
    { heading: "Номер телефона" },
    { heading: "Адрес" }
  ]

  async function getIdChoosenUser(id) {
    setChosenUserId(id);

    try {
      fetch('https://dummyjson.com/users/' + id)
        .then(res => res.json())
        .then((data) => {
          users.setChosenUser(data);
          setChosenUser(data);
        });
    } catch (e) {
      console.log(e);
    }
  }

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
      <Table
        data={dataTable}
        columns={columns}
        setShowCreateUserModal={setShowCreateUserModal}
        getIdChoosenUser={getIdChoosenUser}
      />
      <UserInfoModal
        show={showCreateUserModal}
        onClose={() => setShowCreateUserModal(false)}
        chosenUserId={chosenUserId}
        chosenUser={chosenUser}
      />
    </div>

  );
}

export default App;

import React, { useEffect, useState, useContext } from "react";
import UserInfoModal from '../src/components/UserInfoModal';
import TopBar from "./components/TopBar";
import Table from "./components/Table";
import { Context } from "./index";
import "../src/App.css";

function App() {
  const { users } = useContext(Context);
  const [showCreateUserModal, setShowCreateUserModal] = useState();
  const [chosenUser, setChosenUser] = useState({});
  const [dataTable, setDataTable] = useState([]);
  const [sortField, setSortField] = useState("lastName");
  const [sortType, setSortType] = useState(0);

  const columns = [
    { heading: "ФИО" },
    { heading: "Возраст" },
    { heading: "Пол" },
    { heading: "Номер телефона" },
    { heading: "Адрес" }
  ]

  function startSortLvlUp(field, type) {
    setSortType(type);
    setSortField(field);
    const sortedUsersList = [...dataTable]
    console.log(sortField);
    console.log(sortType);

    if (field == "age") {
      sortedUsersList.sort((a, b) => a[field] - b[field])

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

    if (type == 0) {
      users.setUsersList(dataTable);
    } else if (type == 1) {
      users.setUsersList(sortedUsersList.reverse());
    } else {
      users.setUsersList(sortedUsersList);
    }
  }

  function getIdChosenUser(id) {
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

  function SearchData(searchString) {
    try {
      fetch('https://dummyjson.com/users/search?q=' + searchString)
        .then(res => res.json())
        .then((data) => {
          users.setUsersList(data.users);
          setDataTable(data.users)
        });
    } catch (e) {
      console.log(e);
    }
  }

  function getData() {
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
      <TopBar
        search={(searchString) => { SearchData(searchString) }}
        startSortLvlUp={startSortLvlUp}
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

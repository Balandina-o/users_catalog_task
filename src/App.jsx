import React, { useEffect, useState, useContext } from "react";
import TopBar from "./components/TopBar";
import Table from "./components/Table";
import { Context } from "./index";
import "../src/App.css";

function App() {
  const { users } = useContext(Context);
  const [dataTable, setDataTable] = useState([]);

  // console.log("Состояние ", dataTable);
  // console.log("В сторе ", JSON.parse(JSON.stringify(users.usersList1)));
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

  }

  async function getData() {
    try {
      const response = await fetch('https://dummyjson.com/users')
      const data = await response.json();
      console.log("Полученные данные: ", data.users);

      users.setUsersList(data.users);
      setDataTable(data.users)

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
      <Table data={dataTable} columns={columns} />
    </div>

  );
}

export default App;

import React, { useEffect, useState, useContext } from "react";
import "../src/App.css";
import TopBar from "./components/TopBar";
import Table from "./components/Table";
import { Context } from "./index";

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
      <TopBar />
      <Table data={dataTable} columns={columns} />
    </div>

  );
}

export default App;

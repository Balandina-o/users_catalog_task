// import { makeAutoObservable } from "mobx";

class UsersStore {
    usersList = [];

    // constructor() {
    //     makeAutoObservable(this);
    // }

    get usersList1() {
        return this.usersList;
    }

    setUsersList(users) {
        this.usersList = users;
    }

}
export default UsersStore;

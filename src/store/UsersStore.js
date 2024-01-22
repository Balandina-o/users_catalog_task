// import { makeAutoObservable } from "mobx";

class UsersStore {
    usersList = [];
    filteredUsersList = [];

    // constructor() {
    //     makeAutoObservable(this);
    // }

    get usersList1() {
        return this.usersList;
    }

    setUsersList(users) {
        this.usersList = users;
    }

    setFilteredUsersList(filtUsers) {
        this.filteredUsersList = filtUsers;
    }

}
export default UsersStore;

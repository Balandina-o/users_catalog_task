// import { makeAutoObservable } from "mobx";

class UsersStore {
    usersList = [];
    filteredUsersList = [];
    chosenUser = {};

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

    setChosenUser(user) {
        this.chosenUser = user;
    }
}
export default UsersStore;

class UsersStore {
    usersList = [];
    chosenUser = {};

    get usersList1() {
        return this.usersList;
    }

    setUsersList(users) {
        this.usersList = users;
    }

    setChosenUser(user) {
        this.chosenUser = user;
    }
}
export default UsersStore;

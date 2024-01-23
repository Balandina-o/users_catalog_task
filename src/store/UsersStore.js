class UsersStore {
    usersList = []; //актуальный массив пользователей

    get usersList1() {
        return this.usersList;
    }

    setUsersList(users) {
        this.usersList = users;
    }

}
export default UsersStore;

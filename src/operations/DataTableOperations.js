const operations = {
    sortingDataTable: function (field, type, dataTable) {
        const sortedUsersList = [...dataTable] //массив - копия актуального перечня данных

        if (field == "age") {
            sortedUsersList.sort((a, b) => a[field] - b[field])

            //city - аттрибут вложенного объекта => делим его по "." и сортируем последовательно по уровням вложенности
        } else if (field == "address.city") {
            let prop = field.split('.');
            var len = prop.length;

            sortedUsersList.sort((a, b) => {
                var i = 0;
                while (i < len) {
                    a = a[prop[i]]; b = b[prop[i]]; i++;
                }
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

        if (type == 0) { //без сортировки - помещаем в хранилище актуальный перечень данных
            return dataTable;
        } else if (type == 1) {//сортировка "в обратном алфавитном порядке"
            return sortedUsersList.reverse();
        } else {
            return sortedUsersList;
        }
    },
    //Адрес - "город и название улицы", поэтому избавляемся от цифр в начале строки
    removeIndexFromAddress: function (line) {
        let result;
        let lineArr = line.split(' ');
        lineArr.shift()
        result = lineArr.join(" ");
        return result;
    }
}

export const sortingDataTable = operations.sortingDataTable;
export const removeIndexFromAddress = operations.removeIndexFromAddress;
const logoutButton = new LogoutButton();
const ratesBoard = new RatesBoard();
const moneyManager = new MoneyManager();
const favoritesWidget = new FavoritesWidget();

logoutButton.action = () => ApiConnector.logout(function (response) {
    if (response.success) {
        location.reload();
    }
});

ApiConnector.current(function (response) {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

function requestReceiveRates() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
setInterval(requestReceiveRates(), 60000);

moneyManager.addMoneyCallback((data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Баланс успешно пополнен");
        } else {
            // Если запрос не успешен, выводим ошибку в окно для ошибок
            moneyManager.setMessage(false, response.error);
        }
    });
});

moneyManager.conversionMoneyCallback((data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Конвертация валюты выполнена успешно");
        } else {
            // Если запрос не успешен, выводим ошибку в окно для ошибок
            moneyManager.setMessage(false, response.error);
        }
    });
});

moneyManager.sendMoneyCallback((data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManager.setMessage(true, "Перевод валюты выполнен успешно");
        } else {
            // Если запрос не успешен, выводим ошибку в окно для ошибок
            moneyManager.setMessage(false, response.error);
        }
    });
});

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        favoritesWidget.updateUsersList(response.data);
    }
});


favoritesWidget.addUserCallback((data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Вы успешно добавили пользователя");
        } else {
            // Если запрос не успешен, выводим ошибку в окно для ошибок
            favoritesWidget.setMessage(false, response.error);
        }
    });
});
favoritesWidget.removeUserCallback((data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            favoritesWidget.updateUsersList(response.data);
            favoritesWidget.setMessage(true, "Вы успешно удалили пользователя");
        } else {
            // Если запрос не успешен, выводим ошибку в окно для ошибок
            favoritesWidget.setMessage(false, response.error);
        }
    });
});

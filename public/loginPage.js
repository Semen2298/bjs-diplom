"use strict"

const userForm = new UserForm();

function handleLoginResponse(response) {
    // Проверяем успешность запроса
    if (response.success) {
        // Если успешно, обновляем страницу
        location.reload();
    } else {
        // Если запрос не успешен, выводим ошибку в окно для ошибок
        userForm.setLoginErrorMessage(response.error);
    }
}
// Присваиваем свойству loginFormCallback значение функции для авторизации пользователя
userForm.loginFormCallback = function(data) {
    // Выполняем запрос на сервер для авторизации пользователя
    ApiConnector.login(data, handleLoginResponse);
};



function handleRegisterResponse(response) {
    // Проверяем успешность запроса
    if (response.success) {
        // Если успешно, обновляем страницу
        location.reload();
    } else {
        // Если запрос не успешен, выводим ошибку в окно для ошибок
        userForm.setRegisterErrorMessage(response.error);
    }
}

userForm.registerFormCallback = function(data) {
    // Выполняем запрос на сервер для регистрации пользователя
    ApiConnector.register(data, handleRegisterResponse);
};
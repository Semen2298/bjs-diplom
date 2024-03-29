"use strict"

const userForm = new UserForm();

function handleLoginResponse(response) {
    if (response.success) {
        location.reload();
    } else {
        userForm.setLoginErrorMessage(response.error);
    }
}
userForm.loginFormCallback = function(data) {
    ApiConnector.login(data, handleLoginResponse);
};



function handleRegisterResponse(response) {
    if (response.success) {
        location.reload();
    } else {
        userForm.setRegisterErrorMessage(response.error);
    }
}

userForm.registerFormCallback = function(data) {
    ApiConnector.register(data, handleRegisterResponse);
};
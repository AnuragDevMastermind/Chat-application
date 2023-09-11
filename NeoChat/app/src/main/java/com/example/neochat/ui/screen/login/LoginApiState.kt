package com.example.neochat.ui.screen.login

import com.example.neochat.api.login.LoginResponse

sealed class LoginApiState {
    class Success(val loginResponse: LoginResponse):LoginApiState()
    class Failure(val msg: String): LoginApiState()
    object Loading : LoginApiState()
    object Empty : LoginApiState()
}
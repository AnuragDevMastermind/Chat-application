package com.example.neochat.ui.screen.splash

sealed class AuthenticateApiState{
    class Success(val data: String): AuthenticateApiState()
    class Failure(val msg: String): AuthenticateApiState()
    object Loading : AuthenticateApiState()
    object Empty : AuthenticateApiState()
}

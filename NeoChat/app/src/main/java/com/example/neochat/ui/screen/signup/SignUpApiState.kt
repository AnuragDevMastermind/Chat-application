package com.example.neochat.ui.screen.signup

sealed class SignUpApiState {
    class Success(val data: String):SignUpApiState()
    class Failure(val msg: String): SignUpApiState()
    object Loading : SignUpApiState()
    object Empty : SignUpApiState()
}
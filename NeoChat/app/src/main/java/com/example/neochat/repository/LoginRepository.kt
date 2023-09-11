package com.example.neochat.repository

import com.example.neochat.api.Api
import com.example.neochat.api.login.Login

class LoginRepository {
    private val loginApi = Api.createLoginApi
    suspend fun login(login: Login) = loginApi.login(login = login)
}
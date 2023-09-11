package com.example.neochat.repository

import com.example.neochat.api.Api

class AuthenticateRepository {
    private val authenticateApi = Api.createAuthApi
    suspend fun authenticate(token: String) = authenticateApi.authenticate(token = token)
}
package com.example.neochat.repository

import com.example.neochat.api.Api

class AllUsersRepository {
    private val allUsersApi = Api.createAllUsersApi
    suspend fun allUser() = allUsersApi.allUsers()
}
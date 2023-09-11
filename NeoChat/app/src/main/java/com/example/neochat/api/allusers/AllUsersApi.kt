package com.example.neochat.api.allusers

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface AllUsersApi {

    @POST("users")
    suspend fun allUsers(): Response<AllUsersResponse>
}
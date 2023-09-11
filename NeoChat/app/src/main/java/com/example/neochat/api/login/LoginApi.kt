package com.example.neochat.api.login

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface LoginApi {
    @POST("signin")
    suspend fun login(
        @Body login: Login
    ): Response<LoginResponse>
}
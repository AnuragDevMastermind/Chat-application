package com.example.neochat.api.authenticate

import retrofit2.Response
import retrofit2.http.GET
import retrofit2.http.Header


interface AuthenticateApi {

    @GET("authenticate")
    suspend fun authenticate(
        @Header("Authorization") token: String
    ): Response<Unit>
}
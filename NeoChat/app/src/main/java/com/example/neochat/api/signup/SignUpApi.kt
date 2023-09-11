package com.example.neochat.api.signup

import retrofit2.Response
import retrofit2.http.Body
import retrofit2.http.POST

interface SignUpApi {

    @POST("signup")
    suspend fun signUp(
        @Body signUp: SignUp
    ): Response<Unit>
}
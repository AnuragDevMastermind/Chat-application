package com.example.neochat.repository

import com.example.neochat.api.Api
import com.example.neochat.api.signup.SignUp

class SignUpRepository {
    private val signUpApi = Api.createSignUpApi
    suspend fun signUp(signUp: SignUp) = signUpApi.signUp(signUp = signUp)
}
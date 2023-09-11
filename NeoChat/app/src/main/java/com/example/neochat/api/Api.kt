package com.example.neochat.api

import com.example.neochat.api.allusers.AllUsersApi
import com.example.neochat.api.authenticate.AuthenticateApi
import com.example.neochat.api.chat.ChatApi
import com.example.neochat.api.inbox.InboxApi
import com.example.neochat.api.login.LoginApi
import com.example.neochat.api.signup.SignUpApi
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory

object Api {
    private const val BASE_URL = "http://10.0.2.2:8080/" // http://10.0.2.2:8080/ in place of http://127.0.0.1:8080

    private val retrofit = Retrofit.Builder().baseUrl(BASE_URL).addConverterFactory(
        GsonConverterFactory.create()
    ).build()

    val createSignUpApi : SignUpApi by lazy {
        retrofit.create(SignUpApi::class.java)
    }

    val createLoginApi : LoginApi by lazy {
        retrofit.create(LoginApi::class.java)
    }

    val createAuthApi : AuthenticateApi by lazy {
        retrofit.create(AuthenticateApi::class.java)
    }

    val createInboxApi : InboxApi by lazy {
        retrofit.create(InboxApi::class.java)
    }

    val createChatApi : ChatApi  by lazy {
        retrofit.create(ChatApi::class.java)
    }

    val createAllUsersApi : AllUsersApi by lazy {
        retrofit.create(AllUsersApi::class.java)
    }
}
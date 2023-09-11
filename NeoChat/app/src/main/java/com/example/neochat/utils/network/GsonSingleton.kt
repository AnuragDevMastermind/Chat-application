package com.example.neochat.utils.network

import com.google.gson.Gson

class GsonSingleton private constructor() {
    companion object {
        @Volatile
        private var INSTANCE: Gson? = null

        @Synchronized
        operator fun invoke(): Gson = INSTANCE ?: Gson().also { INSTANCE = it }
    }
}
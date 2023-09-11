package com.example.neochat.utils.network

import java.io.IOException


class NoConnectivityException : IOException() {
    override val message: String
        get() = "Please Check Your Internet Connection"
}
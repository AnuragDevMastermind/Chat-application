package com.example

import com.example.config.configureRouting
import com.example.database.DatabaseFactory
import com.example.plugin.configureSecurity
import com.example.plugin.configureSockets
import io.ktor.serialization.gson.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}
fun Application.module() {
    DatabaseFactory.init()
    install(ContentNegotiation) {
        gson {
            setPrettyPrinting()
        }
    }
    configureSecurity()
    configureSockets()
    configureRouting()

}

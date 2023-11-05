package com.example

import com.example.config.configureRouting
import com.example.database.DatabaseFactory
import com.example.plugin.configureSecurity
import com.example.plugin.configureSockets
import io.ktor.http.*
import io.ktor.serialization.gson.*
import io.ktor.server.application.*
import io.ktor.server.plugins.contentnegotiation.*
import io.ktor.server.plugins.cors.routing.*

fun main(args: Array<String>) {
    io.ktor.server.netty.EngineMain.main(args)
}

fun Application.module() {
    DatabaseFactory.init()
    install(CORS) {
        anyHost()
        allowMethod(HttpMethod.Options)
        allowMethod(HttpMethod.Put)
        allowMethod(HttpMethod.Patch)
        allowMethod(HttpMethod.Delete)
        allowHeader(HttpHeaders.ContentType)
        allowHeader(HttpHeaders.Authorization)
    }
    install(ContentNegotiation) {
        gson {
            setPrettyPrinting()
        }
    }
    configureSecurity()
    configureSockets()
    configureRouting()

}

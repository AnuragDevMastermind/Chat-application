package com.example.database

import com.example.model.Inboxes
import com.example.model.Messages
import com.example.model.Users
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.withContext
import org.jetbrains.exposed.sql.Database
import org.jetbrains.exposed.sql.SchemaUtils
import org.jetbrains.exposed.sql.transactions.transaction
import java.sql.Connection

object DatabaseFactory {

    private val database by lazy {
        Database.connect(
            url = "jdbc:postgresql://localhost:5432/neochat",
            driver = "org.postgresql.Driver",
            user = "postgres",
            password = "postgres"
        )
    }

    fun init() {
        transaction(database) {
            SchemaUtils.create(Users)
            SchemaUtils.create(Inboxes)
            SchemaUtils.create(Messages)
        }
    }

    fun getConnection() = database.connector.invoke().connection as Connection

    suspend fun <T> dbQuery(block: () -> T): T =
        withContext(Dispatchers.IO) {
            transaction {
                block()
            }
        }
}
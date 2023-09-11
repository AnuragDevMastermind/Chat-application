package com.example.model

import kotlinx.serialization.Serializable
import org.jetbrains.exposed.sql.Table

@Serializable
data class User(
    val userId: Long,
    val name: String,
    val mobileNo: String,
    val password: String,
    val salt: String
)

object Users : Table() {
    val userId = long("user_id").autoIncrement()
    val name = varchar("name", 128)
    val mobileNo = text("mobile_no")
    val password = text("password")
    val salt = text("salt")

    override val primaryKey = PrimaryKey(userId)
}
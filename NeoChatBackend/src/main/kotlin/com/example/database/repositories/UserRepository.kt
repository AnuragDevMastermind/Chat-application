package com.example.database.repositories

import com.example.database.DatabaseFactory
import com.example.model.AuthSignUpRequest
import com.example.model.SaltedHash
import com.example.model.User
import com.example.model.Users
import org.jetbrains.exposed.sql.ResultRow
import org.jetbrains.exposed.sql.insert
import org.jetbrains.exposed.sql.select
import org.jetbrains.exposed.sql.selectAll

object UserRepository {

    suspend fun getUserByMobileNumber(mobileNo: String) =  DatabaseFactory.dbQuery {
        Users.select { Users.mobileNo eq mobileNo }.firstOrNull()?.toUser()
    }


    suspend fun getAllUsers() = DatabaseFactory.dbQuery {
        Users.selectAll().mapNotNull { resultRow ->
            resultRow.toUser()
        }
    }

    suspend fun insertUser(
        authSignUpRequest: AuthSignUpRequest,
        saltedHash: SaltedHash
    ) = DatabaseFactory.dbQuery {
        Users.insert {
            it[name] = authSignUpRequest.name
            it[mobileNo] = authSignUpRequest.mobileNo
            it[password] = saltedHash.hash
            it[salt] = saltedHash.salt
        }.resultedValues!!.first().toUser()
    }

    private fun ResultRow.toUser() = User(
        userId = this[Users.userId],
        name = this[Users.name],
        mobileNo = this[Users.mobileNo],
        password = this[Users.password],
        salt = this[Users.salt]
    )
}
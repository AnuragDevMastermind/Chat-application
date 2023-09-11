package com.example.neochat.preference

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.core.edit
import androidx.datastore.preferences.core.stringPreferencesKey
import androidx.datastore.preferences.preferencesDataStore
import com.example.neochat.api.login.LoginResponse
import kotlinx.coroutines.flow.Flow
import kotlinx.coroutines.flow.map


class PrefUserDetail(private val context: Context) {
    companion object {
        private val Context.datastore: DataStore<Preferences> by preferencesDataStore("User")
        val USER_TOKEN_KEY = stringPreferencesKey("user_token")
        val USER_NAME = stringPreferencesKey("user_name")
        val USER_MOBILE_NO = stringPreferencesKey("user_number")
        val USER_ID = stringPreferencesKey("user_id")
    }

    val getUserToken: Flow<String?> = context.datastore.data
        .map {
            it[USER_TOKEN_KEY] ?: ""
        }
    val getUserName: Flow<String?> = context.datastore.data
        .map {
            it[USER_NAME] ?: ""
        }
    val getUserMobileNo: Flow<String?> = context.datastore.data
        .map {
            it[USER_MOBILE_NO] ?: ""
        }
    val userId: Flow<String?> = context.datastore.data
        .map {
            it[USER_ID] ?: ""
        }

    suspend fun saveUserDetail(loginResponse: LoginResponse) {
        context.datastore.edit {
            it[USER_TOKEN_KEY] = loginResponse.token
            it[USER_NAME] = loginResponse.user.name
            it[USER_MOBILE_NO] = loginResponse.user.mobileNo
            it[USER_ID] = loginResponse.user.userId.toString()
        }
    }

    suspend fun clearUserDetail(){
        context.datastore.edit {
            it[USER_TOKEN_KEY] = ""
            it[USER_NAME] = ""
            it[USER_MOBILE_NO] = ""
            it[USER_ID] = ""
        }
    }

}
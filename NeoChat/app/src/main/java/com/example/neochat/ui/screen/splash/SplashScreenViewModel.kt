package com.example.neochat.ui.screen.splash

import android.util.Log
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.neochat.repository.AuthenticateRepository
import com.example.neochat.utils.network.handleApi
import com.example.neochat.utils.network.onError
import com.example.neochat.utils.network.onException
import com.example.neochat.utils.network.onSuccess
import kotlinx.coroutines.launch

class SplashScreenViewModel: ViewModel() {

    private val authenticateRepository = AuthenticateRepository()
    val authenticateApiState: MutableState<AuthenticateApiState> = mutableStateOf(AuthenticateApiState.Empty)

    fun initiateAuthentication(token: String){
        viewModelScope.launch {
            authenticateApiState.value = AuthenticateApiState.Loading
            Log.d("authenticateTAG", "initiateAuthentication: started")
            handleApi {
                authenticateRepository.authenticate(token = token)
            }.onSuccess { response, code ->
                Log.d("authenticateTAG", "initiateAuthentication: success, response: success, code: $code")
                authenticateApiState.value = AuthenticateApiState.Success(data = "Success")
            }.onError { code, message, data, errorBody ->
                Log.d("authenticateTAG", "initiateAuthentication: failed error, msg: $message, code: $code")
                authenticateApiState.value = AuthenticateApiState.Failure(msg = "failed")
            }.onException {
                Log.d("authenticateTAG", "initiateAuthentication: ${it.message}")
                authenticateApiState.value = AuthenticateApiState.Failure(msg = "failed")
            }
        }
    }
}
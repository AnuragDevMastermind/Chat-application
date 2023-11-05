package com.example.neochat.ui.screen.login

import android.util.Log
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.neochat.api.login.Login
import com.example.neochat.repository.LoginRepository
import com.example.neochat.utils.network.handleApi
import com.example.neochat.utils.network.onError
import com.example.neochat.utils.network.onException
import com.example.neochat.utils.network.onSuccess
import kotlinx.coroutines.launch

class LoginScreenViewModel: ViewModel() {

    private val nameTxt = mutableStateOf("")
    fun getNumber() = nameTxt.value
    fun setNumber(txt: String){
        nameTxt.value = txt
    }

    
    private val passwordTxt = mutableStateOf("")
    fun getPassword() = passwordTxt.value
    fun setPassword(password: String){
        passwordTxt.value = password
    }

    
    private val loginRepository = LoginRepository()
    val loginApiState : MutableState<LoginApiState> = mutableStateOf(LoginApiState.Empty)

    fun initiateLogin(){
        viewModelScope.launch {
            loginApiState.value = LoginApiState.Loading
            Log.d("loginTAG", "initiateLogin: started")
            handleApi {
                loginRepository.login(
                    Login(
                        mobileNo = getNumber(),
                        password = getPassword()
                    )
                )
            }.onSuccess { response, code ->
                Log.d("loginTAG", "initiateLogin: success, response: $response, code: $code")
                loginApiState.value = LoginApiState.Success(loginResponse = response)

            }.onError { code, message, data, errorBody ->
                Log.d("loginTAG", "initiateLogin: failed error, msg: $message, code: $code")
                loginApiState.value = LoginApiState.Failure(msg = "failed")
            }.onException {
                Log.d("loginTAG", "initiateLogin: failed throwable: ${it.message}")
                loginApiState.value = LoginApiState.Failure(msg = "failed")
            }
        }
    }

}
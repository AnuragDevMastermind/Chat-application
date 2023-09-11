package com.example.neochat.ui.screen.signup

import android.util.Log
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.neochat.api.signup.SignUp
import com.example.neochat.repository.SignUpRepository
import com.example.neochat.utils.network.handleApi
import com.example.neochat.utils.network.onError
import com.example.neochat.utils.network.onException
import com.example.neochat.utils.network.onSuccess
import kotlinx.coroutines.launch

class SignUpScreenViewModel : ViewModel() {

    private val nameTxt = mutableStateOf("")
    fun getName() = nameTxt.value
    fun setName(txt: String) {
        nameTxt.value = txt
    }

    //----------------------------------------------------------------------------------------------
    private val numberTxt = mutableStateOf("")
    fun getNumber() = numberTxt.value
    fun setNumber(number: String) {
        numberTxt.value = number
    }

    //----------------------------------------------------------------------------------------------
    private val passwordTxt = mutableStateOf("")
    fun getPassword() = passwordTxt.value
    fun setPassword(password: String) {
        passwordTxt.value = password
    }


    //----------------------------------------------------------------------------------------------
    private val signUpRepository = SignUpRepository()
    val signUpApiState: MutableState<SignUpApiState> = mutableStateOf(SignUpApiState.Empty)

    fun initiateSignUp() {
        viewModelScope.launch {
            signUpApiState.value = SignUpApiState.Loading
            Log.d("signupTAG", "initiateSignUp: started")
            handleApi {
                signUpRepository.signUp(
                    SignUp(
                        name = getName(),
                        mobileNo = getNumber(),
                        password = getPassword()
                    )
                )
            }.onSuccess { response, code ->
                Log.d("signupTAG", "initiateSignUp: success, response: Unit, responseCode: $code")
                signUpApiState.value = SignUpApiState.Success("Account created successfully")
            }.onError { code, message, data, errorBody ->
                Log.d("signupTAG", "initiateSignUp: failed error, msg: $message, code: $code")
                signUpApiState.value = SignUpApiState.Failure("failed")
            }.onException {
                Log.d("signupTAG", "initiateSignUp: failed throwable: ${it.message}")
                signUpApiState.value = SignUpApiState.Failure("failed")
            }
        }
    }
}
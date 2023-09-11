package com.example.neochat.ui.screen.selectcontact

import android.util.Log
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.neochat.repository.AllUsersRepository
import com.example.neochat.utils.network.handleApi
import com.example.neochat.utils.network.onError
import com.example.neochat.utils.network.onException
import com.example.neochat.utils.network.onSuccess
import kotlinx.coroutines.launch

class SelectContactScreenViewModel: ViewModel() {
    private val allUsersRepository = AllUsersRepository()
    val allUsersApiState: MutableState<AllUsersApiState> = mutableStateOf(AllUsersApiState.Empty)

    fun initiateAllUser(){
        viewModelScope.launch {
            allUsersApiState.value = AllUsersApiState.Loading
            handleApi {
                allUsersRepository.allUser()
            }.onSuccess { allUsersResponse, code ->
                Log.d("allUserTAG", "initiateAllUser: success, response: success, code: $code")
                allUsersApiState.value = AllUsersApiState.Success(allUsersResponse = allUsersResponse)
            }.onError { code, message, data, errorBody ->
                Log.d("allUserTAG", "initiateAllUser: failed error, msg: $message, code: $code")
                allUsersApiState.value = AllUsersApiState.Failure("failed")
            }.onException {
                Log.d("allUserTAG", "initiateAllUser: ${it.message}")
                allUsersApiState.value = AllUsersApiState.Failure("failed")
            }
        }
    }
}
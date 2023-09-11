package com.example.neochat.ui.screen.inbox

import android.util.Log
import androidx.compose.runtime.MutableState
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import com.example.neochat.repository.InboxRepository
import com.example.neochat.utils.network.NoConnectivityException
import com.example.neochat.utils.network.handleApi
import com.example.neochat.utils.network.onError
import com.example.neochat.utils.network.onException
import com.example.neochat.utils.network.onSuccess
import kotlinx.coroutines.launch

class InboxViewModel: ViewModel() {
    private val inboxRepository = InboxRepository()
    val inboxApiState: MutableState<InboxApiState> = mutableStateOf(InboxApiState.Empty)

    fun initiateInbox(userId: Int){
        viewModelScope.launch {
            inboxApiState.value = InboxApiState.Loading
            Log.d("inboxTAG", "initiateInbox: started")
            handleApi {
                inboxRepository.getInboxList(userId = userId)
            }.onSuccess { response, code ->
                Log.d("inboxTAG", "initiateInbox: , response: success, code: $code\"")
                inboxApiState.value = InboxApiState.Success(inboxLst = response)
            }.onError { code, message, data, errorBody ->
                Log.d("inboxTAG", "initiateInbox: failed error, msg: $message, code $code")
                inboxApiState.value = InboxApiState.Failure(msg = "failed")
            }.onException {
                if (it is NoConnectivityException){
                    Log.d("inboxTAG", "initiateInbox: failed error, no internet connectivity")
                    inboxApiState.value = InboxApiState.Failure(msg = "failed")
                }else{
                    Log.d("myTAG", "initiateInbox: failed throwable: ${it.message}")
                    inboxApiState.value = InboxApiState.Failure(msg = "failed")
                }
            }
        }
    }
}
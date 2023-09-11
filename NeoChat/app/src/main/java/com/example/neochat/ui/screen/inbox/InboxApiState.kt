package com.example.neochat.ui.screen.inbox

import com.example.neochat.api.inbox.InboxItem

sealed class InboxApiState {
    class Success(val inboxLst: ArrayList<InboxItem>):InboxApiState()
    class Failure(val msg: String): InboxApiState()
    object Loading : InboxApiState()
    object Empty : InboxApiState()
}
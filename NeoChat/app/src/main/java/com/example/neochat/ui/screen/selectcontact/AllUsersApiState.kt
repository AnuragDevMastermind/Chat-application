package com.example.neochat.ui.screen.selectcontact

import com.example.neochat.api.allusers.AllUsersResponse
import com.example.neochat.api.inbox.InboxItem

sealed class AllUsersApiState {
    class Success(val allUsersResponse: AllUsersResponse):AllUsersApiState()
    class Failure(val msg: String): AllUsersApiState()
    object Loading : AllUsersApiState()
    object Empty : AllUsersApiState()
}
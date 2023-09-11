package com.example.neochat.repository

import com.example.neochat.api.Api

class InboxRepository {
    private val inboxApi = Api.createInboxApi

    suspend fun getInboxList(userId: Int) = inboxApi.getInbox(userId = userId)
}
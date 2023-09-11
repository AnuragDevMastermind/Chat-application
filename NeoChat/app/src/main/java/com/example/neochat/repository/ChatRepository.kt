package com.example.neochat.repository

import com.example.neochat.api.Api
import com.example.neochat.pagination.ChatPaginationSource

class ChatRepository {
    private val chatApi = Api.createChatApi

    fun getChatPagingSource(inboxId: Int,userId: Int,friendId: Int) =
        ChatPaginationSource(chatApi = chatApi, userId = userId, friendId = friendId, inboxId = inboxId)
}
package com.example.neochat.api.chat

import retrofit2.Response
import retrofit2.http.POST
import retrofit2.http.Query

interface ChatApi {
    @POST("message/without-index")
    suspend fun getAllMessagesWithoutInbox(
        @Query("userId") userId: Int,
        @Query("friendId") friendId: Int,
        @Query("pageNo") pageNo: Int
    ): Response<AllMessageResponse>

    @POST("message")
    suspend fun getAllMessages(
        @Query("inboxId") inboxId: Int,
        @Query("pageNo") pageNo: Int
    ): Response<AllMessageResponse>
}
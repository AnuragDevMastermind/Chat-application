package com.example.neochat.ui.screen.chat

data class InboxUserChatDetail(
    val inboxId : Int = -1,
    val senderId: Int,
    val friendId: Int,
    val userName:String,
    val userId:Int,
    val friendName: String
)

package com.example.neochat.ui.screen.chat

import androidx.compose.runtime.mutableStateListOf
import androidx.compose.runtime.mutableStateOf
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import androidx.paging.Pager
import androidx.paging.PagingConfig
import androidx.paging.cachedIn
import com.example.neochat.api.chat.MessageItem
import com.example.neochat.repository.ChatRepository
import com.google.gson.Gson
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.WebSocket

class ChatViewModel: ViewModel() {

    private val webSocketListener = ChatWebSocketListener(vmChat = this)
    private val okHttpClient = OkHttpClient()
    private val webSocket = mutableStateOf<WebSocket?>(null)

    fun connectWebSocket(userId: Int) {
        webSocket.value = okHttpClient.newWebSocket(createRequest(userId = userId), webSocketListener)
    }

    fun sendMessageWebSocket(inboxUserChatDetail: InboxUserChatDetail) {
        webSocket.value?.send(
            "{\n" +
                    "\t\"message\": {\n" +
                    "\t\t\"inboxId\": ${inboxUserChatDetail.inboxId},\n" +
                    "\t\t\"text\": \"${getMessageTxt()}\",\n" +
                    "\t\t\"senderId\": ${inboxUserChatDetail.senderId},\n" +
                    "\t\t\"sentAt\": ${getCurrentTimeStamp()}\n" +
                    "\t},\n" +
                    "\t\"inbox\": {\n" +
                    "\t\t\"inboxId\": ${inboxUserChatDetail.inboxId},\n" +
                    "\t\t\"userId\": ${inboxUserChatDetail.userId},\n" +
                    "\t\t\"friendId\": ${inboxUserChatDetail.friendId},\n" +
                    "\t\t\"userName\": \"${inboxUserChatDetail.userName}\",\n" +
                    "\t\t\"friendName\": \"${inboxUserChatDetail.friendName}\"\n" +
                    "\t}\n" +
                    "}"
        )
    }

    fun disconnectWebSocket() {
        webSocket.value?.close(1000, "Canceled manually.")
    }

    fun clearWebSocket() {
        okHttpClient.dispatcher.executorService.shutdown()
    }

    private fun createRequest(userId: Int): Request {
        val websocketURL = "ws://10.0.2.2:8080/chat-socket?userId=${userId}" // ws://10.0.2.2:8080/ws
        //val websocketURL = "ws://10.0.2.2:8080/ws" // ws://10.0.2.2:8080/ws
        return Request.Builder()
            .url(websocketURL)
            .build()
    }

    

    private val chatRepository = ChatRepository()

    fun setMessagePager(inboxId: Int,userId: Int,friendId: Int) = Pager(
        PagingConfig(pageSize = 10)
    ){
        chatRepository.getChatPagingSource(userId = userId, friendId = friendId, inboxId = inboxId)
    }.flow.cachedIn(viewModelScope)


    
    private val messageResponseLst = mutableStateListOf<MessageItem>()

    fun getMessageResponseLst() = messageResponseLst
    fun setMessageResponseLst(msgTxt: String){
        val jsonString = msgTxt.trimIndent()
        val gson = Gson()
        val socketMsgResponse = gson.fromJson(jsonString,SocketMsgResponse::class.java)
        val messageItem =  socketMsgResponse.message
        messageResponseLst.add(index = 0, element =  messageItem)
        messageTxt.value = ""
    }

    

    private val socketStatus = mutableStateOf(value = false)
    fun getConnectionStatus() = socketStatus.value
    fun setConnectionStatus(connectionStatus: Boolean) {
        this.socketStatus.value = connectionStatus
    }
    

    private val messageTxt = mutableStateOf(value = "")
    fun getMessageTxt() = messageTxt.value
    fun setMessageTxt(msgTxt: String) {
        messageTxt.value = msgTxt
    }

    
    fun getCurrentTimeStamp() = System.currentTimeMillis()
}

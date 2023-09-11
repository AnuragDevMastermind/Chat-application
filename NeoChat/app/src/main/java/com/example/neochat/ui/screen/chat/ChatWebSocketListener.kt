package com.example.neochat.ui.screen.chat

import android.util.Log
import okhttp3.Response
import okhttp3.WebSocket
import okhttp3.WebSocketListener

class ChatWebSocketListener(
    private val vmChat : ChatViewModel
) : WebSocketListener() {

    override fun onOpen(webSocket: WebSocket, response: Response) {
        super.onOpen(webSocket, response)
        vmChat.setConnectionStatus(true)
        //webSocket.send("Android Device Connected")
        Log.d("myTAG", "onOpen:$response")
    }

    override fun onMessage(webSocket: WebSocket, text: String) {
        super.onMessage(webSocket, text)
        vmChat.setMessageResponseLst(msgTxt = text)
        Log.d("myTAG", "onMessage: $text")
    }

    override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
        super.onClosing(webSocket, code, reason)
        Log.d("myTAG", "onClosing: $code $reason")
    }

    override fun onClosed(webSocket: WebSocket, code: Int, reason: String) {
        super.onClosed(webSocket, code, reason)
        vmChat.setConnectionStatus(false)
        Log.d("myTAG", "onClosed: $code $reason")
    }

    override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
        super.onFailure(webSocket, t, response)
        Log.d("myTAG", "onFailure: ${t.message} $response")
    }

}
package com.example.neochat.navigation

import com.example.neochat.ui.screen.chat.InboxUserChatDetail

sealed class NavScreen(val route: String){
    object SplashScreen: NavScreen(route = "splash_screen")
    object SignUpScreen: NavScreen(route = "signup_screen")
    object LoginScreen: NavScreen(route = "login_screen")
    object InboxScreen: NavScreen(route = "inbox_screen")
    object ProfileScreen: NavScreen(route = "profile_screen")
    object SelectContactScreen: NavScreen(route = "select_contact_screen")
    object ChatScreen: NavScreen(route = "chat_screen/{inboxId}/{senderId}/{friendId}/{userName}/{friendName}/{userId}"){
        fun passInboxData(inboxUserChatDetail: InboxUserChatDetail): String{
            return "chat_screen/" +
                    "${inboxUserChatDetail.inboxId}/" +
                    "${inboxUserChatDetail.senderId}/" +
                    "${inboxUserChatDetail.friendId}/" +
                    "${inboxUserChatDetail.userName}/" +
                    "${inboxUserChatDetail.friendName}/"+
                    "${inboxUserChatDetail.userId}"
        }
    }
}

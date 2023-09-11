package com.example.neochat.navigation

import androidx.compose.runtime.Composable
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.navArgument
import com.example.neochat.preference.PrefUserDetail
import com.example.neochat.ui.screen.chat.ChatScreen
import com.example.neochat.ui.screen.chat.ChatViewModel
import com.example.neochat.ui.screen.chat.InboxUserChatDetail
import com.example.neochat.ui.screen.inbox.InboxScreen
import com.example.neochat.ui.screen.inbox.InboxViewModel
import com.example.neochat.ui.screen.login.LoginScreen
import com.example.neochat.ui.screen.login.LoginScreenViewModel
import com.example.neochat.ui.screen.profile.ProfileScreen
import com.example.neochat.ui.screen.selectcontact.SelectContactScreen
import com.example.neochat.ui.screen.selectcontact.SelectContactScreenViewModel
import com.example.neochat.ui.screen.signup.SignUpScreen
import com.example.neochat.ui.screen.signup.SignUpScreenViewModel
import com.example.neochat.ui.screen.splash.SplashScreen
import com.example.neochat.ui.screen.splash.SplashScreenViewModel

@Composable
fun SetUpNavGraph(
    navController: NavHostController,
    prefUserDetail: PrefUserDetail
) {
    NavHost(navController = navController, startDestination = NavScreen.SplashScreen.route){
        composable(route = NavScreen.SplashScreen.route){
            val vmSplash = viewModel<SplashScreenViewModel>()
            SplashScreen(
                navController = navController,
                vmSplash = vmSplash,
                prefUserDetail = prefUserDetail
            )
        }

        composable(route = NavScreen.SignUpScreen.route){
            val vmSignUp = viewModel<SignUpScreenViewModel>()
            SignUpScreen(navController = navController, vmSignUp = vmSignUp)
        }
        composable(route = NavScreen.LoginScreen.route){
            val vmLogin = viewModel<LoginScreenViewModel>()
            LoginScreen(
                navController = navController,
                vmLogin = vmLogin,
                prefUserDetail = prefUserDetail
            )
        }

        composable(route = NavScreen.InboxScreen.route){
            val vmInbox = viewModel<InboxViewModel>()
            InboxScreen(
                navController = navController,
                prefUserDetail = prefUserDetail,
                vmInbox = vmInbox
            )
        }
        composable(route = NavScreen.ProfileScreen.route){
            ProfileScreen(
                prefUserDetail = prefUserDetail
            )
        }

        composable(route = NavScreen.ProfileScreen.route){
            ProfileScreen(
                prefUserDetail = prefUserDetail
            )
        }

        composable(
            route = NavScreen.ChatScreen.route,
            arguments = listOf(
                navArgument(name = "inboxId"){ type = NavType.IntType},
                navArgument(name = "senderId"){ type = NavType.IntType},
                navArgument(name = "friendId"){ type = NavType.IntType},
                navArgument(name = "userId"){ type = NavType.IntType},
                navArgument(name = "userName"){ type = NavType.StringType},
                navArgument(name = "friendName"){ type = NavType.StringType}
            )
        ){
            val inboxId = it.arguments?.getInt("inboxId")
            val senderId = it.arguments?.getInt("senderId")
            val friendId = it.arguments?.getInt("friendId")
            val userId = it.arguments?.getInt("userId")
            val userName = it.arguments?.getString("userName")
            val friendName = it.arguments?.getString("friendName")

            val inboxUserChatDetail = InboxUserChatDetail(
                inboxId = inboxId!!,
                senderId = senderId!!,
                friendId = friendId!!,
                userName = userName!!,
                friendName = friendName!!,
                userId = userId!!
            )
            val vmChat = viewModel<ChatViewModel>()
            ChatScreen(
                inboxUserChatDetail = inboxUserChatDetail,
                vmChat = vmChat
            )
        }

        composable(route = NavScreen.SelectContactScreen.route){
            val vmSelectContactScreen = viewModel<SelectContactScreenViewModel>()
            SelectContactScreen(
                navController = navController,
                vmSelectContactScreen = vmSelectContactScreen,
                prefUserDetail = prefUserDetail
            )
        }
    }
}
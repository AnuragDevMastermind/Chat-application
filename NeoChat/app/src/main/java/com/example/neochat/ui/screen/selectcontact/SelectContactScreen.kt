package com.example.neochat.ui.screen.selectcontact

import android.widget.Toast
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBox
import androidx.compose.material.icons.filled.MoreVert
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.DropdownMenu
import androidx.compose.material3.DropdownMenuItem
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.FloatingActionButton
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.surfaceColorAtElevation
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.neochat.navigation.NavScreen
import com.example.neochat.preference.PrefUserDetail
import com.example.neochat.ui.screen.chat.InboxUserChatDetail
import com.example.neochat.ui.screen.inbox.RowItem
import com.example.neochat.ui.theme.NeoChatTheme
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SelectContactScreen(
    navController: NavHostController,
    vmSelectContactScreen: SelectContactScreenViewModel,
    prefUserDetail: PrefUserDetail
) {
    val context =  LocalContext.current
    LaunchedEffect(key1 = true) {
        vmSelectContactScreen.initiateAllUser()
    }
    val senderId = prefUserDetail.userId.collectAsState(initial = "")
    val senderName = prefUserDetail.getUserName.collectAsState(initial = "")
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Text("Select Contact", fontWeight = FontWeight.Medium)
                    },
                    colors = TopAppBarDefaults.smallTopAppBarColors(
                        containerColor = MaterialTheme.colorScheme.surfaceColorAtElevation(3.dp)
                    )
                )
            }
        ) { contentPadding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(contentPadding)
            ) {
                when (val allUsersApiState = vmSelectContactScreen.allUsersApiState.value) {
                    is AllUsersApiState.Success -> {
                        LazyColumn{
                            items(allUsersApiState.allUsersResponse){allUsersResponseItem->
                                RowItem(
                                    name = allUsersResponseItem.name,
                                    onClick = {
                                        val inboxUserChatDetail = InboxUserChatDetail(
                                            senderId = senderId.value!!.toInt(),
                                            friendId = allUsersResponseItem.userId,
                                            userName = senderName.value!!,
                                            userId = senderId.value!!.toInt(),
                                            friendName = allUsersResponseItem.name
                                        )
                                        navController.navigate(
                                            NavScreen.ChatScreen.passInboxData(
                                                inboxUserChatDetail = inboxUserChatDetail
                                            )
                                        )
                                    }
                                )
                            }
                        }
                    }
                    AllUsersApiState.Loading -> {
                        Box(
                            modifier = Modifier.fillMaxSize(),
                            contentAlignment = Alignment.Center
                        ) {
                            CircularProgressIndicator()
                        }
                    }
                    is AllUsersApiState.Failure -> {
                        Toast.makeText(context, "something went wrong", Toast.LENGTH_SHORT).show()
                    }
                    AllUsersApiState.Empty -> {

                    }
                }
            }
        }
    }
}

@Preview(device = "id:Nexus S", showSystemUi = true, showBackground = true)
@Composable
fun SelectContactScreenPreview() {
    val context = LocalContext.current
    NeoChatTheme {
        SelectContactScreen(
            navController = rememberNavController(),
            vmSelectContactScreen = viewModel(),
            prefUserDetail = PrefUserDetail(context = context)
        )
    }
}
package com.example.neochat.ui.screen.inbox

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.AccountBox
import androidx.compose.material.icons.filled.MoreVert
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
import androidx.compose.runtime.State
import androidx.compose.runtime.collectAsState
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.neochat.navigation.NavScreen
import com.example.neochat.preference.PrefUserDetail
import com.example.neochat.ui.screen.chat.InboxUserChatDetail
import com.example.neochat.ui.theme.NeoChatTheme
import kotlinx.coroutines.launch
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun InboxScreen(
    navController: NavHostController,
    prefUserDetail: PrefUserDetail,
    vmInbox: InboxViewModel,
    userId: State<String?>
) {
    val scope = rememberCoroutineScope()
    val context = LocalContext.current
    var expanded by remember { mutableStateOf(false) }

    //val userId = prefUserDetail.userId.collectAsState(initial = "")
    LaunchedEffect(key1 = true) {
        vmInbox.initiateInbox(userId = userId.value!!.toInt())
    }

    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {

        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Text("Inbox", fontWeight = FontWeight.Medium)
                    },
                    colors = TopAppBarDefaults.smallTopAppBarColors(
                        containerColor = MaterialTheme.colorScheme.surfaceColorAtElevation(3.dp)
                    ), actions = {
                        IconButton(onClick = {
                            expanded = !expanded
                        }) {
                            Icon(imageVector = Icons.Filled.MoreVert, contentDescription = "")
                        }
                        DropdownMenu(
                            expanded = expanded,
                            onDismissRequest = { expanded = false }

                        ) {
                            DropdownMenuItem(
                                text = { Text("Profile") },
                                onClick = {
                                    scope.launch {
                                        expanded = !expanded
                                        navController.navigate(NavScreen.ProfileScreen.route)
                                    }
                                }
                            )
                            DropdownMenuItem(
                                text = { Text("Logout") },
                                onClick = {
                                    scope.launch {
                                        expanded = !expanded
                                        prefUserDetail.clearUserDetail()
                                        navController.navigate(NavScreen.LoginScreen.route) {
                                            popUpTo(navController.graph.id)
                                        }
                                    }
                                }
                            )
                        }
                    }
                )
            },
            floatingActionButton = {
                FloatingActionButton(onClick = {
                    navController.navigate(NavScreen.SelectContactScreen.route)
                }) {
                    Icon(imageVector = Icons.Filled.AccountBox, contentDescription = "")
                }
            }
        ) { contentPadding ->
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(contentPadding)
            ) {
                when (val inboxList = vmInbox.inboxApiState.value) {
                    is InboxApiState.Success -> {
                        LazyColumn(modifier = Modifier) {
                            items(inboxList.inboxLst) {
                                RowItem(
                                    name = when (userId.value?.toInt()) {
                                        it.userId -> it.friendName
                                        else -> it.userName
                                    },
                                    onClick = {
                                        val inboxUserChatDetail = InboxUserChatDetail(
                                            inboxId = it.inboxId,
                                            senderId = userId.value!!.toInt(),
                                            friendId = it.friendId,
                                            userName = it.userName,
                                            friendName = it.friendName,
                                            userId = it.userId
                                        )
                                        navController.navigate(
                                            NavScreen.ChatScreen.passInboxData(
                                                inboxUserChatDetail = inboxUserChatDetail
                                            )
                                        )
                                    }
                                )
                            }
                            item {
                                Spacer(modifier = Modifier.height(10.dp))
                            }

                        }
                        //vmInbox.inboxApiState.value = InboxApiState.Empty
                    }

                    is InboxApiState.Failure -> {
                        Toast.makeText(context, "something went wrong", Toast.LENGTH_SHORT).show()
                        //vmInbox.inboxApiState.value = InboxApiState.Empty
                    }

                    InboxApiState.Loading -> {
                        Box(
                            modifier = Modifier.fillMaxSize(),
                            contentAlignment = Alignment.Center
                        ) {
                            CircularProgressIndicator()
                        }
                    }

                    InboxApiState.Empty -> {

                    }
                }
            }
        }
    }
}

@Composable
fun RowItem(name: String, onClick: () -> Unit) {
    Row(
        modifier = Modifier
            .fillMaxWidth()
            .padding(horizontal = 8.dp, vertical = 8.dp)
            .shadow(
                elevation = 5.dp,
                shape = RoundedCornerShape(20),
                spotColor = MaterialTheme.colorScheme.primary
            )
            .background(
                color = MaterialTheme.colorScheme.surface,
                shape = RoundedCornerShape(20)
            )
            .clickable {
                onClick()
            },

        verticalAlignment = Alignment.CenterVertically
    ) {
        Box(
            modifier = Modifier
                .padding(10.dp)
                .size(42.dp)
                .border(
                    width = 2.dp,
                    color = MaterialTheme.colorScheme.primary,
                    shape = RoundedCornerShape(100)
                ),
            contentAlignment = Alignment.Center
        ) {
            Text(
                text = name.take(2).uppercase(Locale.ROOT),
                color = MaterialTheme.colorScheme.primary,
                fontSize = 20.sp
            )
        }
        Spacer(modifier = Modifier.width(5.dp))
        Text(
            text = name,
            fontSize = 16.sp,
            fontWeight = FontWeight.Medium,
            color = MaterialTheme.colorScheme.secondary
        )
    }
}

@Preview(showBackground = true)
@Composable
fun RowItemPreview() {
    RowItem(name = "Ram", onClick = {})
}

@Preview(device = "id:Nexus S", showSystemUi = true, showBackground = true)
@Composable
fun InboxScreenPreview() {
    val context = LocalContext.current

    NeoChatTheme {
        InboxScreen(
            navController = rememberNavController(),
            prefUserDetail = PrefUserDetail(context = context),
            vmInbox = viewModel(),
            userId =  object : State<String?> {
                override val value: String?
                    get() = ""
            }
        )
    }
}
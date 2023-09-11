package com.example.neochat.ui.screen.chat

import android.widget.Toast
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
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
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Send
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TextField
import androidx.compose.material3.TextFieldDefaults
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.surfaceColorAtElevation
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.paging.LoadState
import androidx.paging.compose.collectAsLazyPagingItems
import androidx.paging.compose.items
import com.example.neochat.ui.theme.NeoChatTheme
import com.example.neochat.utils.time.TimeUtil
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.launch
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatScreen(inboxUserChatDetail: InboxUserChatDetail, vmChat: ChatViewModel) {

    val context = LocalContext.current
    val lazyListState = rememberLazyListState()


    val msgList = vmChat.setMessagePager(
        inboxId = inboxUserChatDetail.inboxId,
        userId = inboxUserChatDetail.senderId,
        friendId = inboxUserChatDetail.friendId
    ).collectAsLazyPagingItems()

    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Text(
                            text = inboxUserChatDetail.friendName,
                            fontWeight = FontWeight.Medium,
                            color = MaterialTheme.colorScheme.secondary
                        )
                    },
                    colors = TopAppBarDefaults.smallTopAppBarColors(
                        containerColor = MaterialTheme.colorScheme.surfaceColorAtElevation(3.dp)
                    ),
                    navigationIcon = {
                        Row {
                            Spacer(modifier = Modifier.width(5.dp))
                            Box(
                                modifier = Modifier
                                    .size(35.dp)
                                    .border(
                                        width = 2.dp,
                                        color = MaterialTheme.colorScheme.primary,
                                        shape = RoundedCornerShape(100)
                                    ),
                                contentAlignment = Alignment.Center
                            ) {
                                Text(
                                    text = inboxUserChatDetail.friendName.take(2)
                                        .uppercase(Locale.ROOT),
                                    color = MaterialTheme.colorScheme.primary
                                )
                            }
                            Spacer(modifier = Modifier.width(5.dp))
                        }
                    }
                )
            }
        ) { contentPadding ->
            LaunchedEffect(key1 = Unit){
                vmChat.connectWebSocket(userId = inboxUserChatDetail.userId)
            }

            Column(
                modifier = Modifier
                    .padding(contentPadding)
                    .fillMaxSize(),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Bottom
            ) {

                LazyColumn(
                    modifier = Modifier
                        .fillMaxWidth()
                        .weight(1f),
                    verticalArrangement = Arrangement.Top,
                    horizontalAlignment = Alignment.CenterHorizontally,
                    reverseLayout = true,
                    state = lazyListState
                ) {
                    items(vmChat.getMessageResponseLst()) {messageItem ->

                        if (messageItem!!.senderId == inboxUserChatDetail.senderId){
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth(0.9f)
                                    .padding(vertical = 10.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {

                                Row(modifier = Modifier.fillMaxWidth()) {
                                    Spacer(modifier = Modifier.weight(weight = 0.4f))
                                    Box(
                                        modifier = Modifier
                                            .background(
                                                color = MaterialTheme.colorScheme.surfaceColorAtElevation(
                                                    2.dp
                                                ),
                                                shape = RoundedCornerShape(
                                                    topStart = 15.dp,
                                                    topEnd = 5.dp,
                                                    bottomEnd = 15.dp,
                                                    bottomStart = 15.dp
                                                )
                                            )
                                            .weight(weight = 1f)
                                    ) {

                                        Column {
                                            Text(
                                                modifier = Modifier
                                                    .fillMaxWidth()
                                                    .padding(
                                                        top = 10.dp,
                                                        end = 10.dp,
                                                        start = 10.dp
                                                    ),
                                                text = TimeUtil.formatTimestampToTime(timestamp = messageItem.sentAt),
                                                fontSize = 10.sp,
                                                fontWeight = FontWeight.ExtraBold,
                                                textAlign = TextAlign.End

                                            )
                                            Text(
                                                modifier = Modifier
                                                    .fillMaxWidth()
                                                    .padding(10.dp),
                                                text = messageItem.text,
                                                fontSize = 14.sp
                                            )
                                        }

                                    }

                                }
                            }
                        }else{
                            Column(
                                modifier = Modifier
                                    .fillMaxWidth(0.9f)
                                    .padding(vertical = 10.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {

                                Row(modifier = Modifier.fillMaxWidth()) {
                                    Box(
                                        modifier = Modifier
                                            .background(
                                                color = MaterialTheme.colorScheme.surfaceColorAtElevation(
                                                    12.dp
                                                ),
                                                shape = RoundedCornerShape(
                                                    topStart = 5.dp,
                                                    topEnd = 15.dp,
                                                    bottomEnd = 15.dp,
                                                    bottomStart = 15.dp
                                                )
                                            )
                                            .weight(weight = 1f)
                                    ) {

                                        Column {
                                            Text(
                                                modifier = Modifier.padding(
                                                    top = 10.dp,
                                                    end = 10.dp,
                                                    start = 10.dp
                                                ),
                                                text = TimeUtil.formatTimestampToTime(timestamp = messageItem.sentAt),
                                                fontSize = 10.sp,
                                                fontWeight = FontWeight.ExtraBold
                                            )
                                            Text(
                                                modifier = Modifier.padding(10.dp),
                                                text = messageItem.text,
                                                fontSize = 14.sp
                                            )
                                        }

                                    }

                                    Box(
                                        modifier = Modifier
                                            .weight(weight = 0.4f)
                                            .background(Color.Blue)
                                    )
                                }
                            }
                        }

                    }
                    items(msgList) { messageItem ->

                        if (messageItem!!.senderId == inboxUserChatDetail.senderId) {

                            Column(
                                modifier = Modifier
                                    .fillMaxWidth(0.9f)
                                    .padding(vertical = 10.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {

                                Row(modifier = Modifier.fillMaxWidth()) {
                                    Spacer(modifier = Modifier.weight(weight = 0.4f))
                                    Box(
                                        modifier = Modifier
                                            .background(
                                                color = MaterialTheme.colorScheme.surfaceColorAtElevation(
                                                    2.dp
                                                ),
                                                shape = RoundedCornerShape(
                                                    topStart = 15.dp,
                                                    topEnd = 5.dp,
                                                    bottomEnd = 15.dp,
                                                    bottomStart = 15.dp
                                                )
                                            )
                                            .weight(weight = 1f)
                                    ) {

                                        Column {
                                            Text(
                                                modifier = Modifier
                                                    .fillMaxWidth()
                                                    .padding(
                                                        top = 10.dp,
                                                        end = 10.dp,
                                                        start = 10.dp
                                                    ),
                                                text = TimeUtil.formatTimestampToTime(timestamp = messageItem.sentAt),
                                                fontSize = 10.sp,
                                                fontWeight = FontWeight.ExtraBold,
                                                textAlign = TextAlign.End

                                            )
                                            Text(
                                                modifier = Modifier
                                                    .fillMaxWidth()
                                                    .padding(10.dp),
                                                text = "${messageItem.text}",
                                                fontSize = 14.sp
                                            )
                                        }

                                    }

                                }
                            }


                        } else {

                            Column(
                                modifier = Modifier
                                    .fillMaxWidth(0.9f)
                                    .padding(vertical = 10.dp),
                                horizontalAlignment = Alignment.CenterHorizontally
                            ) {

                                Row(modifier = Modifier.fillMaxWidth()) {
                                    Box(
                                        modifier = Modifier
                                            .background(
                                                color = MaterialTheme.colorScheme.surfaceColorAtElevation(
                                                    12.dp
                                                ),
                                                shape = RoundedCornerShape(
                                                    topStart = 5.dp,
                                                    topEnd = 15.dp,
                                                    bottomEnd = 15.dp,
                                                    bottomStart = 15.dp
                                                )
                                            )
                                            .weight(weight = 1f)
                                    ) {

                                        Column {
                                            Text(
                                                modifier = Modifier.padding(
                                                    top = 10.dp,
                                                    end = 10.dp,
                                                    start = 10.dp
                                                ),
                                                text = TimeUtil.formatTimestampToTime(timestamp = messageItem.sentAt),
                                                fontSize = 10.sp,
                                                fontWeight = FontWeight.ExtraBold
                                            )
                                            Text(
                                                modifier = Modifier.padding(10.dp),
                                                text = "${messageItem.text}",
                                                fontSize = 14.sp
                                            )
                                        }

                                    }

                                    Box(
                                        modifier = Modifier
                                            .weight(weight = 0.4f)
                                            .background(Color.Blue)
                                    )
                                }
                            }

                        }
                    }
                    msgList.apply {
                        if (loadState.refresh is LoadState.Loading) {
                            item {
                                Box(
                                    modifier = Modifier.fillMaxWidth(),
                                    contentAlignment = Alignment.Center
                                ) {
                                    CircularProgressIndicator()
                                }
                            }
                        }


                        if (loadState.append is LoadState.Loading) {
                            item {
                                Box(
                                    modifier = Modifier.fillMaxWidth(),
                                    contentAlignment = Alignment.Center
                                ) {
                                    CircularProgressIndicator()
                                }
                            }
                        }
                    }

                }

                TextField(
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(10.dp),
                    value = vmChat.getMessageTxt(),
                    onValueChange = {
                        vmChat.setMessageTxt(msgTxt = it)
                    },
                    shape = RoundedCornerShape(20),
                    colors = TextFieldDefaults.textFieldColors(
                        focusedIndicatorColor = Color.Transparent,
                        unfocusedIndicatorColor = Color.Transparent
                    ),
                    trailingIcon = {
                        IconButton(onClick = {
                            //sendMsgList.add(index = 0, element = msgTxt)
                            //chatViewModel.sendMessage()

                            if (vmChat.getMessageTxt().isEmpty()){
                                Toast.makeText(context, "empty message", Toast.LENGTH_SHORT).show()
                            }else if (!vmChat.getConnectionStatus()){
                                Toast.makeText(context, "websocket not connected", Toast.LENGTH_SHORT).show()
                            }else{
                                vmChat.sendMessageWebSocket(inboxUserChatDetail = inboxUserChatDetail)
                            }

                            CoroutineScope(Dispatchers.Main).launch {
                                lazyListState.scrollToItem(0, 0)
                            }
                        }
                        ) {
                            Icon(
                                imageVector = Icons.Default.Send,
                                contentDescription = "send message"
                            )
                        }
                    }
                )
            }

            DisposableEffect(key1 = Unit){
                onDispose {
                    vmChat.disconnectWebSocket()
                    vmChat.clearWebSocket()
                }
            }
        }

    }
}

@Preview(device = "id:Nexus 5", showSystemUi = true, showBackground = true)
@Composable
fun ChatScreenPreview() {
    NeoChatTheme {
        ChatScreen(
            inboxUserChatDetail = InboxUserChatDetail(
                inboxId = 0,
                senderId = 0,
                friendId = 0,
                userName = "",
                friendName = "",
                userId = 0
            ),
            vmChat = viewModel()
        )
    }
}
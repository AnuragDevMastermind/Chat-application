package com.example.neochat.ui.screen.profile

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.wrapContentSize
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.material3.TopAppBarDefaults
import androidx.compose.material3.surfaceColorAtElevation
import androidx.compose.runtime.Composable
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import com.example.neochat.preference.PrefUserDetail
import com.example.neochat.ui.theme.NeoChatTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ProfileScreen(prefUserDetail: PrefUserDetail) {

    val userName = prefUserDetail.getUserName.collectAsState(initial = "name")
    val userMobileNo = prefUserDetail.getUserMobileNo.collectAsState(initial = "")
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Scaffold(
            topBar = {
                TopAppBar(
                    title = {
                        Text("Profile", fontWeight = FontWeight.Medium)
                    },
                    colors = TopAppBarDefaults.smallTopAppBarColors(
                        containerColor = MaterialTheme.colorScheme.surfaceColorAtElevation(3.dp)
                    )
                )
            }
        ) { contentPadding ->
            Column(
                modifier = Modifier
                    .fillMaxSize()
                    .padding(paddingValues = contentPadding),
                horizontalAlignment = Alignment.CenterHorizontally,
                verticalArrangement = Arrangement.Center
            ) {
                Box(modifier = Modifier.wrapContentSize()){
                    Column {
                        Text(text = "User name: ${userName.value}")
                        Text(text = "Mobile No: ${userMobileNo.value}")
                    }
                }
            }
        }
    }
}

@Preview(device = "id:Nexus S", showSystemUi = true, showBackground = true)
@Composable
fun ProfileScreenPreview() {
    val context = LocalContext.current
    NeoChatTheme {
        ProfileScreen(prefUserDetail = PrefUserDetail(context = context))
    }
}
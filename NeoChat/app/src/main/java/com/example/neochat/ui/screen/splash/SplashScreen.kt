package com.example.neochat.ui.screen.splash

import android.widget.Toast
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.height
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.collectAsState
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
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
import com.example.neochat.ui.theme.NeoChatTheme
import kotlinx.coroutines.delay

@Composable
fun SplashScreen(
    navController: NavHostController,
    vmSplash: SplashScreenViewModel,
    prefUserDetail: PrefUserDetail
) {
    val userToken = prefUserDetail.getUserToken.collectAsState(initial = "")
    val context = LocalContext.current
    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {
            Text(
                text = "NeoChat",
                fontWeight = FontWeight.ExtraBold,
                fontSize = 25.sp
            )
            Spacer(modifier = Modifier.height(30.dp))
        }

        LaunchedEffect(key1 = true){
            delay(2000L)
            if (userToken.value.isNullOrEmpty()){
                navController.navigate(NavScreen.LoginScreen.route){
                    popUpTo(navController.graph.id)
                }
            }else{
                vmSplash.initiateAuthentication(token = "Bearer ${userToken.value}")
            }

        }
        when(val authenticateApiState = vmSplash.authenticateApiState.value){
            is AuthenticateApiState.Success -> {
                navController.navigate(NavScreen.InboxScreen.route){
                    popUpTo(navController.graph.id)
                }
                vmSplash.authenticateApiState.value = AuthenticateApiState.Empty
            }
            AuthenticateApiState.Loading -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            }
            is AuthenticateApiState.Failure -> {
                Toast.makeText(context, "failure", Toast.LENGTH_SHORT).show()
                navController.navigate(NavScreen.LoginScreen.route){
                    popUpTo(navController.graph.id)
                }
                vmSplash.authenticateApiState.value = AuthenticateApiState.Empty
            }
            AuthenticateApiState.Empty -> {

            }
        }
    }
}

@Preview(device = "id:Nexus S", showSystemUi = true, showBackground = true)
@Composable
fun SplashScreenPreview() {
    val context = LocalContext.current
    NeoChatTheme {
        SplashScreen(
            navController = rememberNavController(),
            prefUserDetail = PrefUserDetail(context = context),
            vmSplash = viewModel()
        )
    }
}
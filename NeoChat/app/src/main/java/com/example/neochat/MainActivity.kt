package com.example.neochat

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.neochat.navigation.SetUpNavGraph
import com.example.neochat.preference.PrefUserDetail
import com.example.neochat.ui.theme.NeoChatTheme

class MainActivity : ComponentActivity() {


    private lateinit var prefUserDetail: PrefUserDetail
    private lateinit var navController: NavHostController
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        prefUserDetail = PrefUserDetail(context = applicationContext)

        setContent {
            NeoChatTheme {
                navController = rememberNavController()
                SetUpNavGraph(
                    navController = navController,
                    prefUserDetail = prefUserDetail
                )
            }
        }
    }
}

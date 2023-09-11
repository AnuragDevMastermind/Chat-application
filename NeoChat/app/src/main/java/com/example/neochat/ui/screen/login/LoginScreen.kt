package com.example.neochat.ui.screen.login

import android.widget.Toast
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.outlined.Lock
import androidx.compose.material.icons.outlined.Person
import androidx.compose.material3.Button
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Surface
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.text.style.TextDecoration
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.lifecycle.viewmodel.compose.viewModel
import androidx.navigation.NavHostController
import androidx.navigation.compose.rememberNavController
import com.example.neochat.R
import com.example.neochat.navigation.NavScreen
import com.example.neochat.preference.PrefUserDetail
import com.example.neochat.ui.theme.NeoChatTheme
import kotlinx.coroutines.launch

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun LoginScreen(
    navController: NavHostController,
    vmLogin: LoginScreenViewModel,
    prefUserDetail: PrefUserDetail
) {
    val context = LocalContext.current
    val scope = rememberCoroutineScope()
    var passwordIconVisibility by rememberSaveable { mutableStateOf(false) }

    val passwordIcon = if (passwordIconVisibility)
        painterResource(id = R.drawable.ic_visibility)
    else
        painterResource(id = R.drawable.ic_visibility_off)

    Surface(
        modifier = Modifier.fillMaxSize(),
        color = MaterialTheme.colorScheme.background
    ) {
        Column(
            modifier = Modifier.fillMaxSize(),
            horizontalAlignment = Alignment.CenterHorizontally,
            verticalArrangement = Arrangement.Center
        ) {

            Box(modifier = Modifier.fillMaxWidth(0.8f)) {
                Text(text = "Login", fontWeight = FontWeight.ExtraBold)
            }

            Spacer(modifier = Modifier.height(15.dp))

            OutlinedTextField(
                modifier = Modifier.fillMaxWidth(0.8f),
                label = { Text(text = "Number") },
                leadingIcon = {
                    Icon(imageVector = Icons.Outlined.Person, contentDescription = "name")
                },
                value = vmLogin.getNumber(),
                onValueChange = {
                    vmLogin.setNumber(txt = it)
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Text),
                singleLine = true
            )

            Spacer(modifier = Modifier.height(15.dp))

            OutlinedTextField(
                modifier = Modifier.fillMaxWidth(0.8f),
                label = { Text(text = "Password") },
                leadingIcon = {
                    Icon(imageVector = Icons.Outlined.Lock, contentDescription = "name")
                },
                value = vmLogin.getPassword(),
                onValueChange = {
                    vmLogin.setPassword(password = it)
                },
                trailingIcon = {
                    IconButton(onClick = { passwordIconVisibility = !passwordIconVisibility }) {
                        Icon(
                            painter = passwordIcon,
                            contentDescription = "visible"
                        )
                    }
                },
                visualTransformation = if (passwordIconVisibility) VisualTransformation.None
                else PasswordVisualTransformation('*'),
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Password),
                singleLine = true
            )

            Spacer(modifier = Modifier.height(15.dp))

            Button(onClick = {
                //navController.navigate(NavScreen.InboxScreen.route)
                if (vmLogin.getNumber().isEmpty() || vmLogin.getPassword().isEmpty()){
                    Toast.makeText(context, "please fill the fields", Toast.LENGTH_SHORT).show()
                }else{
                    vmLogin.initiateLogin()
                }
            }) {
                Text(text = "Login")
            }

            Spacer(modifier = Modifier.height(20.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Center
            ) {
                Text(text = "Don't have an account? ")
                Text(
                    modifier = Modifier.clickable {
                        navController.navigate(NavScreen.SignUpScreen.route)
                    },
                    text = "SIGNUP",
                    textDecoration = TextDecoration.Underline
                )
            }
        }

        when(val loginApiState = vmLogin.loginApiState.value){
            is LoginApiState.Success -> {
                LaunchedEffect(key1 = true){
                    scope.launch {
                        prefUserDetail.saveUserDetail(loginResponse = loginApiState.loginResponse)
                        navController.navigate(NavScreen.InboxScreen.route){
                            popUpTo(navController.graph.id)
                        }
                    }
                }
                vmLogin.loginApiState.value =LoginApiState.Empty
            }
            LoginApiState.Loading -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            }
            is LoginApiState.Failure -> {
                Toast.makeText(context, "Incorrect num, pass or something went wrong", Toast.LENGTH_SHORT).show()
                vmLogin.loginApiState.value =LoginApiState.Empty
            }
            LoginApiState.Empty -> {

            }
        }
    }
}

@Preview(device = "id:Nexus 5", showSystemUi = true, showBackground = true)
@Composable
fun LoginScreenPreview() {
    val context = LocalContext.current
    NeoChatTheme {
        LoginScreen(
            navController = rememberNavController(),
            vmLogin = viewModel(),
            prefUserDetail = PrefUserDetail(context = context)
        )
    }
}
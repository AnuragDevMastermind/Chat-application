package com.example.neochat.ui.screen.signup

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
import androidx.compose.material.icons.outlined.Phone
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
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
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
import com.example.neochat.ui.theme.NeoChatTheme

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun SignUpScreen(
    navController: NavHostController,
    vmSignUp: SignUpScreenViewModel
) {

    val context = LocalContext.current

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
                Text(text = "Sign Up", fontWeight = FontWeight.ExtraBold)
            }

            Spacer(modifier = Modifier.height(15.dp))

            OutlinedTextField(
                modifier = Modifier.fillMaxWidth(0.8f),
                label = { Text(text = "Name") },
                leadingIcon = {
                    Icon(imageVector = Icons.Outlined.Person, contentDescription = "name")
                },
                value = vmSignUp.getName(),
                onValueChange = {
                    vmSignUp.setName(txt = it)
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Text),
                singleLine = true
            )

            Spacer(modifier = Modifier.height(15.dp))

            OutlinedTextField(
                modifier = Modifier.fillMaxWidth(0.8f),
                label = { Text(text = "Number") },
                leadingIcon = {
                    Icon(imageVector = Icons.Outlined.Phone, contentDescription = "name")
                },
                value = vmSignUp.getNumber(),
                onValueChange = {
                    if (it.length <= 10)
                        vmSignUp.setNumber(number = it)
                },
                keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.Phone),
                singleLine = true
            )

            Spacer(modifier = Modifier.height(15.dp))

            OutlinedTextField(
                modifier = Modifier.fillMaxWidth(0.8f),
                label = { Text(text = "Password") },
                leadingIcon = {
                    Icon(imageVector = Icons.Outlined.Lock, contentDescription = "name")
                },
                value = vmSignUp.getPassword(),
                onValueChange = {
                    vmSignUp.setPassword(password = it)
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

                if (
                    vmSignUp.getName().isEmpty() ||
                    vmSignUp.getNumber().isEmpty() ||
                    vmSignUp.getPassword().isEmpty()
                ){
                    Toast.makeText(context, "Please fill all fields", Toast.LENGTH_SHORT).show()
                }else if (vmSignUp.getPassword().length <= 8){
                    Toast.makeText(context, "password must be greater than 8 char", Toast.LENGTH_SHORT).show()
                }else{
                    vmSignUp.initiateSignUp()
                }
            }) {
                Text(text = "Sign Up")
            }

            Spacer(modifier = Modifier.height(20.dp))

            Row(
                modifier = Modifier.fillMaxWidth(),
                horizontalArrangement = Arrangement.Center
            ) {
                Text(text = "Already a user? ")
                Text(
                    modifier = Modifier.clickable {
                        navController.navigate(NavScreen.LoginScreen.route){
                            popUpTo(navController.graph.id)
                            navController.graph.setStartDestination(NavScreen.LoginScreen.route)
                        }
                    },
                    text = "LOGIN",
                    textDecoration = TextDecoration.Underline
                )
            }
        }

        when(val signUpApiState = vmSignUp.signUpApiState.value){
            is SignUpApiState.Success -> {

                Toast.makeText(context, "${signUpApiState.data}", Toast.LENGTH_SHORT).show()
                vmSignUp.signUpApiState.value = SignUpApiState.Empty
                navController.navigate(NavScreen.LoginScreen.route){
                    popUpTo(navController.graph.id)
                    navController.graph.setStartDestination(NavScreen.LoginScreen.route)
                }
            }
            SignUpApiState.Loading -> {
                Box(
                    modifier = Modifier.fillMaxSize(),
                    contentAlignment = Alignment.Center
                ) {
                    CircularProgressIndicator()
                }
            }

            is SignUpApiState.Failure -> {
                Toast.makeText(context, "${signUpApiState.msg}", Toast.LENGTH_SHORT).show()
            }

            SignUpApiState.Empty -> {

            }
        }
    }
}

@Preview(device = "id:Nexus S", showSystemUi = true, showBackground = true)
@Composable
fun SignUpScreenPreview() {
    NeoChatTheme {
        SignUpScreen(navController = rememberNavController(), vmSignUp = viewModel())
    }
}
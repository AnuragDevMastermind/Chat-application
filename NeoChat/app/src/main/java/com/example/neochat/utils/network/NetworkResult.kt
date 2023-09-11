package com.example.neochat.utils.network

sealed class NetworkResult<T : Any> {
    class Success<T : Any>(val data: T, val code: Int) : NetworkResult<T>()
    class Error<T : Any>(val code: Int, val message: String?, val data: T?, val errorBody: String?) : NetworkResult<T>()
    class Exception<T : Any>(val e: Throwable) : NetworkResult<T>()
}


suspend fun <T : Any> NetworkResult<T>.onSuccess(
    executable: suspend (response:T,code: Int) -> Unit
): NetworkResult<T> = apply {
    if (this is NetworkResult.Success<T>) {
        executable(data,code)
    }
}

suspend fun <T : Any> NetworkResult<T>.onError(
    executable: suspend (code: Int, message: String?, data: T?, errorBody: String?) -> Unit
): NetworkResult<T> = apply {
    if (this is NetworkResult.Error<T>) {
        executable(code, message, data , errorBody)
    }
}

suspend fun <T : Any> NetworkResult<T>.onException(
    executable: suspend (e: Throwable) -> Unit
): NetworkResult<T> = apply {
    if (this is NetworkResult.Exception<T>) {
        executable(e)
    }
}
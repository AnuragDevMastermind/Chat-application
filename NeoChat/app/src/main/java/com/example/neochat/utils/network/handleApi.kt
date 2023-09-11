package com.example.neochat.utils.network


import com.google.gson.reflect.TypeToken
import retrofit2.HttpException
import retrofit2.Response

suspend fun <T : Any> handleApi(
    execute: suspend () -> Response<T>
): NetworkResult<T> {
    return try {
        val response = execute()
        val body = response.body()
        if (response.isSuccessful && body != null) {
            NetworkResult.Success(body, response.code())
        } else {
            val errorBody = response.errorBody()?.string()
            if (errorBody != null) {
                val type = object : TypeToken<ErrorResponse>() {}.type
                val errorResponse: ErrorResponse =
                    GsonSingleton().fromJson(errorBody, type)
                NetworkResult.Error(
                    code = response.code(),
                    message = errorResponse.response_message,
                    data = body,
                    errorBody = errorBody
                )
            } else {
                NetworkResult.Error(code = response.code(), message = response.message(), data = body, errorBody = null)
            }
        }
    } catch (e: HttpException) {
        NetworkResult.Error(code = e.code(), message = e.message(), data = null, errorBody = e.response()?.errorBody()?.string())
    } catch (e: Throwable) {
        NetworkResult.Exception(e)
    }
}

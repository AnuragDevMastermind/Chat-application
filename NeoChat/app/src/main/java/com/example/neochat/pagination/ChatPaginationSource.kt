package com.example.neochat.pagination

import androidx.paging.PagingSource
import androidx.paging.PagingState
import com.example.neochat.api.chat.ChatApi
import com.example.neochat.api.chat.MessageItem

class ChatPaginationSource(
    private val chatApi: ChatApi,
    private val inboxId: Int,
    private val userId: Int,
    private val friendId: Int
): PagingSource<Int, MessageItem>() {

    override fun getRefreshKey(state: PagingState<Int, MessageItem>): Int? {
        return state.anchorPosition?.let { anchorPosition ->
            val anchorPage = state.closestPageToPosition(anchorPosition)
            anchorPage?.prevKey?.plus(1) ?: anchorPage?.nextKey?.minus(1)
        }
    }

    override suspend fun load(params: LoadParams<Int>): LoadResult<Int, MessageItem> {
        return try {
            val page = params.key ?: 1
            val response = if (inboxId == -1)
                chatApi.getAllMessagesWithoutInbox(userId = userId, friendId = friendId, pageNo = page)
            else
                chatApi.getAllMessages(inboxId = inboxId, pageNo = page)
            val messageResponse = response.body()
            val data = (messageResponse as ArrayList<MessageItem>)
            data.reverse()
            LoadResult.Page(
                data = data/*messageResponse!!*/,
                prevKey = if (page == 1) null else page -1,
                nextKey = if (messageResponse!!.isEmpty()) null else page+1
            )
        } catch (e: Exception){
            LoadResult.Error(e)
        }
    }
}
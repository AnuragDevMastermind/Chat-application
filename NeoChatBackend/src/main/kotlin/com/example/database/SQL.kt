package com.example.database

object SQL {
    const val MESSAGES = """
            SELECT *
            FROM (
                SELECT *
                FROM messages
                WHERE inbox_id = ?
                ORDER BY sent_at DESC
                LIMIT ? OFFSET ?
            ) subquery
            ORDER BY sent_at ASC;
        """
}
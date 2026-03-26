package com.kavyanjali.smartexpense.repository;

import com.kavyanjali.smartexpense.model.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findTop10ByUsernameOrderByTimestampDesc(String username);
}

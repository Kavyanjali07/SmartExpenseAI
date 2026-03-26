package com.kavyanjali.smartexpense.service.ai;

import com.kavyanjali.smartexpense.model.ChatMessage;
import com.kavyanjali.smartexpense.repository.ChatMessageRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class ChatMemoryService {

    private final ChatMessageRepository chatMessageRepository;

    public ChatMemoryService(ChatMessageRepository chatMessageRepository) {
        this.chatMessageRepository = chatMessageRepository;
    }

    public void addMessage(String username, String role, String content) {
        ChatMessage message = new ChatMessage(
                username,
                content,
                role,
                LocalDateTime.now()
        );
        chatMessageRepository.save(message);
    }

    public List<String> getHistory(String username) {
        List<String> history = chatMessageRepository
                .findTop10ByUsernameOrderByTimestampDesc(username)
                .stream()
                .map(message -> message.getRole() + ": " + message.getContent())
                .toList();

        List<String> orderedHistory = new ArrayList<>(history);
        Collections.reverse(orderedHistory);
        return orderedHistory;
    }
}

package com.sky.airline.Services.KafkaService;

import com.sky.airline.Entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProducerService {

    private final KafkaTemplate<String, User> kafkaTemplate;

    public void sendMessage(User user){
        kafkaTemplate.send("emailTopic",user);
    }
}

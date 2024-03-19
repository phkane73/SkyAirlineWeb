package com.sky.airline.Config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
@EnableKafka
public class KafkaConfig {
    @Bean
    public NewTopic emailTopic(){
        return TopicBuilder
                .name("emailTopic")
                .build();
    }

    @Bean
    public NewTopic seatTopic(){
        return TopicBuilder
                .name("seatTopic")
                .build();
    }
}

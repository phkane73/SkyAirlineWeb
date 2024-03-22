package com.sky.airline.Config;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.annotation.EnableKafka;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.core.ConsumerFactory;

@Configuration
@EnableKafka
public class KafkaConfig {

    private final ConsumerFactory<String, String> consumerFactory;

    public KafkaConfig(ConsumerFactory<String, String> consumerFactory) {
        this.consumerFactory = consumerFactory;
    }

    @Bean
    public NewTopic emailTopic(){
        return TopicBuilder
                .name("emailTopic")
                .partitions(2)
                .build();
    }

    @Bean
    public NewTopic seatTopic(){
        return TopicBuilder
                .name("seatTopic")
                .partitions(2)
                .build();
    }
    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, String> kafkaListenerContainerFactory() {
        ConcurrentKafkaListenerContainerFactory<String, String> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(consumerFactory);
        factory.setConcurrency(5); // Số lượng consumer thread
        factory.getContainerProperties().setPollTimeout(3000); // Thời gian timeout khi poll message từ Kafka
        return factory;
    }
}

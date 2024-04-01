package com.sky.airline.Services.KafkaService;

import com.sky.airline.Entities.FlightSchedule;
import com.sky.airline.Entities.Ticket;
import com.sky.airline.Entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ProducerService {

    private final KafkaTemplate<String, User> kafkaTemplateUser;

    private final KafkaTemplate<String, FlightSchedule> kafkaTemplateFlightSchedule;

    private final KafkaTemplate<String, Ticket> kafkaTemplateTicket;

    public void sendMessage(User user) {
        kafkaTemplateUser.send("emailTopic", user);
    }

    public void setFlightSchedule(FlightSchedule flightSchedule) {
        kafkaTemplateFlightSchedule.send("seatTopic", flightSchedule);
    }

    public void setTicket(Ticket ticket){
        kafkaTemplateTicket.send("ticketTopic", ticket);
    }
}

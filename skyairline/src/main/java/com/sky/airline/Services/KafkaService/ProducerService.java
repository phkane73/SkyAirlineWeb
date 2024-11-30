package com.sky.airline.Services.KafkaService;

import com.sky.airline.Entities.FlightSchedule;
import com.sky.airline.Entities.SeatDetail;
import com.sky.airline.Entities.Ticket;
import com.sky.airline.Entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProducerService {

    private final KafkaTemplate<String, User> kafkaTemplateUser;

    private final KafkaTemplate<String, List<SeatDetail>> kafkaTemplateSeatDetail;

    private final KafkaTemplate<String, Ticket> kafkaTemplateTicket;

    public void sendMessage(User user) {
        kafkaTemplateUser.send("emailTopic", user);
    }

    public void setFlightSchedule(List<SeatDetail> seatDetails) {
        kafkaTemplateSeatDetail.send("seatTopic", seatDetails);
    }

    public void setTicket(Ticket ticket){
        kafkaTemplateTicket.send("ticketTopic", ticket);
    }
}

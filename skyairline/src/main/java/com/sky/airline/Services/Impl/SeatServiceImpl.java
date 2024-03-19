package com.sky.airline.Services.Impl;

import com.sky.airline.Entities.FlightSchedule;
import com.sky.airline.Entities.SeatDetail;
import com.sky.airline.Repositories.ISeatDetailRepository;
import com.sky.airline.Services.IFlightScheduleService;
import com.sky.airline.Services.ISeatService;
import com.sky.airline.Services.KafkaService.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements ISeatService {

    private final ISeatDetailRepository seatDetailRepository;

    private final IFlightScheduleService flightScheduleService;

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ProducerService producerService;

    @Override
    public void bookingSeat(int idSeat, long idSchedule) {
        FlightSchedule flightSchedule = flightScheduleService.getFlightById(idSchedule);
        Set<SeatDetail> SeatDetails = flightSchedule.getSeatDetails();
        for (SeatDetail s : SeatDetails) {
            if (s.getId().getSeat_id() == idSeat) {
                s.setStatus("BOOKING");
                seatDetailRepository.save(s);
            }
        }
        producerService.setFlightSchedule(flightSchedule);
    }

    @Override
    public void cancelSeat(int idSeat, long idSchedule) {
        FlightSchedule flightSchedule = flightScheduleService.getFlightById(idSchedule);
        Set<SeatDetail> SeatDetails = flightSchedule.getSeatDetails();
        for (SeatDetail s : SeatDetails) {
            if (s.getId().getSeat_id() == idSeat) {
                s.setStatus("AVAILABLE");
                seatDetailRepository.save(s);
            }
        }
        producerService.setFlightSchedule(flightSchedule);
    }

    @Override
    @KafkaListener(groupId = "seatG", topics = "seatTopic")
    public void listenFlightSchedule(FlightSchedule flightSchedule) {
        simpMessagingTemplate.convertAndSend("/topic/seatTopic", flightSchedule);
    }
}

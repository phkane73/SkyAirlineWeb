package com.sky.airline.Services.Impl;

import com.sky.airline.Config.JwtTokenProvider;
import com.sky.airline.Entities.FlightSchedule;
import com.sky.airline.Entities.SeatDetail;
import com.sky.airline.Entities.User;
import com.sky.airline.Enums.SeatStatus;
import com.sky.airline.Repositories.ISeatDetailRepository;
import com.sky.airline.Services.IFlightScheduleService;
import com.sky.airline.Services.ISeatService;
import com.sky.airline.Services.IUserService;
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

    private final IUserService iUserService;

    @Override
    public void bookingSeat(int idSeat, long idSchedule, String token) {
        String email = new JwtTokenProvider().getUserIdFromJWT(token);
        User user = iUserService.getUserByEmail(email);
        FlightSchedule flightSchedule = flightScheduleService.getFlightById(idSchedule);
        Set<SeatDetail> SeatDetails = flightSchedule.getSeatDetails();
        for (SeatDetail s : SeatDetails) {
            if (s.getId().getSeat_id() == idSeat) {
                s.setUserBookingSeat(user.getId());
                s.setStatus(SeatStatus.BOOKING);
                seatDetailRepository.save(s);
            }
        }
        producerService.setFlightSchedule(flightSchedule);
    }

    @Override
    public void cancelSeat(int idSeat, long idSchedule, String token) {
        String email = new JwtTokenProvider().getUserIdFromJWT(token);
        User user = iUserService.getUserByEmail(email);
        FlightSchedule flightSchedule = flightScheduleService.getFlightById(idSchedule);
        Set<SeatDetail> SeatDetails = flightSchedule.getSeatDetails();
        for (SeatDetail s : SeatDetails) {
            if ((s.getId().getSeat_id() == idSeat) &&
                    (user.getId() == s.getUserBookingSeat())) {
                s.setUserBookingSeat(0);
                s.setStatus(SeatStatus.AVAILABLE);
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

package com.sky.airline.Services.Impl;

import com.sky.airline.Config.JwtTokenProvider;
import com.sky.airline.Entities.*;
import com.sky.airline.Enums.SeatStatus;
import com.sky.airline.Repositories.ISeatDetailRepository;
import com.sky.airline.Repositories.ISeatRepository;
import com.sky.airline.Services.IFlightScheduleService;
import com.sky.airline.Services.ISeatService;
import com.sky.airline.Services.IUserService;
import com.sky.airline.Services.KafkaService.ProducerService;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class SeatServiceImpl implements ISeatService {

    private final ISeatDetailRepository seatDetailRepository;

    private final SimpMessagingTemplate simpMessagingTemplate;

    private final ProducerService producerService;

    private final IUserService iUserService;

    private final ISeatRepository seatRepository;

    @Override
    public void bookingSeat(int idSeat, long idFlight, String token) {
        String email = new JwtTokenProvider().getUserIdFromJWT(token);
        User user = iUserService.getUserByEmail(email);
        List<SeatDetail> SeatDetails = this.getSeatDetailById(idFlight);
        for (SeatDetail s : SeatDetails) {
            if (s.getSeat().getId() == idSeat) {
                s.setFlightId(idFlight);
                s.setUserBookingSeat(user.getId());
                s.setStatus(SeatStatus.BOOKING);
                seatDetailRepository.save(s);
            }
        }
        producerService.setFlightSchedule(SeatDetails);
    }

    @Override
    public void cancelSeat(int idSeat, long idFlight, String token) {
        String email = new JwtTokenProvider().getUserIdFromJWT(token);
        User user = iUserService.getUserByEmail(email);
        List<SeatDetail> SeatDetails = this.getSeatDetailById(idFlight);
        for (SeatDetail s : SeatDetails) {
            if ((s.getSeat().getId() == idSeat) &&
                    (user.getId() == s.getUserBookingSeat()) &&
                    (s.getStatus() == SeatStatus.BOOKING)) {
                s.setUserBookingSeat(0);
                s.setStatus(SeatStatus.AVAILABLE);
                seatDetailRepository.save(s);
            }
        }
        producerService.setFlightSchedule(SeatDetails);
    }

    @Override
    public Seat getSeatBySeatCode(String seatCode) {
        return seatRepository.getSeatBySeatCode(seatCode);
    }

//    @Override
//    public SeatDetail getSeatDetailById(FlightSeatKey flightSeatKey) {
//        return seatDetailRepository.getReferenceById(flightSeatKey);
//    }

    @Override
    public void saveSeatDetail(SeatDetail seatDetail) {
        seatDetailRepository.save(seatDetail);
    }

    @Override
    public Seat getSeatById(Integer seatId) {
        return seatRepository.findById(seatId).get();
    }

    @Override
    @KafkaListener(groupId = "seatG", topics = "seatTopic")
    public void listenFlightSchedule(List<SeatDetail> seatDetails) {
        simpMessagingTemplate.convertAndSend("/topic/seatTopic", seatDetails);
    }

    @Override
    public List<SeatDetail> getSeatDetailByFlightIds(List<Long> flightIds) {
        return seatDetailRepository.findSeatDetailsByFlightIds(flightIds);
    }

    @Override
    public List<SeatDetail> getSeatDetailById(Long flightId) {
        return seatDetailRepository.findAllByFlightId(flightId);
    }

    @Override
    public SeatDetail getSeatDetailBySeatIdAndFlightId(Integer seatId, Long flightId) {
        return seatDetailRepository.getSeatDetailBySeatIdAndFlightId(seatId, flightId);
    }
}

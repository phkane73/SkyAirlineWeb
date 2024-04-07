package com.sky.airline.Services.Impl;

import com.google.zxing.WriterException;
import com.sky.airline.Config.JwtTokenProvider;
import com.sky.airline.Entities.*;
import com.sky.airline.Enums.SeatStatus;
import com.sky.airline.Repositories.ITicketRepository;
import com.sky.airline.Services.CloudinaryService.QRCodeToCloudinary;
import com.sky.airline.Services.ISendMailService;
import com.sky.airline.Services.ITicketService;
import com.sky.airline.Services.KafkaService.ProducerService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TicketServiceImpl implements ITicketService {

    private final ITicketRepository ticketRepository;

    private final FlightScheduleServiceImpl flightScheduleService;

    private final UserServiceImpl userService;

    private final SeatServiceImpl seatService;

    private final ProducerService producerService;

    private final ISendMailService sendMailService;

    private final QRCodeToCloudinary qrCodeToCloudinary;


    @Override
    public void createTicket(String paymentMethod, Float ticketPrice, Integer seatId,
                             Long flightScheduleId, Integer userId, String paymentId) throws IOException, WriterException {
        FlightSchedule flightSchedule = flightScheduleService.getFlightById(flightScheduleId);
        User user = userService.getUserById(userId);
        Seat seat = seatService.getSeatById(seatId);
        Ticket ticket = new Ticket();
        ticket.setPayMethod(paymentMethod);
        ticket.setSeat(seat);
        ticket.setTicketPrice(ticketPrice);
        ticket.setFlightSchedule(flightSchedule);
        ticket.setPaymentId(paymentId);
        ticket.setPayDate(java.time.LocalDateTime.now());
        ticket.setUser(user);
        ticket.setCheckRevenue(false);
        String qrcode = qrCodeToCloudinary.createQRCodeToCloudinary(flightSchedule.getFlightCode());
        ticket.setQRCode(qrcode);
        producerService.setTicket(ticket);
        ticketRepository.save(ticket);
        FlightSeatKey flightSeatKey = new FlightSeatKey(seat.getId(), flightScheduleId);
        SeatDetail seatDetail = seatService.getSeatDetailById(flightSeatKey);
        seatDetail.setStatus(SeatStatus.BOOKED);
        seatService.saveSeatDetail(seatDetail);
    }

    @Override
    public List<Ticket> allTicket() {
        return ticketRepository.findAll();
    }

    @Override
    @KafkaListener(topics = "ticketTopic", groupId = "ticketG")
    public void sendTicket(Ticket ticket) throws MessagingException {
        sendMailService.sendTicket(ticket);
    }

    @Override
    public List<Ticket> getTicketsByUserId(String token) {
        String email = new JwtTokenProvider().getUserIdFromJWT(token);
        User user = userService.getUserByEmail(email);
        return ticketRepository.findAllByUserId(user.getId());
    }
}

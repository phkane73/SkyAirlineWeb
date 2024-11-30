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
import java.util.Random;

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
                             Long flightId, Integer userId, String paymentId) throws IOException, WriterException {
        User user = userService.getUserById(userId);
        Seat seat = seatService.getSeatById(seatId);
        Ticket ticket = new Ticket();
        ticket.setPayMethod(paymentMethod);
        ticket.setSeat(seat);
        ticket.setTicketPrice(ticketPrice);
        ticket.setPaymentId(paymentId);
        ticket.setIdFlight(flightId);
        ticket.setPayDate(java.time.LocalDateTime.now());
        ticket.setUser(user);
        ticket.setCheckRevenue(false);
        String ticketCode = generateRandomString();
        String qrcode = qrCodeToCloudinary.createQRCodeToCloudinary(ticketCode);
        ticket.setQRCode(qrcode);
        producerService.setTicket(ticket);
        ticketRepository.save(ticket);
        SeatDetail seatDetail =seatService.getSeatDetailBySeatIdAndFlightId(seatId, flightId);
        seatDetail.setStatus(SeatStatus.BOOKED);
        seatService.saveSeatDetail(seatDetail);
    }

    public String generateRandomString() {
        int length = 7;
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        Random random = new Random();
        StringBuilder result = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            result.append(characters.charAt(index));
        }
        return result.toString();
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

    @Override
    public long count() {
        return ticketRepository.count();
    }
}

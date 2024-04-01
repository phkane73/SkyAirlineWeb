package com.sky.airline.Services;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.sky.airline.Entities.Ticket;
import com.sky.airline.Entities.User;
import jakarta.mail.MessagingException;

public interface ISendMailService {

    String randomCode(String mail, User user) throws JsonProcessingException;

    void sendEmail(User user) throws MessagingException;

    void sendTicket(Ticket ticket) throws MessagingException;
}

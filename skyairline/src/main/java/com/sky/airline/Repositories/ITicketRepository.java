package com.sky.airline.Repositories;

import com.sky.airline.Entities.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ITicketRepository extends JpaRepository<Ticket, Long> {

    List<Ticket> findAllByUserId(int userId);

    List<Ticket> findAllByPayDateBetween(LocalDateTime start, LocalDateTime end);
}

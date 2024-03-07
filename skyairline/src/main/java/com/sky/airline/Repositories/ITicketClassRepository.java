package com.sky.airline.Repositories;

import com.sky.airline.Entities.TicketClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITicketClassRepository extends JpaRepository<TicketClass, Integer> {
}

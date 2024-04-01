package com.sky.airline.Repositories;

import com.sky.airline.Entities.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISeatRepository extends JpaRepository<Seat, Integer> {

    Seat getSeatBySeatCode(String seatCode);
}

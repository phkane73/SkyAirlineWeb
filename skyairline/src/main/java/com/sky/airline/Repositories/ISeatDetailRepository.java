package com.sky.airline.Repositories;

import com.sky.airline.Entities.SeatDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ISeatDetailRepository extends JpaRepository<SeatDetail, Integer> {
    @Query("SELECT sd FROM SeatDetail sd WHERE sd.flightId IN :flightIds")
    List<SeatDetail> findSeatDetailsByFlightIds(@Param("flightIds") List<Long> flightIds);

    List<SeatDetail> findAllByFlightId(Long flightId);

    SeatDetail getSeatDetailBySeatIdAndFlightId(Integer seatId, Long flightId);
}

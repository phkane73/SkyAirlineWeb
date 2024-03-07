package com.sky.airline.Repositories;

import com.sky.airline.Entities.SeatDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISeatDetailRepository extends JpaRepository<SeatDetail, Long> {
}

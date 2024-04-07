package com.sky.airline.Repositories;

import com.sky.airline.Entities.Revenue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Repository
public interface IRevenueRepository extends JpaRepository<Revenue, Long> {

    Revenue getByDate(LocalDate date);
}

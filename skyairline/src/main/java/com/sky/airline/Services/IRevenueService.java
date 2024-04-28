package com.sky.airline.Services;

import com.sky.airline.Dto.RevenueDTO;
import com.sky.airline.Entities.Revenue;

import java.util.List;

public interface IRevenueService {

    void countRevenue();

    List<Revenue> revenues();

    List<RevenueDTO> revenueMonths();

    List<RevenueDTO> revenueYears();
}

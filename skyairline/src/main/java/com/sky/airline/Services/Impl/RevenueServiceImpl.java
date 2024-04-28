package com.sky.airline.Services.Impl;

import com.sky.airline.Dto.RevenueDTO;
import com.sky.airline.Entities.Revenue;
import com.sky.airline.Entities.Ticket;
import com.sky.airline.Repositories.IRevenueRepository;
import com.sky.airline.Repositories.ITicketRepository;
import com.sky.airline.Services.IRevenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class RevenueServiceImpl implements IRevenueService {

    private final IRevenueRepository revenueRepository;

    private final ITicketRepository ticketRepository;

    private final static String dateTimePattern = "yyyy-MM";

    @Override
    public void countRevenue() {
        LocalDate dateNow = LocalDate.now();
        List<Ticket> ticketList = ticketRepository.findAll();
        for (Ticket ticket : ticketList) {
            // Kiểm tra xem vé đã bán có ngày trước ngày hiện tại không
            if (ticket.getPayDate().toLocalDate().isBefore(dateNow) && ticket.getCheckRevenue().equals(false)) {
                Revenue revenue = revenueRepository.getByDate(ticket.getPayDate().toLocalDate());
                if (revenue != null) {
                    ticket.setCheckRevenue(true);
                    revenue.setTotalRevenue(revenue.getTotalRevenue() + ticket.getTicketPrice());
                    revenueRepository.save(revenue);
                } else {
                    Revenue revenueNew = new Revenue();
                    revenueNew.setDate(ticket.getPayDate().toLocalDate());
                    ticket.setCheckRevenue(true);
                    revenueNew.setTotalRevenue(ticket.getTicketPrice());
                    revenueRepository.save(revenueNew);
                }
            }
        }
    }

    @Override
    public List<Revenue> revenues() {
        return revenueRepository.findAll();
    }

    @Override
    public List<RevenueDTO> revenueMonths() {
        List<Revenue> revenues = revenueRepository.findAll();
        Map<String, Float> monthlyRevenueMap = new HashMap<>();
        for (Revenue revenue : revenues) {
            String monthYearKey = revenue.getDate().getMonthValue() + "-" + revenue.getDate().getYear();
            if (monthlyRevenueMap.containsKey(monthYearKey)) {
                float totalRevenue = monthlyRevenueMap.get(monthYearKey) + revenue.getTotalRevenue();
                monthlyRevenueMap.put(monthYearKey, totalRevenue);
            } else {
                monthlyRevenueMap.put(monthYearKey, revenue.getTotalRevenue());
            }
        }
        List<RevenueDTO> results = new ArrayList<>();
        for (Map.Entry<String, Float> entry : monthlyRevenueMap.entrySet()) {
            String monthYear = entry.getKey();
            float amount = entry.getValue();
            RevenueDTO monthlyRevenue = new RevenueDTO();
            monthlyRevenue.setTotalRevenue(amount);
            monthlyRevenue.setDate(monthYear);
            results.add(monthlyRevenue);
        }
        return results;
    }

    @Override
    public List<RevenueDTO> revenueYears() {
        List<Revenue> revenues = revenueRepository.findAll();
        Map<String, Float> yearRevenueMap = new HashMap<>();
        for (Revenue revenue : revenues) {
            String yearKey = String.valueOf(revenue.getDate().getYear());
            if (yearRevenueMap.containsKey(yearKey)) {
                float totalRevenue = yearRevenueMap.get(yearKey) + revenue.getTotalRevenue();
                yearRevenueMap.put(yearKey, totalRevenue);
            } else {
                yearRevenueMap.put(yearKey, revenue.getTotalRevenue());
            }
        }
        List<RevenueDTO> results = new ArrayList<>();
        for (Map.Entry<String, Float> entry : yearRevenueMap.entrySet()) {
            String year = entry.getKey();
            float amount = entry.getValue();
            RevenueDTO yearRevenue = new RevenueDTO();
            yearRevenue.setTotalRevenue(amount);
            yearRevenue.setDate(year);
            results.add(yearRevenue);
        }
        return results;
    }


}

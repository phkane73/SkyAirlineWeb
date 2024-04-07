package com.sky.airline.Services.Impl;

import com.sky.airline.Entities.Revenue;
import com.sky.airline.Entities.Ticket;
import com.sky.airline.Repositories.IRevenueRepository;
import com.sky.airline.Repositories.ITicketRepository;
import com.sky.airline.Services.KafkaService.IRevenueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RevenueServiceImpl implements IRevenueService {

    private final IRevenueRepository revenueRepository;

    private final ITicketRepository ticketRepository;

    @Override
    public void countRevenue() {
        LocalDate dateNow = LocalDate.now();
        List<Ticket> ticketList = ticketRepository.findAll();
        for (Ticket ticket : ticketList) {
            // Kiểm tra xem vé đã bán có ngày trước ngày hiện tại không
            if (ticket.getPayDate().toLocalDate().isBefore(dateNow) && ticket.getCheckRevenue().equals(false)) {
                Revenue revenue = revenueRepository.getByDate(ticket.getPayDate().toLocalDate());
                if(revenue != null){
                    ticket.setCheckRevenue(true);
                    revenue.setTotalRevenue(revenue.getTotalRevenue()+ ticket.getTicketPrice());
                    revenueRepository.save(revenue);
                }else{
                    Revenue revenueNew = new Revenue();
                    revenueNew.setDate(ticket.getPayDate().toLocalDate());
                    ticket.setCheckRevenue(true);
                    revenueNew.setTotalRevenue(ticket.getTicketPrice());
                    revenueRepository.save(revenueNew);
                }
            }
        }
    }
}

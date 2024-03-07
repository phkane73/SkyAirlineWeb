package com.sky.airline.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateScheduleRQ {
    private String startDate;
    private String endDate;
    private int action;
}

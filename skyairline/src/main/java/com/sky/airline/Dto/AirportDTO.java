package com.sky.airline.Dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AirportDTO {

    private String airportName;

    private List<PlaneDTO> planeLists;

    private int quanlityPlaneCurrent;


}

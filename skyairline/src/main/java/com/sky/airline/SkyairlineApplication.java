package com.sky.airline;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.kafka.annotation.EnableKafka;

@SpringBootApplication
public class SkyairlineApplication {

	public static void main(String[] args) {
		SpringApplication.run(SkyairlineApplication.class, args);
	}

}

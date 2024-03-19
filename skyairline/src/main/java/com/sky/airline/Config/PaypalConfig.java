package com.sky.airline.Config;

import com.paypal.base.rest.APIContext;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class PaypalConfig {
    @Bean
    public APIContext apiContext(){
        return new APIContext("AVb4L9dRkYo_DCNxUPkyi38KPZuJW90TpzYthv6QIxhOBMJMns0rrfk3pWNSZAvPGm6LcVhXfsMJEM4l",
                "EK9yu8CfkHbk-KXZbBnBjY5NwZj0efHkb6j3jJ06Vad1eEgvHNE3b_axoka85kHnMpH3xaSnIe5RiGjA",
                "sandbox");
    }
}

package com.sky.airline.Services.Impl;

import com.google.zxing.WriterException;
import com.sky.airline.Services.IPaymentService;
import lombok.RequiredArgsConstructor;
import lombok.Value;
import org.json.JSONObject;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.Base64;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements IPaymentService {

    private final String BASE_API_PAYPAL = "https://api-m.sandbox.paypal.com";

    private final TicketServiceImpl ticketService;

    @Override
    public String getAuth(String client_id, String app_secret) {
        String auth = client_id + ":" + app_secret;
        return Base64.getEncoder().encodeToString(auth.getBytes());
    }

    @Override
    public String generateAccessToken() {
        String auth = this.getAuth(
                "AVb4L9dRkYo_DCNxUPkyi38KPZuJW90TpzYthv6QIxhOBMJMns0rrfk3pWNSZAvPGm6LcVhXfsMJEM4l",
                "EK9yu8CfkHbk-KXZbBnBjY5NwZj0efHkb6j3jJ06Vad1eEgvHNE3b_axoka85kHnMpH3xaSnIe5RiGjA"
        );
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", "Basic " + auth);

        MultiValueMap<String, String> requestBody = new LinkedMultiValueMap<>();
        HttpEntity<?> request = new HttpEntity<>(requestBody, headers);
        requestBody.add("grant_type", "client_credentials");

        ResponseEntity<String> response = restTemplate.postForEntity(
                BASE_API_PAYPAL + "/v1/oauth2/token",
                request,
                String.class
        );

        if (response.getStatusCode() == HttpStatus.OK) {
            return new JSONObject(response.getBody()).getString("access_token");
        } else {
            return "Unavailable to get ACCESS TOKEN, STATUS CODE " + response.getStatusCode();
        }
    }

    @Override
    public Object createPayment(String total) {
        String accessToken = generateAccessToken();
        RestTemplate restTemplate = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/json");
        headers.add("Accept", "application/json");
        headers.setContentType(MediaType.APPLICATION_JSON);

        //JSON String
        String requestJson = "{\"intent\":\"CAPTURE\",\"purchase_units\":[{\"amount\":{\"currency_code\":\"USD\",\"value\":\"" + total + "\"}}]}";
        HttpEntity<String> entity = new HttpEntity<String>(requestJson, headers);

        ResponseEntity<Object> response = restTemplate.exchange(
                BASE_API_PAYPAL + "/v2/checkout/orders",
                HttpMethod.POST,
                entity,
                Object.class
        );
        if (response.getStatusCode() == HttpStatus.CREATED) {
            return response.getBody();
        } else {
            System.out.println("Unavailable to get CAPTURE ORDER, STATUS CODE " + response.getStatusCode());
        }

        return null;
    }

    @Override
    public Object capturePayment(String paymentId, String method, Float price, Integer seatId, Long flightId, Integer userId) throws IOException, WriterException {
        String accessToken = generateAccessToken();
        HttpHeaders headers = new HttpHeaders();
        RestTemplate restTemplate = new RestTemplate();

        headers.set("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/json");
        headers.add("Accept", "application/json");
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<String> entity = new HttpEntity<String>(null, headers);

        ResponseEntity<Object> response = restTemplate.exchange(
                BASE_API_PAYPAL + "/v2/checkout/orders/" + paymentId + "/capture",
                HttpMethod.POST,
                entity,
                Object.class
        );

        if (response.getStatusCode() == HttpStatus.CREATED) {
            ticketService.createTicket(method, price, seatId, flightId, userId, paymentId);
            return new ResponseEntity<>(response.getBody(), HttpStatus.OK);
        } else {
            System.out.println("Unavailable to get CREATE AN ORDER, STATUS CODE " + response.getStatusCode());
        }

        return null;
    }
}


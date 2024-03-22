package com.sky.airline.Services;

public interface IPaymentService {

    String getAuth(String client_id, String app_secret);

    String generateAccessToken();

    Object createPayment(String total);

    Object capturePayment(String id);
}

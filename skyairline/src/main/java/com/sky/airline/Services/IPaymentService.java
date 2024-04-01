package com.sky.airline.Services;

import com.google.zxing.WriterException;

import java.io.IOException;

public interface IPaymentService {

    String getAuth(String client_id, String app_secret);

    String generateAccessToken();

    Object createPayment(String total);

    Object capturePayment(String paymentId,String method, Float price, Integer seatId, Long flightId, Integer userId) throws IOException, WriterException;
}

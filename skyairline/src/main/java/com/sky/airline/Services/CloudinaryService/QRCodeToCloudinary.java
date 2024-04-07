package com.sky.airline.Services.CloudinaryService;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.google.zxing.BarcodeFormat;
import com.google.zxing.WriterException;
import com.google.zxing.client.j2se.MatrixToImageWriter;
import com.google.zxing.common.BitMatrix;
import com.google.zxing.qrcode.QRCodeWriter;
import org.springframework.stereotype.Service;


import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Map;


@Service
public class QRCodeToCloudinary {

    public String createQRCodeToCloudinary(String value) throws IOException, WriterException {
        int width = 250;
        int height = 250;

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        BitMatrix matrix = new QRCodeWriter().encode(value, BarcodeFormat.QR_CODE, width, height);

        MatrixToImageWriter.writeToStream(matrix, "PNG", outputStream);
        byte[] imageBytes = outputStream.toByteArray();

        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dzfwvoijo",
                "api_key", "749281176233987",
                "api_secret", "BzQjqSewHKCgvfLjeosAX8x8Z0o"));
        Map<String, Object> uploadResult = cloudinary.uploader().upload(imageBytes, ObjectUtils.asMap(
                "folder", "qr-code"
        ));
        return uploadResult.get("url").toString();
    }
}

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


@Service
public class QRCodeToCloudinary {

    public void createQRCodeToCloudinary() throws IOException, WriterException {
        String data = "Ha noi mua thu";
        int width = 200;
        int height = 200;

        QRCodeWriter qrCodeWriter = new QRCodeWriter();

        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        BitMatrix matrix = new QRCodeWriter().encode(data, BarcodeFormat.QR_CODE, width, height);

        MatrixToImageWriter.writeToStream(matrix, "PNG", outputStream);
        byte[] imageBytes = outputStream.toByteArray();

        Cloudinary cloudinary = new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dzfwvoijo",
                "api_key", "749281176233987",
                "api_secret", "BzQjqSewHKCgvfLjeosAX8x8Z0o"));
        cloudinary.uploader().upload("https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
                ObjectUtils.asMap("public_id", "olympic_flag"));
    }
}

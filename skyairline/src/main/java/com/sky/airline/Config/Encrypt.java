package com.sky.airline.Config;

import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.stereotype.Component;

import java.security.MessageDigest;

@Component
public class Encrypt {
    public static String toSHA512(String str) {
        //Chuỗi ramdom để tăng tính bảo mật cho mật khẩu
        String salt = "dfhash9qkhjasohdfsa@abd";
        String result = null;
        //Thêm chuỗi mã hóa vào mật khẩu
        str = str + salt;
        //Sau đó tiến hành m hóa sha-1
        try {
            byte[] dataBytes = str.getBytes("UTF-8");
            MessageDigest md = MessageDigest.getInstance("SHA-512");
            result = Base64.encodeBase64String(md.digest(dataBytes));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
}

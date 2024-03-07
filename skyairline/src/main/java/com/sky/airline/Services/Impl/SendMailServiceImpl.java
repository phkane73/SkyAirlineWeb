package com.sky.airline.Services.Impl;

import com.sky.airline.Entities.User;
import com.sky.airline.Services.ISendMailService;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.context.Context;
import org.thymeleaf.spring6.SpringTemplateEngine;

import java.nio.charset.StandardCharsets;
import java.util.Random;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class SendMailServiceImpl implements ISendMailService {

    private final JavaMailSender javaMailSender;

    private final SpringTemplateEngine templateEngine;

    private final RedisTemplate<String, Object> redisTemplate;

    private final StringRedisTemplate stringRedisTemplate;

    @Value("skyairline7393@gmail.com")
    private String from;

    @Override
    @Cacheable(value = "cacheCode", key = "#mail")
    public String randomCode(String mail, User user) {
        Random random = new Random();
        int randomNumber = 100000 + random.nextInt(900000);
        stringRedisTemplate.opsForValue().set(mail, String.valueOf(randomNumber), 5, TimeUnit.MINUTES);
        redisTemplate.opsForValue().set(mail, user, 10, TimeUnit.MINUTES);
        return String.valueOf(randomNumber);
    }

    @Override
    public void sendEmail(User user) throws MessagingException {
        MimeMessage message = javaMailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, StandardCharsets.UTF_8.name());
        String code = randomCode(user.getEmail(), user);
        Context context = new Context();
        context.setVariable("name", user.getUsername());
        context.setVariable("veriflycode", code);
        String html = templateEngine.process("SkyAirline-VeriflyCode", context);
        helper.setTo(user.getEmail());
        helper.setText(html, true);
        helper.setSubject("Mã xác thực email của bạn!!!");
        helper.setFrom(from);
        javaMailSender.send(message);
    }
}

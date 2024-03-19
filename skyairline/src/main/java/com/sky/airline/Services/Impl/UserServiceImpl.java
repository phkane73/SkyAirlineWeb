package com.sky.airline.Services.Impl;

import com.sky.airline.Config.Encrypt;
import com.sky.airline.Config.JwtTokenProvider;
import com.sky.airline.Dto.AuthRequest;
import com.sky.airline.Entities.User;
import com.sky.airline.Repositories.IUserRepository;
import com.sky.airline.Services.ISendMailService;
import com.sky.airline.Services.IUserService;
import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserDetailsService, IUserService {

    private final IUserRepository iuserRepository;

    private final RedisTemplate<String, Object> redisTemplatel;

    private final StringRedisTemplate stringRedisTemplate;

    private final ISendMailService iSendMailService;

    private final JwtTokenProvider jwtTokenProvider;

    @Override
    public boolean checkEmailExist(String email) {
        User userExist = iuserRepository.findByEmail(email);
        return userExist != null;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = iuserRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(email);
        }
        AuthRequest authRequest = new AuthRequest(user.getEmail(), user.getPassword());
        return new CustomUserDetails(authRequest);
    }

    @Override
    @KafkaListener(topics = "emailTopic", groupId = "emailG")
    public Boolean registerVeriflyEmail(User user) throws MessagingException {
        iSendMailService.sendEmail(user);
        System.out.println(user.getEmail());
        return true;
    }

    @Override
    public Boolean registerVeriflyCode(String email, String code) {
        String codeAuth = stringRedisTemplate.opsForValue().get(email);
        User userRedis = (User) redisTemplatel.opsForValue().get(email);
        if (code.equals(codeAuth) && userRedis != null) {
            userRedis.setPassword(Encrypt.toSHA512(userRedis.getPassword()));
            iuserRepository.save(userRedis);
            stringRedisTemplate.delete(email);
            redisTemplatel.delete(email);
            return true;
        }
        return false;
    }

    @Override
    public String login(AuthRequest authRequest) {
        User userExist = iuserRepository.findByEmail(authRequest.getEmail());
        if (userExist != null) {
            String passwordAuth = userExist.getPassword();
            if (passwordAuth.equals(Encrypt.toSHA512(authRequest.getPassword()))) {
                jwtTokenProvider.generateToken(new CustomUserDetails(authRequest));
                return jwtTokenProvider.generateToken(new CustomUserDetails(authRequest));
            }
        }
        return null;
    }

    @Override
    public User getUserByEmail(String email) {
        return iuserRepository.findByEmail(email);
    }

    @Override
    public void saveUser(User user) {
        iuserRepository.save(user);
    }
}





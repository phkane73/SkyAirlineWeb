package com.sky.airline.Services;

import com.sky.airline.Dto.AuthRequest;
import com.sky.airline.Dto.UserDTO;
import com.sky.airline.Entities.User;
import jakarta.mail.MessagingException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.List;

public interface IUserService {

    boolean checkEmailExist(String email);
    UserDetails loadUserByUsername(String email) throws UsernameNotFoundException;

    Boolean registerVeriflyEmail(User user) throws MessagingException;

    Boolean registerVeriflyCode(String email, String code);

    String login(AuthRequest authRequest);

    List<UserDTO> allUser();

    User getUserByEmail(String email);

    User getUserById(int userId);

    void saveUser(User user);

    long countUser();
}

package com.sky.airline.Controllers;

import com.sky.airline.Config.JwtTokenProvider;
import com.sky.airline.Dto.AuthRequest;
import com.sky.airline.Dto.UserDTO;
import com.sky.airline.Entities.User;
import com.sky.airline.Services.IUserService;
import com.sky.airline.Services.KafkaService.ProducerService;
import jakarta.mail.MessagingException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/public/user")
@RequiredArgsConstructor
public class UserController {

    private final IUserService iUserService;

    private final ProducerService producerService;

    @PostMapping("/register")
    public ResponseEntity<?> userRegister(@Valid @RequestBody User user, BindingResult bindingResult) throws MessagingException {
        if (bindingResult.hasErrors()) {
            return new ResponseEntity<>(bindingResult.getFieldErrors(), HttpStatus.OK);
        }
        if (iUserService.checkEmailExist(user.getEmail())) {
            return new ResponseEntity<>(false, HttpStatus.OK);
        }
        producerService.sendMessage(user);
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    @PostMapping("/verifycode")
    public ResponseEntity<?> veriflycode(@RequestBody Map<String, Object> request) {
        return new ResponseEntity<>(iUserService.registerVeriflyCode(request.get("email").toString(),
                request.get("codeverify").toString()), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody AuthRequest authRequest) {
        String token = iUserService.login(authRequest);
        if (token != null) {
            return new ResponseEntity<>(token, HttpStatus.OK);
        }
        return new ResponseEntity<>(false, HttpStatus.OK);
    }

    @PostMapping("/info")
    public ResponseEntity<?> getUser(@RequestBody Map<String, Object> request) {
        String email = new JwtTokenProvider().getUserIdFromJWT(request.get("token").toString());
        User user = iUserService.getUserByEmail(email);
        UserDTO userDTO = new UserDTO();
        userDTO.setId(user.getId());
        userDTO.setUsername(user.getUsername());
        userDTO.setPhone(user.getPhone());
        userDTO.setEmail(user.getEmail());
        userDTO.setBirthday(user.getBirthday());
        return new ResponseEntity<>(userDTO, HttpStatus.OK);
    }

    @PostMapping("/confirm")
    public ResponseEntity<?> confirmInformation(@RequestBody User user) {
        User userOld = iUserService.getUserByEmail(user.getEmail());
        userOld.setPhone(user.getPhone());
        userOld.setUsername(user.getUsername());
        userOld.setBirthday(user.getBirthday());
        iUserService.saveUser(userOld);
        return new ResponseEntity<>(true,HttpStatus.OK);
    }
}

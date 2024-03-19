package com.sky.airline.Repositories;

import com.sky.airline.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);

    Optional<User> findByUsername(String username);
}

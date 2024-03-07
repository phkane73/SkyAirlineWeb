package com.sky.airline.Repositories;

import com.sky.airline.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IUserRepository extends JpaRepository<User, Integer> {

    User findByEmail(String email);
}

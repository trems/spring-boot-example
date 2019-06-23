package ru.sharashin.springbootexample.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sharashin.springbootexample.domain.User;

public interface UserDetailsRepo extends JpaRepository<User, String> {
}

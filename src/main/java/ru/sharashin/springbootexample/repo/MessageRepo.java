package ru.sharashin.springbootexample.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import ru.sharashin.springbootexample.domain.Message;

public interface MessageRepo extends JpaRepository<Message, Long> {
}

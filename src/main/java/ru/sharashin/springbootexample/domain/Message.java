package ru.sharashin.springbootexample.domain;


import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonView;
import lombok.Data;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table
@Data
public class Message {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonView(Views.Id.class)
    private Long id;
    @JsonView(Views.IdText.class)
    private String text;

    @Column(updatable = false)
    @JsonFormat(pattern = "dd-MM-yyyy HH:mm")
    @JsonView(Views.FullMessage.class)
    private LocalDateTime creationTime;

}

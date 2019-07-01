package ru.sharashin.springbootexample.controller;


import com.fasterxml.jackson.annotation.JsonView;
import org.springframework.beans.BeanUtils;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;
import ru.sharashin.springbootexample.domain.Message;
import ru.sharashin.springbootexample.domain.Views;
import ru.sharashin.springbootexample.dto.EventType;
import ru.sharashin.springbootexample.dto.ObjectType;
import ru.sharashin.springbootexample.dto.WsEventDto;
import ru.sharashin.springbootexample.repo.MessageRepo;
import ru.sharashin.springbootexample.util.WsSender;

import java.time.LocalDateTime;
import java.util.List;
import java.util.function.BiConsumer;

@RestController
@RequestMapping("message")
public class MessageController {

    private final MessageRepo messageRepo;
    private final BiConsumer<EventType, Message> wsSender;

    public MessageController(MessageRepo messageRepo, WsSender wsSender) {
        this.messageRepo = messageRepo;
        this.wsSender = wsSender.getSender(ObjectType.MESSAGE, Views.IdText.class);
    }


    @GetMapping
    @JsonView(Views.IdText.class)
    public List<Message> list() {
        return messageRepo.findAll(Sort.by("id"));
    }

    @GetMapping("{id}")
    @JsonView(Views.FullMessage.class)
    public Message getOne(@PathVariable("id") Message message) {
        return message;
    }


    @PostMapping
    public void create(@RequestBody Message message) {
        message.setCreationTime(LocalDateTime.now());
        Message createdMessage = messageRepo.save(message);
        wsSender.accept(EventType.CREATE, createdMessage);
//        return createdMessage;
    }

    @PutMapping("{id}")
    public Message update(
            @PathVariable("id") Message messageFromDb,
            @RequestBody Message message
    ) {
        BeanUtils.copyProperties(message, messageFromDb, "id");
        Message updatedMessage = messageRepo.save(messageFromDb);
        wsSender.accept(EventType.UPDATE, updatedMessage);
        return updatedMessage;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Message message) {
        messageRepo.delete(message);
        wsSender.accept(EventType.REMOVE, message);
    }

//    @MessageMapping("/changeMessage")
//    @SendTo("/topic/activity")
//    @JsonView(Views.IdText.class)
//    public Message change(Message message) {
//        if (message.getId() == null) {
//            message.setCreationTime(LocalDateTime.now());
//        }
//        return messageRepo.save(message);
//    }
//    @MessageMapping("/deleteMessage")
//    @SendTo("/topic/del")
//    @JsonView(Views.Id.class)
//    public Message deleteMessage(Message message) {
//        messageRepo.delete(message);
//        return message;
//    }
}

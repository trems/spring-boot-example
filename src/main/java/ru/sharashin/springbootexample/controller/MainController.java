package ru.sharashin.springbootexample.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import ru.sharashin.springbootexample.domain.User;
import ru.sharashin.springbootexample.repo.MessageRepo;

import java.util.HashMap;

@Controller
@RequestMapping("/")
public class MainController {
    private final MessageRepo messageRepo;

    // Get the env variable (from IDE)
    @Value("${spring.profiles.active}")
    private String profile;

    @Autowired
    public MainController(MessageRepo messageRepo) {
        this.messageRepo = messageRepo;
    }


    @GetMapping
    public String main(Model model, @AuthenticationPrincipal User user) {

        HashMap<Object, Object> data = new HashMap<>();


        if (user != null) {
            data.put("profile", user);
            data.put("messages", messageRepo.findAll(Sort.by("id")));
        }

        model.addAttribute("frontendData", data);
        model.addAttribute("isDevMode", "dev".equals(profile));
        return "index";
    }
}

package com.globomatics.bike.controllers;

import java.util.ArrayList;
import java.util.List;

import com.globomatics.bike.models.Bike;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/bikes")
public class BikesController {

    // Only executed when callin "api/v1/bikes" using a GET method
    @GetMapping
    public List<Bike> list() {
        List<Bike> bikes = new ArrayList<>();
        return bikes;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void create(@RequestBody Bike bike) {
        // TODO create a bike
    }

    @GetMapping("/{id}")
    public Bike get(@PathVariable("id") long id) {
        // TODO get the Bike

        return new Bike();
    }
}

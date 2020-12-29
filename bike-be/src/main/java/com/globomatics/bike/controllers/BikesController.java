package com.globomatics.bike.controllers;

import java.util.List;

import com.globomatics.bike.models.Bike;
import com.globomatics.bike.models.SalesPerMonth;
import com.globomatics.bike.models.repositories.BikeRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
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
    @Autowired
    private BikeRepository bikeRepository;

    // Only executed when calling "api/v1/bikes" using a GET method
    @GetMapping
    public List<Bike> list() {
        return bikeRepository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.OK)
    public void create(@RequestBody Bike bike) {
        bikeRepository.save(bike);
    }

    @GetMapping("/{id}")
    public Bike get(@PathVariable("id") long id) {
        return bikeRepository.getOne(id);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable("id") long id) {
        bikeRepository.deleteById(id);
    }

    @DeleteMapping("/multi/{idList}")
    public void delete(@PathVariable List<Long> idList) {
        idList.stream().forEach((id) -> bikeRepository.deleteById(id));
    }

    @GetMapping("/total-sales")
    public long getTotalSales() {
        return bikeRepository.count();
    }

    @GetMapping("total-revenue")
    public float getTotalRevenue() {
        return bikeRepository.totalRevenue();
    }

    @GetMapping("total-serial-number-issues")
    public String getTotalSerialNumberIssues() {
        return bikeRepository.totalWithoutSerialNumber();
    }

    @GetMapping("total-contact-person")
    public String getTotalContactPersons() {
        return bikeRepository.totalContactPersons();
    }

    @GetMapping("current-sales-per-month")
    public List<SalesPerMonth> getLastSalesPerMonth() {
        return bikeRepository.lastSalesPerMonths();
    }
}

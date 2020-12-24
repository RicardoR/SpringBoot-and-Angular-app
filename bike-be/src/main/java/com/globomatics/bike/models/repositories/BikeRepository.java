package com.globomatics.bike.models.repositories;

import com.globomatics.bike.models.Bike;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BikeRepository extends JpaRepository<Bike, Long> {
    
    @Query("SELECT sum(b.purchasePrice) from Bike b")
    Float totalRevenue();
    
}

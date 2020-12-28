package com.globomatics.bike.models.repositories;

import com.globomatics.bike.models.Bike;
import com.globomatics.bike.models.SalesPerMonth;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface BikeRepository extends JpaRepository<Bike, Long> {
    
    @Query("SELECT sum(b.purchasePrice) from Bike b")
    Float totalRevenue();
    
    @Query("SELECT count(*) from Bike where serialNumber is NULL")
    String totalWithoutSerialNumber();
    
    @Query("SELECT count(*) from Bike where contact is true")
    String totalContactPersons();

    @Query(value = "SELECT IFNULL (SUM(b.purchase_price), 0) as Purchase, m.name as Month, m.id "
                    + "FROM Months m "
                    + "LEFT JOIN Bike b " 
                    + "ON strftime('%m', DATE(ROUND(purchase_date / 1000), 'unixepoch')) = m.id "
                    + "AND strftime('%Y', DATE(ROUND(b.purchase_date / 1000), 'unixepoch')) = strftime('%Y', DATE('now')) "
                    + "GROUP BY  m.name, strftime('%m', DATE(ROUND(b.purchase_date / 1000), 'unixepoch')) "
	                + "ORDER BY m.id", nativeQuery=true)
    List<SalesPerMonth> lastSalesPerMonths();
}

package com.globomatics.bike.models;

public class BikeStatisticalData {
    private long totalSales;
    private float totalRevenue;
    private String totalSerialNumberIssues;
    private String totalContactPerson;


    public long getTotalSales() {
        return this.totalSales;
    }

    public void setTotalSales(long totalSales) {
        this.totalSales = totalSales;
    }

    public float getTotalRevenue() {
        return this.totalRevenue;
    }

    public void setTotalRevenue(float totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public String getTotalSerialNumberIssues() {
        return this.totalSerialNumberIssues;
    }

    public void setTotalSerialNumberIssues(String totalSerialNumberIssues) {
        this.totalSerialNumberIssues = totalSerialNumberIssues;
    }

    public String getTotalContactPerson() {
        return this.totalContactPerson;
    }

    public void setTotalContactPerson(String totalContactPerson) {
        this.totalContactPerson = totalContactPerson;
    }
}

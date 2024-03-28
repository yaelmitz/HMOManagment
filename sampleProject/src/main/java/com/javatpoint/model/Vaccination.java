package com.javatpoint.model;

import org.springframework.data.repository.cdi.Eager;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDate;

@Entity
public class Vaccination {
    @Id
    @GeneratedValue
    private Long id;
    private LocalDate vaccinationDate;
    private String manufacturer;

    public Vaccination(Long id, LocalDate vaccinationDate, String manufacturer) {
        this.id = id;
        this.vaccinationDate = vaccinationDate;
        this.manufacturer = manufacturer;
    }
    public Vaccination(){}

    public Long getId() {
        return id;
    }

    public LocalDate getVaccinationDate() {
        return vaccinationDate;
    }

    public String getManufacturer() {
        return manufacturer;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setVaccinationDate(LocalDate vaccinationDate) {
        this.vaccinationDate = vaccinationDate;
    }

    public void setManufacturer(String manufacturer) {
        this.manufacturer = manufacturer;
    }
}

package com.javatpoint.model;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import javax.validation.constraints.Past;
import java.time.LocalDate;

@Entity
public class CoronaDetails {
    @Id
    @GeneratedValue
    private Long id;
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)//for ignoring only in get request
    @OneToOne
    @JoinColumn(name = "hmoMember_id")
    private HmoMember hmoMember;
    @Past
    private LocalDate getPositive;
    private LocalDate recoveryDate;
    @OneToOne
    private Vaccination vac1;
    @OneToOne
    private Vaccination vac2;
    @OneToOne
    private Vaccination vac3;
    @OneToOne
    private Vaccination vac4;

    public CoronaDetails(Long id, LocalDate getPositive, LocalDate recoveryDate, Vaccination vac1, Vaccination vac2, Vaccination vac3, Vaccination vac4,HmoMember hmoMember) {
        this.id = id;
        this.hmoMember=hmoMember;
        this.getPositive = getPositive;
        this.recoveryDate = recoveryDate;
        this.vac1 = vac1;
        this.vac2 = vac2;
        this.vac3 = vac3;
        this.vac4 = vac4;
    }
public CoronaDetails(){}
    public Long getId() {
        return id;
    }

    public LocalDate getGetPositive() {
        return getPositive;
    }

    public LocalDate getRecoveryDate() {
        return recoveryDate;
    }

    public Vaccination getVac1() {
        return vac1;
    }

    public Vaccination getVac2() {
        return vac2;
    }

    public Vaccination getVac3() {
        return vac3;
    }

    public Vaccination getVac4() {
        return vac4;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setGetPositive(LocalDate getPositive) {
        this.getPositive = getPositive;
    }

    public void setRecoveryDate(LocalDate recoveryDate) {
        this.recoveryDate = recoveryDate;
    }

    public void setVac1(Vaccination vac1) {
        this.vac1 = vac1;
    }

    public void setVac2(Vaccination vac2) {
        this.vac2 = vac2;
    }

    public void setVac3(Vaccination vac3) {
        this.vac3 = vac3;
    }

    public void setVac4(Vaccination vac4) {
        this.vac4 = vac4;
    }

    public HmoMember getHmoMember() {
        return hmoMember;
    }

    public void setHmoMember(HmoMember hmoMember) {
        this.hmoMember = hmoMember;
    }
}

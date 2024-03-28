package com.javatpoint.service;

import com.javatpoint.model.CoronaDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public interface CoronaDetailsRepository extends JpaRepository<CoronaDetails,Long> {
    void delete(CoronaDetails coronaDetails);
    void deleteById(Long id);
    //count how many unvaccinated members there are
    long countByVac1IsNullAndVac2IsNullAndVac3IsNullAndVac4IsNull();
    //count how many members have been vaccinated each day of the past month
    long countByRecoveryDateIsNullOrRecoveryDateAfterAndGetPositiveBefore(LocalDate date, LocalDate date2);
}

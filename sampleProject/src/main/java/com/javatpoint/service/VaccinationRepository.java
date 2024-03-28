package com.javatpoint.service;

import com.javatpoint.model.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface VaccinationRepository extends JpaRepository<Vaccination,Long> {
    void delete(Vaccination vaccination);
    void deleteById(Long id);


}

package com.javatpoint.service;

import com.javatpoint.model.HmoMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface HmoMemberRepository extends JpaRepository<HmoMember,Long> {
     void deleteById(Long id);
     // void delete(HmoMember, hmoMember);
}

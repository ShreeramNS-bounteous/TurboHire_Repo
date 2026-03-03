package com.company.turbohireclone.backend.repository;
import com.company.turbohireclone.backend.entity.BusinessUnit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BURepository extends JpaRepository<BusinessUnit,Long> {

}

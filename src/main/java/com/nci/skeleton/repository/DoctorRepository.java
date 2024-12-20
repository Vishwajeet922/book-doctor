package com.nci.skeleton.repository;

import com.nci.skeleton.entity.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;
@Repository
public interface DoctorRepository extends JpaRepository<Doctor, UUID> {

}

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo4.reto1.repository;

import com.ciclo4.reto1.model.User;
import java.util.Optional;
import org.springframework.data.repository.CrudRepository;

/**
 *
 * @author SISTEMAS
 */
public interface UserCrudRepository extends CrudRepository<User, Integer>{

    public Optional<User> findByEmailAndPassword(String email, String password);

    public Optional<User> findByEmail(String email);
    
}

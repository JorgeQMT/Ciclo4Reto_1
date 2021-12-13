/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.ciclo4.reto1.service;

import com.ciclo4.reto1.model.User;
import com.ciclo4.reto1.repository.UserRepository;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author SISTEMAS
 */
@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    public List<User> getAll(){
        return userRepository.getAll();
    }
    
    public Optional<User> getUser(int id){
        return userRepository.getUser(id);
    }
    
    public User save(User user){
        if(user.getId()== null){
            if (emailExists(user.getEmail()) == false){
                return userRepository.save(user);
            } else {
                return user;
            }
        } else { 
            return user;
        }  
    }
    
    public boolean emailExists(String email){
        return userRepository.existeEmail(email);
    }
    
    public User userExists(String email, String password) {
        Optional<User> user = userRepository.autenticarUsuario(email, password);
        if (user.isEmpty()) {
            return new User("NO DEFINIDO", email, password);  
        }else {
            return user.get();
        }
    }
    
    public User update(User user){
        if(user.getId()!= null){
            Optional<User> usaux=userRepository.getUser(user.getId());
            if (!usaux.isEmpty()) {
                if (user.getEmail()!= null) {
                    usaux.get().setEmail(user.getEmail());   
                }
                if (user.getPassword()!= null) {
                    usaux.get().setPassword(user.getPassword());   
                }
                if (user.getName() != null) {
                    usaux.get().setName(user.getName());   
                }
                userRepository.save(usaux.get());
                return usaux.get();
            }else{
                return user;
            }
        }else {
            return user;
        }
    }
    
    public boolean deleteUser(int id){
        Boolean aBoolean = getUser(id).map(user ->{
            userRepository.delete(user);
            return true;
        }).orElse(false);
        return aBoolean;
    }
}

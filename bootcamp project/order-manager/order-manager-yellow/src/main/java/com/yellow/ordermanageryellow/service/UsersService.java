package com.yellow.ordermanageryellow.service;

import com.yellow.ordermanageryellow.Dao.CompanyRepository;
import com.yellow.ordermanageryellow.Dao.RolesRepository;
import com.yellow.ordermanageryellow.Dto.UserDTO;
import com.yellow.ordermanageryellow.Dto.UserMapper;
import com.yellow.ordermanageryellow.Dao.UserRepository;
import com.yellow.ordermanageryellow.exceptions.NotValidStatusExeption;
import com.yellow.ordermanageryellow.exceptions.ObjectAlreadyExistException;
import com.yellow.ordermanageryellow.model.*;
//import com.yellow.ordermanageryellow.security.PasswordValidator;
import com.yellow.ordermanageryellow.model.Currency;
import lombok.SneakyThrows;
import com.yellow.ordermanageryellow.Exception.NotFoundException;
import com.yellow.ordermanageryellow.Exception.ObjectExistException;
import com.yellow.ordermanageryellow.Exception.WrongPasswordException;
import com.yellow.ordermanageryellow.exceptions.NoPermissionException;
import com.yellow.ordermanageryellow.model.ProductCategory;
import com.yellow.ordermanageryellow.model.RoleName;
import com.yellow.ordermanageryellow.model.Roles;
import com.yellow.ordermanageryellow.model.Users;
import com.yellow.ordermanageryellow.security.EncryptedData;
import com.yellow.ordermanageryellow.security.JwtToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.List;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;


@Service
public class UsersService {

    @Autowired
    private JwtToken jwtToken;
    @Autowired
    private RolesRepository rolesRepository;
    @Autowired
    private UserRepository UserRepository;
    @Autowired
    private  UserMapper userMapper;

    private BCryptPasswordEncoder bCryptPasswordEncoder;
    @Value("${pageSize}")
    private int pageSize;

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private  CompanyRepository companyRepository;
    public UsersService() {
        this.bCryptPasswordEncoder = new BCryptPasswordEncoder();
    }

    @SneakyThrows
    public Map<String, Object> login(String email, String password) {
        Users user = UserRepository.findByAddressEmail(email);
        if (user == null)
            throw new NotFoundException("user not exist");
        if (bCryptPasswordEncoder.matches(password,user.getPassword())) {
              Map<String, Object> result = new HashMap<>();
            result.put("token", this.jwtToken.generateToken(user));
            result.put("role", user.getRoleId().getName());
            return result;
        } else {
            throw new WrongPasswordException("invalid password");
        }
    }
    @SneakyThrows
    public Users createNewUser(UserDTO newUser, String token) {
        Users user = createUser(newUser);
        String hashedPassword = bCryptPasswordEncoder.encode(user.getPassword());
        user.setPassword(hashedPassword);
        String company = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        Optional<Company> userCompany = companyRepository.findById(company);
        user.setCompanyId(userCompany.get());
        if (!findUser(user, company)) {
            return UserRepository.save(user);
        } else
            throw new ObjectExistException("user is already exist");
    }

    public boolean findUser(Users user, String company) {
        Users foundUser = UserRepository.findByAddressEmail(user.getAddress().getEmail());
        if (foundUser == null || !foundUser.getCompanyId().getId().equals(company))
            return false;
        return true;
    }

    @SneakyThrows
    public void deleteUser(String id, String token) {
        String role = this.jwtToken.decryptToken(token, EncryptedData.ROLE);
        String company = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        Users userFromDB = this.UserRepository.findById(id).orElse(null);
        if (userFromDB == null) {
            throw new NotFoundException("user is not found");
        }
        String companyOfCategory = userFromDB.getCompanyId().getId();
        Roles wholeRole = rolesRepository.findById(role).orElse(null);
        if(!wholeRole.getName().equals(RoleName.ADMIN)|| !company.equals(companyOfCategory)){
            throw new NoPermissionException("You do not have permission to update user");
        }
        UserRepository.deleteById(id);
    }

    @SneakyThrows
    public Users updateUser(UserDTO u, String token) throws NoPermissionException {
        Users user = createUser(u);

        String role = this.jwtToken.decryptToken(token, EncryptedData.ROLE);
        String company = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);

        Users userFromDB = this.UserRepository.findById(user.getId()).orElse(null);
        if (userFromDB == null) {
            throw new NotFoundException("user is not found");
        }
        user.setCompanyId(userFromDB.getCompanyId());
        String companyOfCategory = userFromDB.getCompanyId().getId();
        Roles wholeRole = rolesRepository.findById(role).orElse(null);
        if( !wholeRole.getName().equals(RoleName.ADMIN)|| !company.equals(companyOfCategory)){
            throw new NoPermissionException("You do not have permission to update user");
        }
        return UserRepository.save(user);
    }

    @SneakyThrows
    public HashMap<String, String> getCustomerByNames(String prefix, String token) {
        String roleId = this.jwtToken.decryptToken(token, EncryptedData.ROLE);
        String companyId = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        List<Users> users = UserRepository.findByFullNameContainingAndCompanyIdAndRoleId(prefix, companyId, roleId);
        HashMap<String, String> userMap = new HashMap<>();
        for (Users user : users) {
            userMap.put(user.getId(), user.getFullName());
        }
        return userMap;
    }

    @SneakyThrows
    public List<UserDTO> getUsers(String token) {
        String roleId = this.jwtToken.decryptToken(token, EncryptedData.ROLE);
        String companyId = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        List<Users> users = UserRepository.findAllByCompanyId(companyId);

        List<UserDTO> userDTOs = users.stream()
                .map(userMapper::usersToUserDTO)
                .collect(Collectors.toList());
        return userDTOs;
    }

    @SneakyThrows
    public List<UserDTO> getUsersByRole(int pageNumber, String role, String token) {
        Pageable pageable = PageRequest.of(pageNumber, pageSize);
        Roles roleObj = rolesRepository.getByName(RoleName.valueOf(role));
        String companyId = this.jwtToken.decryptToken(token, EncryptedData.COMPANY);
        Page<Users> users = UserRepository.findAllByCompanyIdAndRoleId(companyId, roleObj.getId(), pageable);
        return users.map(userMapper::usersToUserDTO).getContent();
    }

    @SneakyThrows
    public Map<String, Object> signUp(String fullName, String companyName, String email, String password, Currency currency) {

        Users user = new Users();
        user.setFullName(fullName);
        if(password.equals(" ")){
            throw new NotValidStatusExeption("password not valid");
        }
        String hashedPassword = bCryptPasswordEncoder.encode(password);
        user.setPassword(hashedPassword);
        if(!email.contains("@")){
            throw new NotValidStatusExeption("email not valid");
        }
        if (userRepository.existsByAddressEmail(email)) {
            throw new ObjectAlreadyExistException("this user allready exists");
        }
        Address address = new Address();
        user.setAddress(address);
        user.getAddress().setEmail(email);
        user.setRoleId(rolesRepository.getByName(RoleName.ADMIN));
        AuditData auditData = new AuditData();
        auditData.setCreateDate(LocalDateTime.now());
        auditData.setUpdateDate(LocalDateTime.now());
        user.setAuditData(auditData);
        if (companyRepository.existsByName(companyName)) {
            throw new ObjectAlreadyExistException("company already exists");
        }
        Company company = new Company();
        company.setName(companyName);
        companyRepository.save(company);
        AuditData auditData1 = new AuditData();
        auditData1.setCreateDate(LocalDateTime.now());
        auditData1.setUpdateDate(LocalDateTime.now());
        company.setAuditData(auditData1);
        company.setCurrency(currency);
        user.setCompanyId(company);
        userRepository.save(user);
        Map<String, Object> result = new HashMap<>();
        result.put("token", this.jwtToken.generateToken(user));
        result.put("role", user.getRoleId().getName());
        return result;
    }

    public Users createUser(UserDTO u) {
        Address address = new Address();
        address.setAddress(u.getAddress());
        address.setEmail(u.getEmail());
        address.setTelephone(u.getTelephone());

        Users user = new Users();
        user.setId(u.getId());
        user.setFullName(u.getFullName());
        user.setPassword(u.getPassword());
        user.setAddress(address);

        Roles userRole = rolesRepository.getByName(RoleName.valueOf(u.getRole()));
        user.setRoleId(userRole);
        return user;
    }

}
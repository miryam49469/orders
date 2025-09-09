package com.yellow.ordermanageryellow.security;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.yellow.ordermanageryellow.model.Users;
import org.springframework.stereotype.Component;

import java.util.Date;

;
@Component
public class JwtToken {
    private static final String JWT_TOKEN_SECRET = "mySecret";
    private static final long JWT_TOKEN_EXPIRATION = 604800000L; // 7 days

    public String generateToken(Users user) {
        Algorithm algorithm = Algorithm.HMAC256(JWT_TOKEN_SECRET.getBytes());
        String Token = JWT.create()
                .withClaim("roleId",user.getRoleId().getId())
                .withClaim("id",user.getId())
                .withClaim("companyId",user.getCompanyId().getId())
                .withExpiresAt(new Date(System.currentTimeMillis() + JWT_TOKEN_EXPIRATION))
                .sign(algorithm);
        return Token;
    }

    public String decryptToken(String token,EncryptedData neededData){
        Algorithm algorithm = Algorithm.HMAC256(JWT_TOKEN_SECRET.getBytes());
        DecodedJWT decodedToken = JWT.require(algorithm).build().verify(token);
        if (neededData==EncryptedData.ID){
            return decodedToken.getClaim("id").asString();
        }
        if(neededData==EncryptedData.ROLE){
            return decodedToken.getClaim("roleId").asString();
        }
        else
            return decodedToken.getClaim("companyId").asString();
    }
}

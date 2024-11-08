package com.personal.expensetracker.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Document("users")  // Collection name in MongoDB
public class User {

    @Id
    private String id;

    @Indexed(unique = true)
    @Field("username")
    private String username;
    @Field("password")
    private String password;  // Store hashed password only
}

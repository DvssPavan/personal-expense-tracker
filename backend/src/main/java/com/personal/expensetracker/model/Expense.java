package com.personal.expensetracker.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Document("expense")
public class Expense {
    @Id
    private String id;
    @Field("label")
    @Indexed(unique = true)
    private String label;
    @Field("category")
    private ExpenseCategory category;
    @Field("cost")
    private BigDecimal cost;
    @Field("date")
    private LocalDate date;
}
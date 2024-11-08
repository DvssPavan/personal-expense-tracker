package com.personal.expensetracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Locale.Category;

import com.personal.expensetracker.model.ExpenseCategory;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ExpenseDTO {
    private String label;
    private ExpenseCategory category;
    private BigDecimal cost;
    private LocalDate date;
}

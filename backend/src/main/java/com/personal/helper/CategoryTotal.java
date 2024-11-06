package com.personal.helper;

import java.math.BigDecimal;

import org.springframework.data.annotation.Id;

import com.personal.expensetracker.model.ExpenseCategory;

public class CategoryTotal {
    private @Id ExpenseCategory category;
    private BigDecimal totalCost;

    public CategoryTotal(ExpenseCategory category, BigDecimal totalCost) {
        this.category = category;
        this.totalCost = totalCost;
    }

    // Getters and Setters
    public ExpenseCategory getCategory() {
        return category;
    }

    public void setCategory(ExpenseCategory category) {
        this.category = category;
    }

    public BigDecimal getTotalCost() {
        return totalCost;
    }

    public void setTotalCost(BigDecimal totalCost) {
        this.totalCost = totalCost;
    }
}

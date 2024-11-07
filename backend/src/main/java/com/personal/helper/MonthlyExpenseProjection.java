package com.personal.helper;

import org.springframework.data.annotation.Id;

public interface MonthlyExpenseProjection {
    @Id int getMonth();
    double getTotalCost();
}

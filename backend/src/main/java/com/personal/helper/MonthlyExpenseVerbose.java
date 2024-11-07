package com.personal.helper;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MonthlyExpenseVerbose {
	 private String month;    // Month name (e.g., "January")
	 private BigDecimal totalCost;  // Total cost for the month

}

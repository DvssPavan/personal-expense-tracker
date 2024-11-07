package com.personal.expensetracker.service;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.personal.expensetracker.model.Expense;
import com.personal.expensetracker.repository.ExpenseRepository;
import com.personal.helper.CategoryTotal;
import com.personal.helper.MonthlyExpense;
import com.personal.helper.MonthlyExpenseProjection;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.Month;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class ExpenseService {
	
    private final ExpenseRepository expenseRepository;

    public void addExpense(Expense expense) {
        expenseRepository.insert(expense);
    }

    public void updateExpense(Expense expense) {
        Expense savedExpense = expenseRepository.findById(expense.getId()).orElseThrow(() -> new RuntimeException(String.format("Cannot Find Expense by ID %s", expense.getId())));
        savedExpense.setLabel(expense.getLabel());
        savedExpense.setCategory(expense.getCategory());
        savedExpense.setCost(expense.getCost());

        expenseRepository.save(expense);
    }

    public Expense getExpense(String name) {
        return expenseRepository.findByName(name)
                .orElseThrow(() -> new RuntimeException(String.format("Cannot Find Expense by Name - %s", name)));
    }

    public List<Expense> getAllExpenses() {
    	return expenseRepository.findAll(Sort.by(Sort.Direction.DESC, "date"));
    }

    public void deleteExpense(String id) {
        expenseRepository.deleteById(id);
    }
    
    public List<CategoryTotal> getTotalCostForYear(int year) {
    	LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate startOfNextYear = startOfYear.plusYears(1);

        return expenseRepository.getTotalCostForYear(startOfYear, startOfNextYear);
    }
    
    public List<CategoryTotal> getTotalCostForEachCategoryForYear(int year) {
        // Similar date setup for year and then call expenseRepository.getTotalCostForEachCategoryForYear(...)
    	LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate startOfNextYear = startOfYear.plusYears(1);
        return expenseRepository.getTotalCostForEachCategoryForYear(startOfYear, startOfNextYear);
    }
    
    public List<CategoryTotal> getTotalCostForMonth(int year, int month) {
    	LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        return expenseRepository.getTotalCostForMonth(startOfMonth, startOfNextMonth);
    }
    
    public List<CategoryTotal> getTotalCostForEachCategoryForMonth(int year, int month) {
        // Similar date setup for year and then call expenseRepository.getTotalCostForEachCategoryForYear(...)
    	LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        return expenseRepository.getTotalCostForEachCategoryForMonth(startOfMonth, startOfNextMonth);
    }
    
    public List<MonthlyExpense> getTotalExpenseForEachMonthOfTheYear(int year) {
        LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate startOfNextYear = startOfYear.plusYears(1);

        // Fetch the results and convert month numbers to month names
        List<MonthlyExpense> projections = expenseRepository.getTotalExpenseForEachMonthOfTheYear(startOfYear, startOfNextYear);
        
        
        // Convert each MonthlyExpenseProjection to MonthlyExpense with month name
        return projections;
    }
}
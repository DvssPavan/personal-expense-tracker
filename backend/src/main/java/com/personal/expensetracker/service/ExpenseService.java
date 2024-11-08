package com.personal.expensetracker.service;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.personal.expensetracker.dto.ExpenseDTO;
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
    
    private String getAuthenticatedUsername() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return authentication.getName();
    }
    
    private ExpenseDTO convertToDTO(Expense expense) {
    	System.out.println("Expense is " + expense);
        return new ExpenseDTO(
            expense.getLabel(),
            expense.getCategory(),
            expense.getCost(),
            expense.getDate()
        );
    }

    public void addExpense(ExpenseDTO expenseDTO) {
    	Expense expense = new Expense();
        expense.setLabel(expenseDTO.getLabel());
        expense.setCategory(expenseDTO.getCategory());
        expense.setCost(expenseDTO.getCost());
        expense.setDate(expenseDTO.getDate());
        expense.setUsername(getAuthenticatedUsername());
        expenseRepository.insert(expense);
    }

//    public void updateExpense(Expense expense) {
//        Expense savedExpense = expenseRepository.findById(expense.getId()).orElseThrow(() -> new RuntimeException(String.format("Cannot Find Expense by ID %s", expense.getId())));
//        savedExpense.setLabel(expense.getLabel());
//        savedExpense.setCategory(expense.getCategory());
//        savedExpense.setCost(expense.getCost());
//
//        expenseRepository.save(expense);
//    }

    public Expense getExpense(String name) {
        return expenseRepository.findByName(name, getAuthenticatedUsername())
                .orElseThrow(() -> new RuntimeException(String.format("Cannot Find Expense by Name - %s", name)));
    }

    public List<ExpenseDTO> getAllExpenses() {
    	return expenseRepository.findAllByUsername( getAuthenticatedUsername(), Sort.by(Sort.Direction.DESC, "date"))
    			.stream()
    			.map(this::convertToDTO)
    			.collect(Collectors.toList());
    }

//    public void deleteExpense(String id) {
//        expenseRepository.deleteById(id);
//    }
    
    public List<CategoryTotal> getTotalCostForYear(int year) {
    	LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate startOfNextYear = startOfYear.plusYears(1);

        return expenseRepository.getTotalCostForYear(startOfYear, startOfNextYear, getAuthenticatedUsername());
    }
    
    public List<CategoryTotal> getTotalCostForEachCategoryForYear(int year) {
        // Similar date setup for year and then call expenseRepository.getTotalCostForEachCategoryForYear(...)
    	LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate startOfNextYear = startOfYear.plusYears(1);
        return expenseRepository.getTotalCostForEachCategoryForYear(startOfYear, startOfNextYear ,getAuthenticatedUsername());
    }
    
    public List<CategoryTotal> getTotalCostForMonth(int year, int month) {
    	LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        return expenseRepository.getTotalCostForMonth(startOfMonth, startOfNextMonth, getAuthenticatedUsername());
    }
    
    public List<CategoryTotal> getTotalCostForEachCategoryForMonth(int year, int month) {
        // Similar date setup for year and then call expenseRepository.getTotalCostForEachCategoryForYear(...)
    	LocalDate startOfMonth = LocalDate.of(year, month, 1);
        LocalDate startOfNextMonth = startOfMonth.plusMonths(1);

        return expenseRepository.getTotalCostForEachCategoryForMonth(startOfMonth, startOfNextMonth, getAuthenticatedUsername());
    }
    
    public List<MonthlyExpense> getTotalExpenseForEachMonthOfTheYear(int year) {
        LocalDate startOfYear = LocalDate.of(year, 1, 1);
        LocalDate startOfNextYear = startOfYear.plusYears(1);

        // Fetch the results and convert month numbers to month names
        List<MonthlyExpense> projections = expenseRepository.getTotalExpenseForEachMonthOfTheYear(startOfYear, startOfNextYear, getAuthenticatedUsername());
        
        
        // Convert each MonthlyExpenseProjection to MonthlyExpense with month name
        return projections;
    }
    
}
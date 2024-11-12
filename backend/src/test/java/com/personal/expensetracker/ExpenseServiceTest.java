package com.personal.expensetracker;

import com.personal.expensetracker.dto.ExpenseDTO;
import com.personal.expensetracker.model.Expense;
import com.personal.expensetracker.repository.ExpenseRepository;
import com.personal.expensetracker.service.ExpenseService;
import com.personal.expensetracker.model.ExpenseCategory;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.eq;
import static org.mockito.Mockito.*;
import static com.personal.expensetracker.model.ExpenseCategory.*;

class ExpenseServiceTest {

    @Mock
    private ExpenseRepository expenseRepository;

    @InjectMocks
    private ExpenseService expenseService;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    private static final String TEST_USERNAME = "testUser";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        // Mock SecurityContext to return a predefined username for the authenticated user
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(TEST_USERNAME);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testAddExpense() {
        // Given
		ExpenseDTO expenseDTO = new ExpenseDTO("Lunch", FOOD_AND_DINING , BigDecimal.valueOf(10.50), LocalDate.now());
        Expense expense = new Expense(null, "Lunch",FOOD_AND_DINING, BigDecimal.valueOf(10.50), LocalDate.now(), TEST_USERNAME);

        // When
        when(expenseRepository.insert(any(Expense.class))).thenReturn(expense);
        expenseService.addExpense(expenseDTO);

        // Then
        verify(expenseRepository, times(1)).insert(any(Expense.class));
    }

    @Test
    void testGetAllExpenses() {
//        // Given
        List<Expense> expenses = new ArrayList<>();
        expenses.add(new Expense("1", "Dinner", FOOD_AND_DINING, BigDecimal.valueOf(20), LocalDate.now(), TEST_USERNAME));
        expenses.add(new Expense("2", "Movie", ENTERTAINMENT, BigDecimal.valueOf(15), LocalDate.now(), TEST_USERNAME));
//
//        // When
        when(expenseRepository.findAllByUsername(eq(TEST_USERNAME), any(Sort.class))).thenReturn(expenses);
        List<ExpenseDTO> result = expenseService.getAllExpenses();
//
//        // Then
        assertEquals(2, result.size());
        assertEquals("Dinner", result.get(0).getLabel());
        assertEquals("Movie", result.get(1).getLabel());
        verify(expenseRepository, times(1)).findAllByUsername(TEST_USERNAME, Sort.by(Sort.Direction.DESC, "date"));
    }

//    @Test
//    void testUpdateExpense() {
////        // Given
//        Expense expense = new Expense("1", "Groceries", FOOD_AND_DINING, BigDecimal.valueOf(50), LocalDate.now(), TEST_USERNAME);
//        ExpenseDTO expenseDTO = new ExpenseDTO("Groceries", GROCERIES, BigDecimal.valueOf(60), LocalDate.now());
////
////        // When
//        when(expenseRepository.findById("1")).thenReturn(Optional.of(expense));
//        expenseService.updateExpense("1", expenseDTO);
////
////        // Then
//        assertEquals(BigDecimal.valueOf(60), expense.getCost());
//        verify(expenseRepository, times(1)).save(expense);
//    }
//
//    @Test
//    void testDeleteExpense() {
//        // Given
//        Expense expense = new Expense("1", "Gym",HEALTH_AND_WELLNESS , BigDecimal.valueOf(30), LocalDate.now(), TEST_USERNAME);
////
////        // When
//        when(expenseRepository.findById("1")).thenReturn(Optional.of(expense));
//        expenseService.deleteExpense("1");
//
//        // Then
//        verify(expenseRepository, times(1)).deleteById("1");
//    }
}

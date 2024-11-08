package com.personal.expensetracker.config;

import com.github.cloudyrock.mongock.ChangeLog;
import com.github.cloudyrock.mongock.ChangeSet;
import com.personal.expensetracker.model.Expense;
import com.personal.expensetracker.model.ExpenseCategory;
import com.personal.expensetracker.repository.ExpenseRepository;

import static com.personal.expensetracker.model.ExpenseCategory.*;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;


@ChangeLog
public class DatabaseChangeLog {

	@ChangeSet(order = "001", id = "seedDatabase", author = "Pavan")
    public void seedDatabase(ExpenseRepository expenseRepository) {
        List<Expense> expenseList = new ArrayList<>();
//        expenseList.add(createNewExpense("Movie Tickets", ENTERTAINMENT, BigDecimal.valueOf(40),new SimpleDateFormat("yyyy-MM-dd").parse("2024-11-04")));
        expenseList.add(createNewExpense("Movie Tickets", ENTERTAINMENT, BigDecimal.valueOf(40), LocalDate.of(2024, 11, 4)));    
        expenseList.add(createNewExpense("Dinner", FOOD_AND_DINING, BigDecimal.valueOf(60), LocalDate.of(2024, 10, 4)));
        expenseList.add(createNewExpense("Netflix", ENTERTAINMENT, BigDecimal.valueOf(10), LocalDate.of(2024, 9, 4)));
        expenseList.add(createNewExpense("Gym", MISCELLANEOUS, BigDecimal.valueOf(20),LocalDate.of(2024, 8, 4)));
        expenseList.add(createNewExpense("Internet", BILLS_AND_UTILITIES , BigDecimal.valueOf(30), LocalDate.of(2024, 7, 4)));

        expenseRepository.insert(expenseList);
      
    }

    private Expense createNewExpense(String expenseName, ExpenseCategory expenseCategory, BigDecimal amount, LocalDate date) {
        Expense expense = new Expense();
        expense.setLabel(expenseName);
        expense.setCost(amount);
        expense.setCategory(expenseCategory);
        expense.setDate(date);
        expense.setUsername("Pavan");
        return expense;
    }
}
package com.personal.expensetracker.controller;



import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.personal.expensetracker.dto.ExpenseDTO;
import com.personal.expensetracker.model.Expense;
import com.personal.expensetracker.service.ExpenseService;
import com.personal.helper.CategoryTotal;
import com.personal.helper.MonthlyExpense;
import com.personal.helper.MonthlyExpenseVerbose;

import java.math.BigDecimal;
import java.time.Month;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/expense")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ExpenseController {

    private final ExpenseService expenseService;

    @PostMapping
    public ResponseEntity addExpense(@RequestBody ExpenseDTO expenseDTO) {
        expenseService.addExpense(expenseDTO);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

//    @PutMapping
//    public ResponseEntity updateExpense(@RequestBody Expense expense) {
//        expenseService.updateExpense(expense);
//        return ResponseEntity.status(HttpStatus.OK).build();
//    }

    @GetMapping
    public ResponseEntity<List<ExpenseDTO>> getAllExpenses() {
        return ResponseEntity.ok(expenseService.getAllExpenses());
    }

    @GetMapping("/{name}")
    public ResponseEntity getExpenseByName(@PathVariable String name) {
        return ResponseEntity.ok(expenseService.getExpense(name));
    }

//    @DeleteMapping("/{id}")
//    public ResponseEntity deleteExpense(@PathVariable String id) {
//        expenseService.deleteExpense(id);
//        return ResponseEntity.noContent().build();
//    }
    
    @GetMapping("/total-cost/year")
    public ResponseEntity<BigDecimal> getTotalCostForYear(@RequestParam int year) {
    	List<CategoryTotal> totalCost = expenseService.getTotalCostForYear(year);
    	if(totalCost.size() > 0)
        return ResponseEntity.ok(totalCost.get(0).getTotalCost());
    	return ResponseEntity.ok(BigDecimal.ZERO);
    }

    // Query 2: Get total cost for each category for the whole year
    @GetMapping("/total-cost/year/category")
    public ResponseEntity<List<CategoryTotal>> getTotalCostForEachCategoryForYear(@RequestParam int year) {
        List<CategoryTotal> categoryTotals = expenseService.getTotalCostForEachCategoryForYear(year);
        if(categoryTotals.size() > 0)
        return ResponseEntity.ok(categoryTotals);
        return ResponseEntity.noContent().build();
    }

    // Query 3: Get total cost for the whole month
    @GetMapping("/total-cost/month")
    public ResponseEntity<BigDecimal> getTotalCostForMonth(@RequestParam int year, @RequestParam int month) {
    	List<CategoryTotal> totalCost = expenseService.getTotalCostForMonth(year, month);
    	if(totalCost.size() > 0)
        return ResponseEntity.ok(totalCost.get(0).getTotalCost());
    	return ResponseEntity.ok(BigDecimal.ZERO);
    }

    // Query 4: Get total cost for each category for the whole month
    @GetMapping("/total-cost/month/category")
    public ResponseEntity<List<CategoryTotal>> getTotalCostForEachCategoryForMonth(@RequestParam int year, @RequestParam int month) {
        List<CategoryTotal> categoryTotals = expenseService.getTotalCostForEachCategoryForMonth(year, month);
        if(categoryTotals.size() > 0)
        return ResponseEntity.ok(categoryTotals);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/yearly-expenses")
    public ResponseEntity<List<MonthlyExpenseVerbose>> getTotalExpenseForEachMonthOfTheYear(@RequestParam int year) {
        List<MonthlyExpense> monthlyExpenses = expenseService.getTotalExpenseForEachMonthOfTheYear(year);

        List<MonthlyExpenseVerbose> verbose = monthlyExpenses.stream().map(projection -> new MonthlyExpenseVerbose(Month.of(projection.getMonth()).name(), projection.getTotalCost())).collect(Collectors.toList());
        return ResponseEntity.ok(verbose);
    }
    
//    @GetMapping("/yearly-expenses")
//    public ResponseEntity<List<MonthlyExpense>> getTotalExpenseForEachMonthOfTheYear(@RequestParam int year) {
//        List<MonthlyExpense> monthlyExpenses = expenseService.getTotalExpenseForEachMonthOfTheYear(year);
//        
////        List<MonthlyExpenseVerbose> verbose = monthlyExpenses.stream().map(projection -> new MonthlyExpenseVerbose(Month.of(projection.getMonth()).name(), projection.getTotalCost())).collect(Collectors.toList());
//        return ResponseEntity.ok(monthlyExpenses);
//    }

}
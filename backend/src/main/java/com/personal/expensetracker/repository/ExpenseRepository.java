package com.personal.expensetracker.repository;

//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.personal.expensetracker.model.Expense;
import com.personal.helper.CategoryTotal;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends MongoRepository<Expense, String> {
    @Query("{'name': ?0}")
    Optional<Expense> findByName(String name);
    List<Expense> findAll(Sort sort);
    
    @Aggregation(pipeline = {
            "{ $match: { date: { $gte: ?0, $lt: ?1 } } }",
            "{ $group: { _id: null, totalCost: { $sum: { $toDouble: \"$cost\" } } } }"
        })
    	List<CategoryTotal> getTotalCostForYear(LocalDate startOfYear, LocalDate startOfNextYear);

        // Query 2: Get total cost for each category for the whole year
    @Aggregation(pipeline = {
            "{ $match: { date: { $gte: ?0, $lt: ?1 } } }",
            "{ $group: { _id: '$category', totalCost: { $sum: { $toDouble: \"$cost\" } } } }"
        })
        List<CategoryTotal> getTotalCostForEachCategoryForYear(LocalDate startOfYear, LocalDate startOfNextYear);

        // Query 3: Get total cost for the whole month
        @Aggregation(pipeline = {
            "{ $match: { date: { $gte: ?0, $lt: ?1 } } }",
            "{ $group: { _id: null, totalCost: { $sum: { $toDouble: \"$cost\" } } } }"
        })
        List<CategoryTotal> getTotalCostForMonth(LocalDate startOfMonth, LocalDate startOfNextMonth);
//
//        // Query 4: Get total cost for each category for the whole month
        @Aggregation(pipeline = {
            "{ $match: { date: { $gte: ?0, $lt: ?1 } } }",
            "{ $group: { _id: '$category', totalCost: { $sum: { $toDouble: \"$cost\" } } } }"
        })
        List<CategoryTotal> getTotalCostForEachCategoryForMonth(LocalDate startOfMonth, LocalDate startOfNextMonth);
}
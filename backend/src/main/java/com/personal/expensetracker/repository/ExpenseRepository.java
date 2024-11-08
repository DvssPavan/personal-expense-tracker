package com.personal.expensetracker.repository;

//import org.springframework.data.domain.Page;
//import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.Aggregation;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.personal.expensetracker.model.Expense;
import com.personal.helper.CategoryTotal;
import com.personal.helper.MonthlyExpense;
import com.personal.helper.MonthlyExpenseProjection;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface ExpenseRepository extends MongoRepository<Expense, String> {
	 @Query("{'name': ?0, 'username': ?1}")
    Optional<Expense> findByName(String nam, String username);
	 
	 @Query("{username : ?0}")
    List<Expense> findAllByUsername(String username,  Sort sort);
    
    @Aggregation(pipeline = {
            "{ $match: { date: { $gte: ?0, $lt: ?1 }, username: ?2 } }",
            "{ $group: { _id: null, totalCost: { $sum: { $toDouble: \"$cost\" } } } }"
        })
    	List<CategoryTotal> getTotalCostForYear(LocalDate startOfYear, LocalDate startOfNextYear, String username);

        // Query 2: Get total cost for each category for the whole year
    @Aggregation(pipeline = {
            "{ $match: { date: { $gte: ?0, $lt: ?1 }, username: ?2 } }",
            "{ $group: { _id: '$category', totalCost: { $sum: { $toDouble: \"$cost\" } } } }"
        })
        List<CategoryTotal> getTotalCostForEachCategoryForYear(LocalDate startOfYear, LocalDate startOfNextYear, String username);

        // Query 3: Get total cost for the whole month
        @Aggregation(pipeline = {
            "{ $match: { date: { $gte: ?0, $lt: ?1 }, username: ?2 } }",
            "{ $group: { _id: null, totalCost: { $sum: { $toDouble: \"$cost\" } } } }"
        })
        List<CategoryTotal> getTotalCostForMonth(LocalDate startOfMonth, LocalDate startOfNextMonth, String username);
//
//        // Query 4: Get total cost for each category for the whole month
        @Aggregation(pipeline = {
            "{ $match: { date: { $gte: ?0, $lt: ?1 }, username: ?2 } }",
            "{ $group: { _id: '$category', totalCost: { $sum: { $toDouble: \"$cost\" } } } }"
        })
        List<CategoryTotal> getTotalCostForEachCategoryForMonth(LocalDate startOfMonth, LocalDate startOfNextMonth, String username);
        

        @Aggregation(pipeline = {
        	    "{ $match: { date: { $gte: ?0, $lt: ?1 }, username: ?2 } }",
        	    "{ $group: { _id: { month: { $month: '$date' } }, totalCost: { $sum: { $toDouble: '$cost' } } } }",
        	    "{ $sort: { '_id.month': 1 } }",
        	    "{ $project: { _id: 0, month: '$_id.month', totalCost: 1 } }"
        	})
        List<MonthlyExpense> getTotalExpenseForEachMonthOfTheYear(LocalDate startOfYear, LocalDate startOfNextYear, String username);
}
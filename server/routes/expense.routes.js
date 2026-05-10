const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

// Base: /api/expenses
router.get('/trip/:tripId', expenseController.getExpenses);
router.post('/trip/:tripId', expenseController.addExpense);
router.get('/trip/:tripId/summary', expenseController.getBudgetSummary);
router.get('/trip/:tripId/breakdown', expenseController.getBudgetBreakdown);
router.get('/trip/:tripId/invoice', expenseController.getInvoice);
router.delete('/item/:id', expenseController.deleteExpense);

module.exports = router;

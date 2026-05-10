const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

// Base: /api/expenses
router.get('/:tripId', expenseController.getExpenses);
router.post('/:tripId', expenseController.addExpense);
router.get('/:tripId/summary', expenseController.getBudgetSummary);
router.get('/:tripId/breakdown', expenseController.getBudgetBreakdown);
router.get('/:tripId/invoice', expenseController.getInvoice);
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;

const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expense.controller');
const authMiddleware = require('../middleware/auth.middleware');

router.use(authMiddleware);

router.get('/:tripId/expenses', expenseController.getExpenses);
router.post('/:tripId/expenses', expenseController.addExpense);
router.get('/:tripId/budget-summary', expenseController.getBudgetSummary);
router.get('/:tripId/budget-breakdown', expenseController.getBudgetBreakdown);
router.get('/:tripId/invoice', expenseController.getInvoice);

module.exports = router;

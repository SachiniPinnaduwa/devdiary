const { format, parseISO, subWeeks } = require("date-fns");

// Get current week in YYYY-WW format
const getCurrentWeek = () => format(new Date(), "yyyy-ww");

// Get previous week in YYYY-WW format
const getPreviousWeek = () => format(subWeeks(new Date(), 1), "yyyy-ww");

// Check if a week is editable (current or previous)
const isEditableWeek = (weekToCheck) => {
  const current = getCurrentWeek();
  const previous = getPreviousWeek();
  return weekToCheck === current || weekToCheck === previous;
};

module.exports = {
  getCurrentWeek,
  getPreviousWeek,
  isEditableWeek,
};

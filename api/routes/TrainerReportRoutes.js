import express from 'express';
const router = express.Router();
import MonthlyReport from "../models/TrainerReport.js";

router.route("/add").post((req, res) => {
  const month = req.body.month;
  const year = req.body.year;
  const total_number_of_trainers = req.body.total_number_of_trainers;
  const total_number_of_clients = req.body.total_number_of_clients;
  const new_clients_acquired = req.body.new_clients_acquired;
  const client_retention_rate = req.body.client_retention_rate;
  const total_sessions_conducted = req.body.total_sessions_conducted;
  const average_attendance_rate = req.body.average_attendance_rate;
  const trainer_performance = req.body.trainer_performance;
  const highlights = req.body.highlights;
  const challenges = req.body.challenges;
  const goals_for_next_month = req.body.goals_for_next_month;
  const revenue = req.body.revenue;
  const additional_notes = req.body.additional_notes;
  const conclusion = req.body.conclusion;

  // Check if all required fields are provided
  if (!month || !year || !total_number_of_trainers || !total_number_of_clients || !new_clients_acquired ||
    !client_retention_rate || !total_sessions_conducted || !average_attendance_rate ||
    !trainer_performance || !highlights || !challenges || !goals_for_next_month ||
    !revenue || !additional_notes || !conclusion || !Array.isArray(trainer_performance) || trainer_performance.length === 0) {
    return res.status(400).json({ error: "Missing or invalid fields in the request." });
  }

  // Validate each trainer_performance object in the array
  for (const trainer of trainer_performance) {
    if (!trainer.trainer_name || !trainer.number_of_clients || !trainer.new_clients_acquired 
      || !trainer.sessions_conducted || !trainer.average_attendance_rate) {
      return res.status(400).json({ error: "Invalid trainer performance data." });
    }
  }

  // Create a new MonthlyReport instance
  const newMonthlyReport = new MonthlyReport({
    month,
    year,
    total_number_of_trainers,
    total_number_of_clients,
    new_clients_acquired,
    client_retention_rate,
    total_sessions_conducted,
    average_attendance_rate,
    trainer_performance,
    highlights,
    challenges,
    goals_for_next_month,
    revenue,
    additional_notes,
    conclusion
  });

  // Save the new monthly report to the database
  newMonthlyReport.save()
    .then(() => res.json({ success: true, message: "Monthly report added successfully." }))
    .catch(err => res.status(500).json({ error: err.message }));
});
router.route("/reports/:year/:month").get(async (req, res) => {
  try {
    const { year, month } = req.params;

    // Fetch monthly reports from the database based on the provided year and month
    const reports = await MonthlyReport.find({ year, month });

    res.json({ success: true, reports });
  } catch (error) {
    console.error('Error fetching monthly reports:', error);
    res.status(500).json({ error: "Error fetching monthly reports." });
  }
});

export default router;

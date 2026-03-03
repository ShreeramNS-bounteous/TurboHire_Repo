import * as XLSX from "xlsx";
import { evaluationTemplates } from "../config/evaluationTemplates";

export const exportEvaluationExcel = ({
  candidate,
  scores,
  recommendation,
  calculateAverage,
}) => {
  const templateCode = candidate?.evaluationTemplateCode || "TECH_BASIC";

  const template =
    evaluationTemplates[templateCode] ||
    evaluationTemplates["TECH_BASIC"];

  const rows = [];

  // ===============================
  // 🔹 Candidate Info
  // ===============================
  rows.push(["Candidate Name", candidate?.candidateName]);
  rows.push(["Candidate Email", candidate?.candidateEmail]);
  rows.push(["Job Title", candidate?.jobTitle]);
  rows.push(["Round", candidate?.roundName]);
  rows.push(["Interview ID", candidate?.interviewId]);
  rows.push(["Interview Date", candidate?.slotDate]);
  rows.push(["Template", template.label]);
  rows.push([]);

  // ===============================
  // 🔹 Table Header
  // ===============================
  rows.push([
    "Category",
    "Attribute",
    "Rating Scale",
    "Score",
    "Max Score",
    "Comments",
  ]);

  // ===============================
  // 🔹 Dynamic Metrics
  // ===============================
  template.metrics.forEach((metric) => {
    rows.push([
      metric.category,
      metric.attribute,
      "Five Pointer Rating",
      scores[metric.key]?.rating || 0,
      5,
      scores[metric.key]?.comment || "",
    ]);
  });

  rows.push([]);

  // ===============================
  // 🔹 Summary
  // ===============================
  rows.push([
    "Final Summary",
    "Average Rating",
    "",
    calculateAverage(),
    5,
    "",
  ]);

  rows.push([
    "Final Decision",
    "Recommendation",
    "",
    "",
    "",
    recommendation,
  ]);

  const worksheet = XLSX.utils.aoa_to_sheet(rows);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Evaluation");

  XLSX.writeFile(
    workbook,
    `${candidate?.candidateName}_evaluation.xlsx`
  );
};

/* ================================================================ where questions come from
   No Quizlet tiers here. Each question carries m: on itself —
     m:2  a problem-set question he got wrong   — review these first
     m:1  a problem-set-style question (the worked examples and their concepts)
     (none) a concept from the readings and documents
   The engine copies m into hot, and the practice exam can drill any of the three. */
var REVIEW_NOTE = "Every question is tagged with where it comes from: a question you missed on Exam 1, a problem-set question you missed, a problem-set-style question, or a concept from the readings. Drill the misses first, then the problem-set style — the exam is built from the same material.";

/* kept for the engine's identification questions (generated from flashcards), which have no source tag */
var CONFIRMED = [];

var TIERS = [
 {w:3, t:"You missed this on Exam 1",        s:"Points you lost on the first exam — the final is cumulative, so fix these first."},
 {w:2, t:"You missed this on a problem set", s:"Review these first — the exam is built from the same material."},
 {w:1, t:"Problem-set and exam style",       s:"The kind of question the problem sets and Exam 1 asked."},
 {w:0, t:"From the readings",                s:"Concepts from the class notes and the course documents."}
];

# Principles of Macroeconomics — Study Guide (First Exam)

A single-file study page for the First Exam (38 questions, 60 points, 75 minutes):
notes, flashcards, matching, quizzes and a practice exam. Live at
https://daniel-projectt.github.io/macro/

Built from the course's Problem Sets 1–4, *Brief Summary of the Solow Growth Model*,
*Mathematical Example of the Solow Model* and *Pitfalls in GDP Accounting*.

- **Formulas** tab: the formula sheet, a memory hook for every formula, what divides
  by what (top ÷ bottom), what multiplies and subtracts, step-by-step recipes for every
  calculation, and the traps.
- Five unit tabs: GDP · Growth (Solow) · Labor · Prices · Saving.
- Every question is tagged with its section and with where it comes from — a
  problem-set question that was missed, a problem-set-style question, or the readings —
  and the practice exam can drill any of the three. "The 38" draws the exam's length
  with every section represented.

## Build

    sh build.sh                      # assembles index.html from src/ and runs the unit tests
    node src/test-dom.js <dir with node_modules/jsdom>   # clicks through the page in jsdom

Works offline once opened (service worker + manifest).

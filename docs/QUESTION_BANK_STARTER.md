# GCSE Physics Question Bank Starter Package

This starter package defines a clean, app-ready GCSE Physics question bank based on a pure four-option multiple-choice system.

## Goals
- Keep the format simple and consistent
- Work with SQLite and Postgres/Supabase
- Stay easy to author and validate at scale
- Support exam-style AQA and Edexcel content
- Keep the import JSON and database schema aligned

## Files
- `schema.sql` - relational schema for questions and ordered options
- `question_schema.json` - canonical JSON validation schema
- `sample_seed.json` - small representative dataset
- `questions_import.json` - import-ready master sample file
- `typescript_types.ts` - app-facing TypeScript types
- `validate_questions.py` - JSON + business-rule validation
- `import_questions.py` - SQLite import script with batching and duplicate protection
- `notes.md` - design notes and next-step guidance

## Canonical question format
Each question uses these fields:
- `id`
- `exam_board`
- `subject`
- `topic`
- `subtopic`
- `difficulty`
- `skill`
- `stem`
- `options`
- `correct_answer`
- `explanation`
- `diagram_json`

## Database structure
### `questions`
Stores one row per question with the exact authoring fields needed by the app.

### `question_options`
Stores exactly four ordered options per question and marks the correct option.

## Import behavior
- validates structure before import
- rejects duplicate IDs inside the JSON file
- skips duplicate IDs already in the database and reports them
- can safely shuffle option order during import without breaking correctness
- treats `diagram_json` as nullable JSON-compatible content

## Example commands
### Validate
```bash
python3 /Users/mamo/neurophysics/validate_questions.py \
  /Users/mamo/neurophysics/questions_import.json
```

### Import
```bash
python3 /Users/mamo/neurophysics/import_questions.py \
  --db /Users/mamo/neurophysics/questions.db \
  --input /Users/mamo/neurophysics/questions_import.json \
  --batch-size 200
```

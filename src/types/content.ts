export type BoardId = 'aqa' | 'edexcel' | 'ocr-gateway' | 'ocr-21c' | 'wjec';
export type Tier = 'Foundation' | 'Higher';
export type StepType = 'diagnostic' | 'concept' | 'simulation' | 'worked' | 'yourTurn' | 'equationCard';
export type QuestionType = 'multiple-choice' | 'calculation' | 'short-answer';
export type UIColor = 'cyan' | 'purple' | 'amber' | 'pink' | 'blue' | 'green' | 'red';
export type SimVisualType = 'arrow-and-block' | 'circuit' | 'wave' | 'graph';

export interface BoardConfig {
  id: BoardId;
  name: string;
  fullName: string;
  specCode: string;
  color: string;
  papers: string[];
  tiers: Tier[];
  topicMap: Record<string, TopicRef[]>;
  separatePhysicsOnly: string[];
}

export interface TopicRef {
  id: string;
  name: string;
  paper: number;
}

export interface TopicMeta {
  id: string;
  name: string;
  emoji: string;
  color: string;
  paper: number;
  boards: BoardId[];
  conceptOrder: string[];
  totalConcepts: number;
  estimatedMinutes: number;
  boardNotes: Partial<Record<BoardId, string>>;
}

export interface DiagnosticStep {
  id: string;
  type: 'diagnostic';
  uiTag: string;
  uiColor: UIColor;
  title: string;
  question: string;
  options: string[];
  correctIndex: number;
  misconceptionFeedback: string;
  correctFeedback: string;
  bestSource?: string;
}

export interface ConceptDiagramVariable {
  symbol: string;
  label: string;
  unit: string;
  color: UIColor;
}

export interface ConceptStep {
  id: string;
  type: 'concept';
  uiTag: string;
  uiColor: UIColor;
  title: string;
  bodyHTML: string;
  keyEquation?: string;
  diagram?: {
    type: string;
    variables: ConceptDiagramVariable[];
    relationships?: string[];
  };
  keyWords: string[];
  commonErrors: string[];
}

export interface SimVariable {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  default: number;
  color: UIColor;
  step: number;
}

export interface SimDerived {
  id: string;
  label: string;
  unit: string;
  formula: string;
  color: UIColor;
  decimalPlaces: number;
}

export interface SimulationStep {
  id: string;
  type: 'simulation';
  uiTag: string;
  uiColor: UIColor;
  title: string;
  instruction: string;
  simId: string;
  simConfig: {
    variables: SimVariable[];
    derived: SimDerived[];
    visualType: SimVisualType;
    arrowVariable?: string;
    blockLabel?: string;
  };
}

export interface WorkedStep {
  stepNum: number;
  label: string;
  content: string;
  equation: string | null;
  markSchemeNote: string | null;
}

export interface WorkedExampleData {
  source: string;
  year: number;
  paper: number;
  questionNumber: string;
  marks: number;
  questionText: string;
  steps: WorkedStep[];
  finalAnswer: string;
  finalAnswerUnit: string;
  totalMarks: number;
}

export interface WorkedExampleStep {
  id: string;
  type: 'worked';
  uiTag: string;
  uiColor: UIColor;
  workedExamples: Partial<Record<BoardId, WorkedExampleData>>;
}

export interface AnswerOption {
  label: string;
  text: string;
  correct: boolean;
}

export interface YourTurnQuestion {
  source: string;
  year: number;
  paper: number;
  questionNumber: string;
  marks: number;
  questionText: string;
  questionType: QuestionType;
  options?: AnswerOption[];
  markSchemeSteps: string[];
  markSchemeAward: string;
  commonMistake?: string;
}

export interface YourTurnStep {
  id: string;
  type: 'yourTurn';
  uiTag: string;
  uiColor: UIColor;
  questions: Partial<Record<BoardId, YourTurnQuestion>>;
}

export interface EquationVariable {
  symbol: string;
  name: string;
  unit: string;
  abbreviation?: string;
  constant?: number;
}

export interface Rearrangement {
  solveFor: string;
  formula: string;
  label?: string;
}

export interface EquationCardStep {
  id: string;
  type: 'equationCard';
  uiTag: string;
  uiColor: UIColor;
  title: string;
  equation: {
    id: string;
    canonical: string;
    variables: EquationVariable[];
    rearrangements: Rearrangement[];
    triangleLayout: {
      top: { symbol: string; color: UIColor };
      bottomLeft: { symbol: string; color: UIColor };
      bottomRight: { symbol: string; color: UIColor };
    };
    examTip: string;
    boardNotes: Partial<Record<BoardId, string>>;
    onFormulaSheet: Partial<Record<BoardId, boolean>>;
  };
}

export type LessonStep =
  | DiagnosticStep
  | ConceptStep
  | SimulationStep
  | WorkedExampleStep
  | YourTurnStep
  | EquationCardStep;

export interface ConceptData {
  id: string;
  topicId: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  higherOnly: boolean;
  boardAvailability: Partial<Record<BoardId, boolean>>;
  steps: LessonStep[];
}

export interface Equation {
  id: string;
  name: string;
  canonical: string;
  color: UIColor;
  variables: EquationVariable[];
  rearrangements: Rearrangement[];
  onFormulaSheet: Partial<Record<BoardId, boolean>>;
  higherOnly: boolean;
}

export interface PastPaperMarkStep {
  mark: number;
  description: string;
}

export interface PastPaperQuestion {
  id: string;
  number: string;
  topic: string;
  concept: string;
  marks: number;
  type: QuestionType;
  difficulty: 'easy' | 'medium' | 'hard';
  higherOnly: boolean;
  questionText: string;
  options?: string[];
  correctIndex?: number;
  markScheme: {
    answer: string;
    unit?: string;
    steps: PastPaperMarkStep[];
    allowedAlternatives?: string[];
    commonErrors?: string[];
  };
  usedAsWorkedExample: boolean;
  usedAsYourTurn: boolean;
}

export interface UserProgress {
  board: BoardId;
  tier: Tier;
  streak: number;
  lastActiveDate: string;
  completedConcepts: string[];
  attemptedQuestions: {
    questionId: string;
    correct: boolean;
    attempts: number;
    timestamp: string;
  }[];
  misconceptionsLogged: {
    conceptId: string;
    diagnosticAnswer: number;
    correct: boolean;
    timestamp: string;
  }[];
}

export interface UserSettings {
  font: 'default' | 'atkinson' | 'opendyslexic';
  background: 'dark' | 'dim' | 'light';
  textSize: 'normal' | 'large' | 'xl';
  animations: 'full' | 'reduced' | 'none';
  sound: boolean;
  highContrast: boolean;
  timedQuestions: boolean;
}

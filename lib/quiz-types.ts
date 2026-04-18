export type ResultType =
  | "overprikkeling"
  | "strijd"
  | "twijfel"
  | "meebewegen";

export type AgeGroupValue =
  | "age_0_2"
  | "age_2_4"
  | "age_5_7"
  | "age_8_12"
  | "age_13_18";

export type SingleAnswerValue =
  | AgeGroupValue
  | string;

export type QuestionOption = {
  label: string;
  value: SingleAnswerValue;
  weights: Partial<Record<ResultType, number>>;
};

export type QuizAnswers = {
  age?: AgeGroupValue[];
  primaryAge?: AgeGroupValue;
  behavior?: SingleAnswerValue[];
  focus?: SingleAnswerValue | string;
  neurodiversity?: string[];
  hardest?: string[];
  impact?: string[];
  tried?: string[];
  desiredChange?: string[];
  problemIntensity?: string;
  energyLevel?: number;
  parentHelp?: SingleAnswerValue[];
  learningPreference?: SingleAnswerValue[];
};

export type QuizResultContent = {
  type: ResultType;
  title: string;
  recognition: string;
  explanation: string;
  bridge: string;
};

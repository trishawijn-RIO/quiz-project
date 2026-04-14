export type ResultType =
  | "overprikkeling"
  | "strijd"
  | "twijfel"
  | "meebewegen";

export type AgeGroupValue = "age_0_2" | "age_3_5" | "age_6_9" | "age_10_plus";

export type SingleAnswerValue =
  | AgeGroupValue
  | "focus_emoties"
  | "focus_luisteren"
  | "focus_strijd"
  | "focus_overprikkeld"
  | "focus_onzeker"
  | "focus_rust"
  | "focus_verbinding"
  | "parent_help_begrijpen"
  | "parent_help_verbinding"
  | "parent_help_overweldigd"
  | "parent_help_chaos"
  | "parent_help_rustig_reageren"
  | "parent_help_vertrouwen"
  | "learning_direct_antwoord"
  | "learning_scripts"
  | "learning_workshops"
  | "learning_live_sessies"
  | "learning_audios"
  | "learning_alles_fijn";

export type QuestionOption = {
  label: string;
  value: SingleAnswerValue;
  weights: Partial<Record<ResultType, number>>;
};

export type QuizAnswers = {
  age?: AgeGroupValue[];
  primaryAge?: AgeGroupValue;
  focus?: SingleAnswerValue;
  parentHelp?: SingleAnswerValue;
  learningPreference?: SingleAnswerValue;
};

export type QuizResultContent = {
  type: ResultType;
  title: string;
  recognition: string;
  explanation: string;
  bridge: string;
};

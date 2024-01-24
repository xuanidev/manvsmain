export type QuizProps = {
  loading: boolean;
  setLoading: (value: boolean) => void;
  language: string;
};
export type ModalProps = {
  show: boolean;
  setShowModal: (value: boolean) => void;
};
export type BtnAgainProps = {
  loading: boolean;
  selected: boolean;
  nextQuestion: (value: void) => void;
  language: string;
};
export type ImagesBoxProps = {
  src: string;
};
export type ChoicesBoxProps = {
  loading: boolean;
  selected: boolean;
  onAnswerSelected: (value: number) => void;
  language: string;
};
export type ResultsBoxProps = {
  selected: boolean;
  votes: number[];
  percentage: number[];
  currentVotes: number;
};
export type LanguageIcon = {
  language: string;
  setLanguage: (value: string) => void;
};
export type QuizQuestion = {
  id: number;
  question__es: string;
  question__en: string;
  choices__es: string;
  choices__en: string;
  img: string;
  votes: number[];
};
export type QuizVotes = {
  id: number;
  yes: number;
  no: number;
  totalVotes: number;
};

export type QuizQuestionString = {
  id: number;
  question__es: string;
  question__en: string;
  choices__es: string;
  choices__en: string;
  img: string;
  votes: string;
};

export type QuizQuestionStringArray = {
  todos: QuizQuestionString[];
};

export const serializeQuestions = (questionsResult: any): QuizQuestion[] => {
  if (questionsResult) {
    const formattedQuestions: QuizQuestion[] = questionsResult.map(
      (question: any) => {
        return {
          id: question.id,
          question__es: question.question__es,
          question__en: question.question__en,
          choices__es: question.choices__es,
          choices__en: question.choices__en,
          img: question.img,
        };
      }
    );

    return formattedQuestions;
  }

  return [];
};

export const serializeVotes = (votesResult: any): QuizVotes[] => {
  if (votesResult) {
    const formattedVotes: QuizVotes[] = votesResult.map((votes: any) => {
      return {
        id: votes.id,
        yes: votes.yes,
        no: votes.no,
        totalVotes: votes.totalVotes,
      };
    });

    return formattedVotes;
  }

  return [];
};

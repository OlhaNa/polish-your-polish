export const computeProgress = (
  currentQuestionIndex: number,
  currentQuestionComplete: boolean,
  totalQuestionCount: number,
) => {
  return (
    (100 * (currentQuestionIndex + (currentQuestionComplete ? 1 : 0))) /
    totalQuestionCount
  );
};

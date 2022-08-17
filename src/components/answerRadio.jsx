import he from 'he';

export default function AnswerRadio({ handleChange, question, answer, isAnswersChecked }) {
  function answerClass() {
    const isCorrectAnswer = question.correct_answer === answer;
    const isSelected = question.selectedAnswer === answer;
    if (isCorrectAnswer) {
      return 'correctAnswer';
    } else if (isSelected && isCorrectAnswer === false) {
      return 'wrongAnswer';
    } else return;
  }

  return (
    <span className='radio-item' key={answer}>
      <input
        id={question.id}
        type='radio'
        value={answer}
        name={question.id}
        checked={question.selectedAnswer === answer}
        className={isAnswersChecked ? answerClass() : undefined}
        onChange={handleChange}
        disabled={isAnswersChecked}
      />
      <label htmlFor={question.id}>{he.decode(answer)}</label>
    </span>
  );
}

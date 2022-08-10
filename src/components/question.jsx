import AnswerRadio from './answerRadio';

export default function Question({ handleChange, answers, question }) {
  const allAnswers = [...question.incorrect_answers, question.correct_answer];

  const shuffledAnswers = allAnswers
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
  console.log(shuffledAnswers);
  return (
    <fieldset className='radio-wrapper'>
      <legend className='question'>{question.question}</legend>
      {shuffledAnswers.map(answer => (
        <AnswerRadio
          handleChange={handleChange}
          answers={answers}
          answer={answer}
          question={question}
        />
      ))}
    </fieldset>
  );
}

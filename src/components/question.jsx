import AnswerRadio from './answerRadio';
import he from 'he';

export default function Question({ handleChange, question, isAnswersChecked }) {
  return (
    <fieldset className='radio-wrapper' key={question.id}>
      <legend className='question'>{he.decode(question.question)}</legend>
      {question.allAnswers.map(answer => (
        <AnswerRadio
          answer={answer}
          question={question}
          handleChange={handleChange}
          isAnswersChecked={isAnswersChecked}
        />
      ))}
    </fieldset>
  );
}

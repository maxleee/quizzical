export default function AnswerRadio({ handleChange, answers, answer, question, index }) {
  return (
    <span className='radio-item'>
      <input
        id={question}
        type='radio'
        value={answer}
        name={question.question}
        checked={answers[index] === answer}
        onChange={handleChange}
      />
      <label htmlFor='answer-1'>{answer}</label>
    </span>
  );
}

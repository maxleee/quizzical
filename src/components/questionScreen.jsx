import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import he from 'he';
import Question from './question';

export default function questionScreen() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [questions, setQuestions] = useState([]);
  const [isAnswersChecked, setIsAnswersChecked] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setSelectedAnswers(prevState => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  }

  function checkAnswers() {
    setIsAnswersChecked(true);
  }

  function answerClass(questionId, answer) {
    let isCorrectAnswer;
    const isSelected = selectedAnswers[questionId] === answer;
    questions.forEach(question => {
      if (question.id === questionId) {
        if (question.correct_answer === answer) {
          console.log(answer, 'correct answer!');
          isCorrectAnswer = true;
        } else {
          console.log(answer, 'wrong answer!');
          isCorrectAnswer = false;
        }
      }
    });
    if (isCorrectAnswer) {
      return 'correctAnswer';
    }
    if (isSelected && isCorrectAnswer === false) {
      return 'wrongAnswer';
    }
    return;
  }
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => {
        console.log(data);
        //add id
        data.results.forEach(result => (result.id = nanoid()));
        //create all_answers, correct_answer and incorrect_answers together in random orders
        data.results.forEach(result => {
          const allAnswers = [...result.incorrect_answers, result.correct_answer];

          const shuffledAnswers = allAnswers
            .map(value => ({ value, sort: Math.random() }))
            .sort((a, b) => a.sort - b.sort)
            .map(({ value }) => value);
          return (result.all_answers = shuffledAnswers);
        });
        setQuestions(data.results);
      });
  }, []);
  console.log(questions);
  return (
    <div className='question-screen'>
      {questions.map(question => (
        <fieldset className='radio-wrapper' key={question.id}>
          <legend className='question'>{he.decode(question.question)}</legend>
          {question.all_answers.map((answer, index) => (
            <span className='radio-item' key={`${question.id}${index}`}>
              <input
                id={question.id}
                type='radio'
                value={answer}
                name={question.id}
                checked={selectedAnswers[question.id] === answer}
                className={isAnswersChecked ? answerClass(question.id, answer) : undefined}
                onChange={handleChange}
              />
              <label htmlFor={question.id}>{he.decode(answer)}</label>
            </span>
          ))}
        </fieldset>
      ))}
      <button className='button' onClick={checkAnswers}>
        Check Answers
      </button>
    </div>
  );
}

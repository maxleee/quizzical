import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import he from 'he';
import Question from './question';

export default function questionScreen() {
  const [questions, setQuestions] = useState([]);
  const [isAnswersChecked, setIsAnswersChecked] = useState(false);
  const [countCorrect, setCountCorrect] = useState(0);

  function handleChange(event) {
    const { name, value } = event.target;
    setQuestions(prevState =>
      prevState.map(question =>
        question.id === name ? { ...question, selectedAnswer: value } : question
      )
    );
  }

  function handleCheckAnswersButton() {
    setIsAnswersChecked(true);
    //determine number of correct answers
  }

  function checkAnswer(questionId, answer) {
    let isCorrect;
    questions.forEach(question => {
      if (question.id === questionId) {
        if (question.correct_answer === answer) {
          isCorrect = true;
        } else {
          isCorrect = false;
        }
      }
    });

    return isCorrect;
  }

  function answerClass(questionId, answer) {
    const isCorrectAnswer = checkAnswer(questionId, answer);
    const isSelected = questions.find(
      question => question.id === questionId && question.selectedAnswer === answer
    );
    if (isCorrectAnswer) {
      return 'correctAnswer';
    }
    if (isSelected && isCorrectAnswer === false) {
      return 'wrongAnswer';
    }
    return;
  }
  function shuffleAnswers(answers) {
    const shuffledAnswers = answers
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffledAnswers;
  }
  useEffect(() => {
    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then(res => res.json())
      .then(data => {
        setQuestions(
          data.results.map(question => {
            return {
              ...question,
              id: nanoid(),
              allAnswers: shuffleAnswers([...question.incorrect_answers, question.correct_answer]),
              selectedAnswer: '',
            };
          })
        );
      });
  }, []);

  return (
    <div className='question-screen'>
      {questions.map(question => (
        <fieldset className='radio-wrapper' key={question.id}>
          <legend className='question'>{he.decode(question.question)}</legend>
          {question.allAnswers.map((answer, index) => (
            <span className='radio-item' key={`${question.id}${index}`}>
              <input
                id={question.id}
                type='radio'
                value={answer}
                name={question.id}
                checked={question.selectedAnswer === answer}
                className={isAnswersChecked ? answerClass(question.id, answer) : undefined}
                onChange={handleChange}
                disabled={isAnswersChecked}
              />
              <label htmlFor={question.id}>{he.decode(answer)}</label>
            </span>
          ))}
        </fieldset>
      ))}
      {!isAnswersChecked ? (
        <button
          className='button'
          onClick={handleCheckAnswersButton}
          disabled={!questions.every(question => question.selectedAnswer)}>
          Check Answers
        </button>
      ) : (
        <>
          <p>You scored 3/5 correct answers</p>
          <button className='button' onClick={handleCheckAnswersButton}>
            Play Again
          </button>
        </>
      )}
    </div>
  );
}

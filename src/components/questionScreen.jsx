import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

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
    let count = 0;
    questions.forEach(question => {
      if (question.selectedAnswer === question.correct_answer) {
        count = count + 1;
      }
    });
    setCountCorrect(count);
  }

  function shuffleAnswers(answers) {
    const shuffledAnswers = answers
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
    return shuffledAnswers;
  }
  function resetGame() {
    setIsAnswersChecked(false);
    fetchData();
    setCountCorrect(0);
  }

  function fetchData() {
    fetch('https://opentdb.com/api.php?amount=5&category=9&difficulty=easy&type=multiple')
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
  }
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className='question-screen'>
      {questions.map(question => (
        <Question
          question={question}
          handleChange={handleChange}
          isAnswersChecked={isAnswersChecked}
        />
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
          <p>
            You scored {countCorrect}/{questions.length} correct answers
          </p>
          <button className='button' onClick={resetGame}>
            Play Again
          </button>
        </>
      )}
    </div>
  );
}

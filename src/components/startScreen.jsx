export default function startScreen({ setGameStarted }) {
  function handleClick() {
    setGameStarted(prevState => !prevState);
  }
  return (
    <div className='start-screen'>
      <h1>Quizzical</h1>
      <p>Description</p>
      <button onClick={handleClick} className='button'>
        Start Quiz
      </button>
    </div>
  );
}

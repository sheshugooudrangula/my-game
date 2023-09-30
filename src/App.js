import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import './App.css'; 

const GameContainer = styled.div`
  text-align: center;
  font-family: Arial, sans-serif;
  margin: 20px;
`;

const GameBox = styled.button`
  width: 200px;
  height: 200px;
  border: none;
  font-size: 18px;
  color: white;
  cursor: pointer;
  margin: 20px;
`;

const StartButton = styled.button`
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
`;

const Message = styled.div`
  font-size: 24px;
  margin-top: 20px;
  color: ${props => (props.isWin ? 'green' : 'red')};
`;

const App = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [gameStarted, setGameStarted] = useState(false);
  const [clicks, setClicks] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [gameInterval, setGameInterval] = useState(null);
  const [message, setMessage] = useState('');
  const [boxColor, setBoxColor] = useState('red'); // State to manage box color
  const [gameWon, setGameWon] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'name') setName(value);
    else if (name === 'email') setEmail(value);
    else if (name === 'mobile') setMobile(value);
    else if (name === 'difficulty') setDifficulty(value);
  };

  const startGame = (e) => {
    e.preventDefault();
    
    let timeLimit = 40;
    if (difficulty === 'medium') timeLimit = 40;
    else if (difficulty === 'hard') timeLimit = 40;

    setClicks(0);
    setGameStarted(true);
    setTimeLeft(timeLimit);
    setMessage('');
    setGameWon(false);

    const intervalId = setInterval(changeColor, getRandomInt(1000, 2000));
    setGameInterval(intervalId);

    changeColor();

    setTimeout(() => endGame(intervalId), timeLimit * 1000);
    if(name === ''){
      alert("enter your name")
    }else if(email === ''){
      alert("Give email id");
    }else if (mobile.length !== 10){
      alert("Invalid number")
  }else if (isNaN(mobile)){
      alert("Type only number")
  }
    
  };

  const changeColor = () => {
    setBoxColor(prevColor => (prevColor === 'red' ? 'green' : 'red'));
  };

  // const handleGameBoxClick = () => {
  //   if (gameStarted && boxColor === 'green') {
  //     setClicks(clicks + 1);
  
  //     if (clicks + 1 === getWinningScore()) {
  //       setMessage('You win!');
  //       clearInterval(gameInterval);
  //     }
  
      
  //     changeColor();
  //   } else if (gameStarted) {
  //     setMessage('Game Over!');
  //     clearInterval(gameInterval);
  //   }
  // };
  const handleGameBoxClick = () => {
    if (gameStarted && boxColor === 'green') {
      setClicks(clicks + 1);
  
      if (clicks + 1 === getWinningScore()) {
        setMessage('You win!');
        clearInterval(gameInterval);
      }
  
      
      const newColor = Math.random() < 1.5 ? 'green' : 'red';
      setBoxColor(newColor);
    } else if (gameStarted) {
      setMessage('Game Over!');
      clearInterval(gameInterval);
    }
  };
  

  const endGame = (intervalId) => {
    if (clicks < getWinningScore()) setMessage('Game Over!');
    clearInterval(intervalId);
    setGameStarted(false);
  };

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const getWinningScore = () => {
    if (difficulty === 'easy') return 10;
    else if (difficulty === 'medium') return 15;
    else if (difficulty === 'hard') return 25;
    return 0;
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(timeLeft - 1);
        if (timeLeft === 0) clearInterval(timer);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [gameStarted, timeLeft]);

  return (
    <GameContainer>
      <h1>Welcome to the Green Light Red Light Game</h1>
      {!gameStarted ? (
        <form onSubmit={startGame} className='card'>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" placeholder='enter your name' name="name" className='row' required onChange={handleInputChange} /><br />
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" placeholder='enter your email' name="email" className='row' required onChange={handleInputChange}/><br />
          <label htmlFor="mobile"> Number:</label>
          <input type="tel" id="mobile" placeholder='enter your mobile number' name="mobile" className='rows' required onChange={handleInputChange} /><br />
          <label htmlFor="difficulty" >Difficulty Level:</label>
          <select id="difficulty" name="difficulty" className='op' onChange={e => setDifficulty(e.target.value)}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select><br />
          <StartButton type="submit" className='bb'>Start Game</StartButton>
        </form>
      ) : (
        <>
          <GameBox
            onClick={handleGameBoxClick}
            className={`box ${boxColor === 'green' ? 'green' : 'red'}`}
          >
            Click Me when it's green color
          </GameBox>
          <Message isWin={message === 'You win!' || message === 'Game Over!'}>
            {message}
            {gameWon && <div>Your Score: {clicks}</div>}
          </Message>
          <div className="timer">Time Left: {timeLeft} seconds</div>
          <div>Current Score: {clicks}</div>
          <div>User Information:</div>
          <div>Name: {name}</div>
          <div>Email: {email}</div>
          <div>Mobile Number: {mobile}</div>
        </>
      )}
    </GameContainer>
  );
      }
      export default App ;
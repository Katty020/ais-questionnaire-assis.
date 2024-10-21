import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StartQuiz from './assets/components/start';
import QuizPage from './assets/components/quiz';
import Result from './assets/components/result';

function App() {
  const [quiz, setQuiz] = useState([]);
  const [question, setQuestion] = useState({});
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [mark, setMark] = useState(0);
  const [time, setTime] = useState(60); // 1 minute timer

  const [showStart, setShowStart] = useState(true);
  const [showQuiz, setShowQuiz] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    fetch('/quiz.json')
      .then((response) => {
        if (!response.ok) {
          throw new Error('network error');
        }
        return response.json();
      })
      .then((data) => setQuiz(data))
      .catch((error) => console.log(error.message));
  }, []);

  useEffect(() => {
    if (quiz.length > questionIndex) {
      setQuestion(quiz[questionIndex]);
    }
  }, [quiz, questionIndex]);

  useEffect(() => {
    if (time > 0 && showQuiz) {
      const intervalId = setInterval(() => {
        setTime(time - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else if (time === 0) {
      showingResult();
    }
  }, [time, showQuiz]);

  const startQuiz = () => {
    setShowStart(false);
    setShowQuiz(true);
  };

  const checkAnswer = (event, selected) => {
    if (!selectedAnswer) {
      setCorrectAnswer(question.answer);
      setSelectedAnswer(selected);
      setButtonDisabled(true);
    }

    if (selected === question.answer) {
      event.target.classList.add('bg-success');
      setMark(mark + 5);
    } else {
      event.target.classList.add('bg-danger');
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer('');
    setCorrectAnswer('');
    setButtonDisabled(false);

    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');

    const correctBtn = document.querySelector('button.bg-success');
    correctBtn?.classList.remove('bg-success');

    setQuestionIndex(questionIndex + 1);
  };

  const showingResult = () => {
    setShowResult(true);
    setShowQuiz(false);
    setShowStart(false);
  };

  const startOver = () => {
    setShowStart(false);
    setShowResult(false);
    setShowQuiz(true);
    setButtonDisabled(false);
    setCorrectAnswer('');
    setSelectedAnswer('');
    setQuestionIndex(0);
    setMark(0);
    setTime(60); // Reset timer

    const wrongBtn = document.querySelector('button.bg-danger');
    wrongBtn?.classList.remove('bg-danger');

    const correctBtn = document.querySelector('button.bg-success');
    correctBtn?.classList.remove('bg-success');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="h-screen w-full flex flex-col justify-center items-center bg-gradient-to-r from-blue-500 to-purple-600"
    >
      {showStart && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-green-400 to-blue-500 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg"
        >
          <StartQuiz startQuiz={startQuiz} showStart={showStart} />
        </motion.div>
      )}
      {showQuiz && (
        <motion.div
          initial={{ x: 100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-purple-400 to-pink-500 p- 8 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg w-3/4"
        >
          <div className="text-2xl font-bold mb-4 text-center">
            Time Remaining: {time}s
          </div>
          <QuizPage
            quiz={quiz}
            showQuiz={showQuiz}
            question={question}
            questionIndex={questionIndex}
            checkAnswer={checkAnswer}
            buttonDisabled={buttonDisabled}
            correctAnswer={correctAnswer}
            nextQuestion={nextQuestion}
            selectedAnswer={selectedAnswer}
            showingResult={showingResult}
          />
        </motion.div>
      )}
      {showResult && (
        <motion.div
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-orange-400 to-yellow-500 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg w-3/4"
        >
          <Result
            showResult={showResult}
            quiz={quiz}
            mark={mark}
            startOver={startOver}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

export default App;
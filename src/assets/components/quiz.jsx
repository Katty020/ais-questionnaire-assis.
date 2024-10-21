import { useState } from 'react';

const QuizPage = (props) => {
  const {
    quiz,
    question,
    questionIndex,
    checkAnswer,
    buttonDisabled,
    correctAnswer,
    nextQuestion,
    selectedAnswer,
    showingResult,
    showQuiz,
  } = props;

  const [submitted, setSubmitted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const handleOptionClick = (event, item) => {
    setSelectedOption(item);
    checkAnswer(event, item);
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleNext = () => {
    setSubmitted(false);
    setSelectedOption(null);
    nextQuestion();
  };

  return (
    <section
      className="bg-white text-white"
      style={{
        display: `${showQuiz ? 'block' : 'none'}`,
        height: '100vh',
        background: 'linear-gradient(90deg, #3498db, #2ecc71)',
      }}
    >
      <div className="container h-100">
        <div className="row h-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <div className="card p-4 bg-transparent border-0">
              <div className="d-flex justify-content-between gap-md-3">
                <h5 className="mb-2 fs-normal lh-base">{question?.question}</h5>
                <h5
                  style={{
                    color: '#60d600',
                    width: '100px',
                    textAlign: 'right',
                  }}
                >
                  {quiz.indexOf(question) + 1} / {quiz.length}
                </h5>
              </div>
              <div>
                {question?.options?.map((item, index) => (
                  <button
                    key={index}
                    className={`option w-100 text-start btn text-white py-2 px-3 mt-3 rounded btn-dark ${
                      submitted && correctAnswer === item ? 'bg-success' : ''
                    } ${
                      submitted && selectedOption === item && correctAnswer !== item
                        ? 'bg-danger'
                        : ''
                    }`}
                    onClick={(event) => handleOptionClick(event, item)}
                    disabled={buttonDisabled || submitted}
                  >
                    {item}
                  </button>
                ))}
              </div>

              {!submitted ? (
                <button
                  className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                  onClick={handleSubmit}
                  disabled={!selectedAnswer}
                >
                  Submit
                </button>
              ) : questionIndex + 1 !== quiz.length ? (
                <button
                  className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                  onClick={handleNext}
                  disabled={!selectedAnswer}
                >
                  Next Question
                </button>
              ) : (
                <button
                  className="btn py-2 w-100 mt-3 bg-primary text-light fw-bold"
                  onClick={showingResult}
                  disabled={!selectedAnswer}
                >
                  Show Result
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuizPage;
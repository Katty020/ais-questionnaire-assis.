import { motion } from 'framer-motion';

const StartQuiz = (props) => {
  const { startQuiz, showStart } = props;

  return (
    <motion.section
      className="text-white text-center"
      style={{
        display: `${showStart ? 'block' : 'none'}`,
        background: 'linear-gradient(to right, #1a2a6c, #b21f1f, #fdbb2d)', // Example gradient colors
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="container">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-8">
            <motion.h1 
              className="fw-bold mb-4"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              
            </motion.h1>
            <motion.button
              className="btn px-4 py-2 bg-light text-dark fw-bold"
              onClick={startQuiz}
              initial={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Questionnaire
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default StartQuiz;
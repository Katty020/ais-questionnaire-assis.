import { motion } from 'framer-motion';

const Result = (props) => {
  const { showResult, quiz, mark, startOver } = props;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1, transition: { yoyo: Infinity } },
  };

  return (
    <motion.section
      className="bg-dark text-white"
      style={{ display: `${showResult ? 'block' : 'none'}` }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="container bg-dark">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-lg-6">
            <motion.div
              className="text-light text-center p-5 rounded"
              initial={{ y: -250 }}
              animate={{ y: 0 }}
              transition={{ type: 'spring', stiffness: 120 }}
            >
              <h1 className="mb-2 fw-bold">
                {mark > (quiz.length * 5) / 2 ? 'Awesome' : 'Not good !'}
              </h1>
              <h3 className="mb-3 fw-bold">
                Your Got {mark}  marks out of {quiz.length * 5}
              </h3>
              <motion.button
                className="btn py-2 px-4 btn-light fw-bold d-inline"
                onClick={startOver}
                variants={buttonVariants}
                whileHover="hover"
              >
                Start again
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Result;
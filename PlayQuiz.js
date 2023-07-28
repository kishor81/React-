import { useEffect, useState } from 'react';
import './playQuiz.css';
import { Button } from 'reactstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

function PlayQuiz() {
    const [quizData, setQuizData] = useState([]);
    const [userAnswers, setUserAnswers] = useState(new Map());
    const [result, setResult] = useState(0);
    const [isFinishQuiz, setIsFinishQuiz] = useState(false);

    useEffect(() => {
        getQuizData();
    }, [true]);

    const shuffle = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const getQuizData = () => {
        axios
            .get('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
            .then(function (response) {
                const data = response.data['results'].map((e, index) => {
                    let answers = e.incorrect_answers;
                    answers.push(e.correct_answer);
                    e.answers = shuffle(answers);
                    e.id = `que_${index}`; 
                    return e;
                });
                setQuizData(data);
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    const onCalculateResult = () => {
        let score = 0;
        quizData.forEach((que) => {
            if (userAnswers.get(que.id) === que.correct_answer) {
                score = score + 1;
            }
        });
        setResult(score);
        setIsFinishQuiz(true);
    };

    return (
        <div className="QuizContainer">
            <div style={{ background: '#2e3244' }}></div>
            {isFinishQuiz ? (
                <div className='Cong'>
                    <div> Congratulations!!! Your Score: {result}</div>
                    <Button onClick={() => setIsFinishQuiz(false)}>Restart Quiz</Button>
                    
                    <Link to="/">
  <Button>Exit</Button>
</Link>

                </div>
            ) : (
                <div>
                    {quizData.map((e, index) => (
                        <div key={index}>
                            <div>{e.question}</div>
                            <div className='Answer'>
                                {e.answers.map((ans, ansIndex) => (
                                    <Button
                                        key={ansIndex} // Add a unique key for each button
                                        onClick={() => {
                                            userAnswers.set(e.id, ans);
                                            setUserAnswers(new Map(userAnswers));
                                        }}
                                        variant="contained"
                                        style={{
                                            margin: 10,
                                            background: userAnswers.get(e.id) === ans ? 'green' : 'blue',
                                        }}
                                    >
                                        {ans}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    ))}
                    <Button onClick={onCalculateResult}>Finish Quiz</Button>
                </div>
                 
            )}
            <div style={{ background: '#2e3244' }}>
                 </div>
        </div>
       
    );
}

export default PlayQuiz;

import {withPageAuthRequired} from '@auth0/nextjs-auth0';
import {NextPage} from "next";
import {questions} from "../data/questions";
import QuestionBox from "../components/QuestionBox";
import {useState} from "react";
import styles from "../styles/Profile.module.css";
import Head from "next/head";

export const getServerSideProps = withPageAuthRequired();

type Props = {
    user: any
}

const Profile: NextPage<Props> = ({ user }) => {

    const [tab, setTab] = useState<string>("general");
    const [currentQuestion, setCurrentQuestion] = useState<number>(0);
    const [takingQuiz, setTakingQuiz] = useState<boolean>(false);
    const [quizData, setQuizData] = useState<string[]>([]);

    const handleQuizStart = (e: any) => {
        e.preventDefault();
        console.log("starting quiz");
        setTakingQuiz(true);
    }

    const updateQuestion = (e: any) => {
        setCurrentQuestion(currentQuestion + 1);
        setQuizData(quizData => [...quizData, e.target.id]);
    }

    return (
        <div className={"main"}>

            <Head>
                <title>Profile | Lana</title>
                <meta name="description" content="Lana - A place to find where you belong." />
                <link rel="icon" href={"/favicon.ico"} />
            </Head>

            <div>
                <h2>Tasks</h2>
            </div>
            <div className={styles.tasks}>
                {!takingQuiz && (
                    <>
                    <button onClick={handleQuizStart} className={"btn"}>
                        Take Quiz
                    </button>
                    </>
                )}
                <button onClick={handleQuizStart} className={"btn"}>
                    Create Company
                </button>
                <br/>
{/*                <Modal title={"Personal Quiz"} show={takingQuiz}>
                    <QuestionBox questions={questions} />
                </Modal>*/}

                {takingQuiz && (
                    <QuestionBox questions={questions} />
                )}
            </div>
        </div>
    );
}

export default Profile;
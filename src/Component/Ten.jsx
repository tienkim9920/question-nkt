import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import Question from '../API/Question';

Ten.propTypes = {
    addAnswer: PropTypes.func,
    addTime: PropTypes.func,
    result: PropTypes.object
};

Ten.defaultProps = {
    addAnswer: null,
    addTime: null,
    result: null
}

const containerVariants = {
    hidden: {
        opacity: 0,
        x: '100vw'
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: 'spring', delay: 0.5 }
    },
    exit: {
        x: "-100vh",
        transition: { ease: 'easeInOut' }
    }
};

const nextVariants = {
    hidden: {
        x: '-100vw'
    },
    visible: {
        x: 0,
        transition: { type: 'spring', stiffness: 120 }
    }
}

const buttonVariants = {
    hover: {
        scale: 1.1,
        textShadow: "0px 0px 8px rgb(255,255,255)",
        boxShadow: "0px 0px 8px rgb(255,255,255)",
        transition: {
            duration: 0.3,
            yoyo: Infinity
        }
    }
}


function Ten(props) {

    const { addAnswer, result, addTime } = props

    const answer = ['NashTech', 'KMS Technology', 'TMA Solution', 'Fujinet Systems'];
    
    const [time, set_time] = useState(parseInt(60))

    const [check, set_check] = useState('')

    const [redirect, set_redirect] = useState(false)

    const handler_answer = async () => {

        addAnswer(check)

        addTime(time)

        const data = {
            name: result.name,
            question1: result.answer[0],
            question2: result.answer[1],
            question3: result.answer[2],
            question4: result.answer[3],
            question5: result.answer[4],
            question6: result.answer[5],
            question7: result.answer[6],
            question8: result.answer[7],
            question9: result.answer[8],
            question10: result.answer[9],
            time1: result.time[0],
            time2: result.time[1],
            time3: result.time[2],
            time4: result.time[3],
            time5: result.time[4],
            time6: result.time[5],
            time7: result.time[6],
            time8: result.time[7],
            time9: result.time[8],
            time10: result.time[9],
        }

        console.log(data)

        const response = await Question.post_answer(data)
        console.log(response)

        sessionStorage.setItem('id_user', response._id)

        set_redirect(true)

    }

    useEffect(() => {

        const second = setTimeout(() => {
            if (parseInt(time) === 0 || time === "Hết giờ =)))") {
                set_time("Hết giờ =)))")
                return
            }

            set_time(time - 1)

        }, 1000)

        return () => clearTimeout(second)

    }, [time])

    return (
        <div>
            <motion.div
                style={{ textAlign: 'right', paddingRight: '3rem' }}
                initial={{ x: '-100vw' }}
                animate={{ x: 0, type: 'spring', stiffness: 120 }}
                transition={{ delay: 1.5 }}
            >Thời gian: {time} {time === 'Hết giờ =)))' ? '' : 's'}</motion.div>
            <motion.div className="base container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            ></motion.div>

            <motion.div className="base container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h3>Câu 10: Mục tiêu của Tiền là được làm ở công ty nào?</h3>
                <ul>
                    {answer.map((value, index) => {
                        let active = check === value ? 'active' : ''
                        return (
                            <motion.li key={index} onClick={() => set_check(value)}
                                whileHover={{ scale: 1.3, originX: 0, color: '#f8e112' }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <span className={active}>{value}</span>
                            </motion.li>
                        )
                    }
                    )}
                </ul>

                {check && (
                    <motion.div className="next"
                        variants={nextVariants}
                    >
                        {
                            redirect && <Redirect to="/finish" />
                        }
                        <motion.button
                            onClick={handler_answer}
                            variants={buttonVariants}
                            whileHover="hover"
                        >
                            Hoàn Thành
                    </motion.button>
                    </motion.div>
                )}

            </motion.div>
        </div>

    );
}

export default Ten;
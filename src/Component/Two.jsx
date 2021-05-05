import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

Two.propTypes = {
    addAnswer: PropTypes.func,
    addTime: PropTypes.func
};

Two.defaultProps = {
    addAnswer: null,
    addTime: null,
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


function Two(props) {

    const { addAnswer, addTime } = props

    const answer = ['Bóng Rổ', 'Đá Banh', 'Đá Cầu', 'Cầu Lông'];

    const [time, set_time] = useState(parseInt(60))

    const [check, set_check] = useState('')

    const [redirect, set_redirect] = useState(false)

    const handler_answer = () => {

        addAnswer(check)

        addTime(time)

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
                <h3>Câu 2: Tiền Kim thích chơi môn thể thao nào nhất?</h3>
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
                            redirect && <Redirect to="/three" />
                        }
                        <motion.button
                            onClick={handler_answer}
                            variants={buttonVariants}
                            whileHover="hover"
                        >
                            Tiếp tục
                    </motion.button>
                    </motion.div>
                )}

            </motion.div>
        </div>

    );
}

export default Two;
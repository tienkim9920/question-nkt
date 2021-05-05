import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Question from '../API/Question';

const backdrop = {
    visible: { opacity: 1 },
    hidden: { opacity: 0 },
}

const modal = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
        y: "200px",
        opacity: 1,
        transition: { delay: 0.5 }
    },
}

function Modal(props) {

    const history = useHistory()

    const handler_rank = () => {
        history.push('/rank')
    }

    const [user, set_user] = useState({})

    const [score, set_score] = useState({})

    useEffect(() => {

        const fetchData = async () => {

            const response = await Question.get_user(sessionStorage.getItem('id_user'))

            set_user(response)

            const res_score = await Question.get_score(sessionStorage.getItem('id_user'))

            set_score(res_score)

        }

        fetchData()

    }, [])

    const handler_result = () => {

        history.push('/result')

    }

    return (
        <AnimatePresence>
            <motion.div className="backdrop"
                variants={backdrop}
                initial="hidden"
                animate="visible"
                exit="hidden"
            >
                <motion.div className="modal"
                    variants={modal}
                >
                    <p>Bạn đã trả lời đúng {user.answer_true}/10 câu</p>
                    <p>Bạn đã đạt được <i style={{ color: 'red' }}>{score.total}</i> điểm</p>
                    <button onClick={handler_rank}>Bảng Xếp Hạng</button>
                    <br/>
                    <br />
                    <motion.a
                        onClick={handler_result}
                        style={{ borderBottom: '2px solid #444', paddingBottom: '5px', cursor: 'pointer', color: '#444' }}>
                        Xem Đáp Án
                </motion.a>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

export default Modal;
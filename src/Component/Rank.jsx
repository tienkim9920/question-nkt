import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import Question from '../API/Question';


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


function Rank(props) {

    const history = useHistory()

    const [list_rank, set_list_rank] = useState([])

    const [time, set_time] = useState(parseInt(60))

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


    const handler_goBack = () => {
        history.goBack()
    }

    useEffect(() => {

        const fetchData = async () => {

            const response = await Question.get_all_score()

            console.log(response)

            set_list_rank(response)

        }

        fetchData()

    }, [])

    return (
        <div>
            <motion.div className="base container"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h3>Bảng Xếp Hạng</h3>
                <table style={{ width: '100%' }}>
                    <thead>
                        <tr style={{ height: '30px' }}>
                            <th>Top</th>
                            <th>Name</th>
                            <th>Điểm</th>
                            <th>Đúng</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            list_rank && list_rank.map((value, index) => (
                                <tr style={{ height: '30px' }} key={index}>
                                    <td>{index + 1}</td>
                                    <td>{value.id_user.name}</td>
                                    <td>{value.total}</td>
                                    <td>{value.id_user.answer_true}/10</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

                <motion.div className="next"
                    variants={nextVariants}
                >
                    <motion.button
                        variants={buttonVariants}
                        whileHover="hover"
                        onClick={handler_goBack}
                    >
                        Trở Lại
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>

    );
}

export default Rank;
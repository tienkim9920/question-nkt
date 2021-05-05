import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';
import Modal from './Modal';

Finish.propTypes = {
    result: PropTypes.object
};

Finish.defaultProps = {
    result: null
}

const containerVariants = {
    hidden: {
        opacity: 0,
        x: '100vw',
        transition: {
            staggerChildren: 0.5,
        }
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: 'spring',
            mass: 0.4,
            damping: 8,
            staggerChildren: 0.4,
            when: "beforeChildren",
        }
    },
};

const childVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
    }
}

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

function Finish(props) {

    const { result } = props

    const [show_modal, set_show_modal] = useState(false)

    const handler_score = () => {

        set_show_modal(true)

    }


    return (
        <div>

            {
                show_modal && <Modal />
            }
            <motion.div className="container order"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h2>Cảm ơn bạn đã tham gia!</h2>
                <h4>Đây là đáp án bạn đã chọn!</h4>
                <motion.p variants={childVariants}>Nickname: {result.name}</motion.p>
                <motion.div variants={childVariants}>
                    {
                        result.answer && result.answer.map((value, index) => (
                            <div key={index}>Câu {index + 1}: {value}</div>
                        ))
                    }
                </motion.div>
                <motion.div className="next"
                    variants={nextVariants}
                >
                    <motion.button
                        onClick={handler_score}
                        variants={buttonVariants}
                        whileHover="hover"
                    >
                        Xem Kết Quả
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>

    );
}

export default Finish;
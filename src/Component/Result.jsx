import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router';

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

function Result(props) {

    const history = useHistory()

    const result = [
        "Chó & Mèo",
        "Đá Banh",
        "Hàn Quốc",
        "Gia Đình",
        "Trà Sữa Lài MilkFoam",
        "Con Gián",
        "1 Cái Ôm",
        "Không Thích Chơi Game",
        "Ham Học Hỏi",
        "KMS Technology",
      ];

    const handler_goBack = () => {

        history.goBack()

    }
    
    return (
        <div>
            <motion.div className="container order"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
            >
                <h2>Đáp án dành cho bạn!</h2>
                <br/>
                <motion.div variants={childVariants}>
                    {
                        result && result.map((value, index) => (
                            <div key={index}>Câu {index + 1}: {value}</div>
                        ))
                    }
                </motion.div>
                <motion.div className="next"
                    variants={nextVariants}
                >
                    <motion.button
                        onClick={handler_goBack}
                        variants={buttonVariants}
                        whileHover="hover"
                    >
                        Trở Lại
                    </motion.button>
                </motion.div>
            </motion.div>
        </div>

    );
}

export default Result;
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Link, Redirect, useHistory } from 'react-router-dom';

Home.propTypes = {
    addName: PropTypes.func
};

Home.defaultProps = {
    addName: null
}

const buttonVariants = {
    hover: {
        scale: 1.1,
        textShadow: "0px 0px 8px rgb(255,255,255)",
        boxShadow: "0px 0px 8px rgb(255,255,255)",
        transition: {
            duration: 0.3,
            yoyo: 5
        }
    }
}

const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: { delay: 1.5, duration: 1.5 }
    },
    exit: {
        x: "-100vh",
        transition: { ease: 'easeInOut' }
    }
};

function Home(props) {

    const { addName } = props

    const [name, set_name] = useState('')
    const [err_name, set_err_name] = useState(false)
    const [redirect, set_redirect] = useState(false)

    const history = useHistory()

    const handler_Start = () => {

        if (!name) {
            set_err_name(true)
            return
        }

        addName(name)

        set_redirect(true)

        set_err_name(false)
    }

    const handler_rank = () => {

        history.push('/rank')

    }

    return (
        <motion.div className="home container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <h2>Bạn nghĩ mình đã hiểu hết về Tiền Kim?</h2>
            <div>
                <input type="text" placeholder="Bạn tên là gì?"
                    className="input_name" value={name} onChange={(e) => set_name(e.target.value)} />
                <br />
                {
                    err_name && <span style={{ color: 'red', fontSize: '.9rem' }}>*Vui lòng nhập tên của bạn!</span>
                }
            </div>
            {
                redirect && <Redirect to="/one" />
            }
            <motion.button
                variants={buttonVariants}
                whileHover="hover"
                onClick={handler_Start}
            >
                Bắt Đầu Thôi
            </motion.button>

            <div>
                Lưu ý: Đừng suy nghĩ quá lâu =)))
            </div>
            <br/>
            <br/>
            <a 
                onClick={handler_rank}
                style={{ borderBottom: '2px solid white', paddingBottom: '5px', cursor: 'pointer'}}>
                Bảng Xếp Hạng
            </a>
        </motion.div>
    );
}

export default Home;
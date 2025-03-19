import React, { useState } from 'react'
import './Calculator.scss'
import Button from './Button'

const Calculator = () => {

    const [exp, setExp] = useState('')
    const [disp, setDisp] = useState('0')


    const isNum = (v) => !isNaN(v)
    const isOp = (v) => '+-*/'.includes(v)

    const updateExp = (v) => {
        const newExp = exp + v;
        setExp(newExp)
        setDisp(newExp)

    }
    const reset = () => {
        setExp('')
        setDisp('0')
    }
    const calc = () => {
        try {

            const result = eval(exp)

            setExp(result.toString())
            setDisp(result.toString())
        } catch {
            reset()
            setDisp('Error')
        }

    }
    const onBtnClick = (v) => {

        const last = exp.slice(-1)


        if (isNum(v)) {
            updateExp(v)


        }

        else if (v === '.') {
            const parts = exp.split(/[\+\-\*\/]/);
            /*
            /[ ]/ → 안의 문자 중 하나라도 매치하면 동작.
            \+, \*, \/ → 특수문자를 문자 그대로 쓰기 위해 이스케이프.
            split(/[\+\-\*\/]/) → 수식을 연산자 기준으로 나누기 위한 코드.
            / [//]연산자 기준으로 나눔
            백슬래시 기준으로 나눔
           */
            const lastNum = parts[parts.length - 1];

            if (!lastNum.includes('.')) {
                updateExp(v);
            }
        }
        else if (isOp(v)) {
            if (exp && !isOp(last)) updateExp(v)

        } else if (v === 'C') {
            reset()
        } else if (v === '=') {
            calc()
        }

    }


    const btns = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        'C'
    ]
    const btnClass = (v) => {
        if (v === 'C') return 'clear'
        if (v === '=') return 'equal'
        if (isOp(v)) return 'operator'
    }

    return (
        <div id='calculator'>
            <h1>Calculator</h1>
            <input type="text" readOnly id='display' value={disp} />
            <div id="buttons">
                {btns.map((btn, i) => (

                    <Button
                        key={i}
                        onClick={onBtnClick}
                        value={btn}
                        className={btnClass(btn)}
                    />
                ))}



            </div>
        </div>
    )
}

export default Calculator
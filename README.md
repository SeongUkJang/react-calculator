기본적인 계산기 컴포넌트를 구현한 React 코드입니다. 

계산기의 UI를 만들고, 버튼 클릭 이벤트를 처리하며, 계산 기능을 제공하는 로직을 작성한 것입니다. 

### 전체 코드:

```jsx
import React, { useState } from 'react';
import './Calculator.scss';
import Button from './Button';

const Calculator = () => {
    const [exp, setExp] = useState('');  // 계산식 상태
    const [disp, setDisp] = useState('0');  // 화면에 표시될 값 상태

    // 숫자 확인 함수
    const isNum = (v) => !isNaN(v);

    // 연산자 확인 함수
    const isOp = (v) => '+-*/'.includes(v);

    // 계산식 업데이트 함수
    const updateExp = (v) => {
        const newExp = exp + v;
        setExp(newExp);
        setDisp(newExp);
    };

    // 계산기 초기화 함수
    const reset = () => {
        setExp('');
        setDisp('0');
    };

    // 계산 함수
    const calc = () => {
        try {
            const result = eval(exp);  // 계산식 실행
            setExp(result.toString());
            setDisp(result.toString());
        } catch {
            reset();
            setDisp('Error');  // 오류 처리
        }
    };

    // 버튼 클릭 이벤트 처리
    const onBtnClick = (v) => {
        const last = exp.slice(-1);

        if (isNum(v) || v === '.') {
            updateExp(v);  // 숫자나 .일 경우
        } else if (isOp(v)) {
            if (exp && !isOp(last)) updateExp(v);  // 연산자일 경우
        } else if (v === 'C') {
            reset();  // 초기화 버튼
        } else if (v === '=') {
            calc();  // 계산 실행
        }
    };

    // 버튼 배열
    const btns = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        'C'
    ];

    // 버튼의 클래스 이름 설정
    const btnClass = (v) => {
        if (v === 'C') return 'clear';
        if (v === '=') return 'equal';
        if (isOp(v)) return 'operator';
    };

    return (
        <div id="calculator">
            <h1>Calculator</h1>
            <input type="text" readOnly id="display" value={disp} />
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
    );
};

export default Calculator;

```

### 1. **`useState` 훅**

- `exp`: 계산식(예: `3+5*2`)을 저장하는 상태.
- `disp`: 화면에 표시할 계산식 또는 결과를 저장하는 상태.

### 2. **핵심 함수**

- `isNum(v)`: 값이 숫자인지 확인하는 함수 (`!isNaN(v)`).
- `isOp(v)`: 값이 연산자인지 확인하는 함수 (`+-*/` 문자열에 포함되어 있는지 체크).

### 3. **`updateExp(v)`**: 계산식 업데이트

- `exp` 상태에 `v` 값을 추가하여 계산식을 업데이트하고, 화면에 표시될 값도 업데이트합니다.

### 4. **`reset()`**: 계산기 초기화

- 계산식을 비우고, 화면에 `0`을 표시합니다.

### 5. **`calc()`**: 계산

- `eval()`을 사용하여 `exp`에 입력된 계산식을 실행하고, 그 결과를 `disp`에 표시합니다.
- 오류가 발생하면 계산기를 초기화하고 `"Error"`를 표시합니다.

### 6. **`onBtnClick(v)`**: 버튼 클릭 처리

- 버튼 클릭 시 `exp`에 값을 추가하거나 연산자를 처리합니다.
- `'C'`를 클릭하면 계산기를 초기화하고, `'='`을 클릭하면 계산을 실행합니다.

### 7. **버튼 클래스 설정**

- `btnClass(v)`는 버튼의 종류에 따라 다른 CSS 클래스를 반환합니다.
    - `'C'`: `clear` 클래스 (초기화 버튼)
    - `'='`: `equal` 클래스 (결과 표시 버튼)
    - 연산자 (`+`, , , `/`): `operator` 클래스

### 8. **버튼 배열 (`btns`)**

- 계산기에서 사용되는 버튼의 배열입니다.

### 설명:

- **UI 구성**: `input` 태그를 사용하여 계산 결과를 표시하고, `Button` 컴포넌트를 이용해 버튼을 화면에 배치합니다.
- **`Button` 컴포넌트**: `Button` 컴포넌트는 버튼의 클릭 이벤트와 스타일을 처리합니다. 이 부분은 따로 작성된 `Button` 컴포넌트를 사용한다고 가정합니다.

## CODE

### Calculator.jsx

```jsx
import React ,{useState} from 'react'
import './Calculator.scss'
import Button from './Button'

const Calculator = () => {

    const [exp, setExp]=useState('')
    const [disp, setDisp]=useState('0')

    const isNum=(v)=> !isNaN(v)
    const isOp=(v)=>'+-*/'.includes(v)

    const updateExp=(v)=>{
        const newExp =exp+v;
        setExp(newExp)
        setDisp(newExp)

    }
    const reset=()=>{
        setExp('')
        setDisp('0')
    }
    const calc=()=>{
        try{

            const result = eval(exp)

            setExp(result.toString())
            setDisp(result.toString())
        }catch{
            reset()
            setDisp('Error')
        }

    }
    const onBtnClick=(v)=>{

        const last = exp.slice(-1)

        if(isNum(v) ||v==='.'){
            updateExp(v)
        }else if(isOp(v)){
            if(exp && !isOp(last))  updateExp(v)

        }else if(v ==='C') {
            reset()
        }else if(v==='='){
            calc()
        }

    }

    const btns=[
        '7','8','9','/',
        '4','5','6','*',
        '1','2','3','-',
        '0','.','=','+',
        'C'
    ]
    const btnClass=(v)=>{
        if(v==='C') return 'clear'
        if(v==='=') return 'equal'
        if(isOp(v)) return 'operator'
    }

    return (
        <div id='calculator'>
            <h1>Calculator</h1>
            <input type="text" readOnly id='display' value={disp}/>
            <div id="buttons">
            {btns.map((btn,i)=>(

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
```

### Calculator.scss

```scss
#calculator {
    background-color: #fff;
    width: 280px;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.37);
    text-align: center;

    h1 {
        color: #ff9100;
        font-weight: 100;
        margin-bottom: 15px;
    }
    #display{
        border:2px solid #ccc;
        border-radius: 5px;
        background-color: #eef;
        padding:10px;
        height: 60px;
        text-align: right;
        font-size: 32px;
        width: 100%;
    }
    #buttons {
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
        margin-top: 15px;
        
        .btn {
            width: 20%;
            flex: 1 1 auto;
            font-size: 24px;
            height: 60px;
            border-radius: 5px;
            border: none;
            cursor: pointer;
            background-color: #ddd;

            &.operator{
                background-color: #ff9100;
                color: #fff;
            }
            &.equal {
                background-color: #4caf50;
                color: #fff;
            }
            &.clear{
                color:#fff;
                flex:0 0 100%;
                background-color: #ff5252;
            }
        }
    }
}
```

### Button.jsx

```jsx
import React from 'react'

const Button = ({ value, onClick, className = '' }) => {
    return (

        <button
            className={`btn ${className}`}
            onClick={()=>onClick(value)}
        >
            {value}
        </button>

    )
}

export default Button
```

### index.css

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #eee;
}
```

### app.jsx

```jsx
import './App.css'
import Calculator from './components/Calculator'
function App() {

  return (
    <div>
      <Calculator/>

    </div>
  )
}

export default App

```

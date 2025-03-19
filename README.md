### 주요 기능은 계산기 애플리케이션의 구현입니다.

이 코드는 사용자 입력을 받아 계산식을 처리하고 결과를 출력하는 기능을 제공합니다. 

### 코드 설명

```jsx
import React, { useState } from 'react'
import './Calculator.scss'
import Button from './Button'

const Calculator = () => {
    // 상태 관리: exp는 사용자가 입력한 수식을 저장, disp는 디스플레이에 표시할 값을 저장
    const [exp, setExp] = useState('')
    const [disp, setDisp] = useState('0')

    // 숫자인지 확인하는 함수 (v: 값)
    const isNum = (v) => !isNaN(v)

    // 연산자인지 확인하는 함수 (v: 값)
    const isOp = (v) => '+-*/'.includes(v)

    // 수식에 새로운 값을 추가하는 함수
    const updateExp = (v) => {
        const newExp = exp + v; // 기존 수식(exp)에 새로운 값을 추가
        setExp(newExp)  // 수식 상태 업데이트
        setDisp(newExp) // 디스플레이 상태 업데이트
    }

    // 계산기 초기화 함수 (수식과 디스플레이를 초기화)
    const reset = () => {
        setExp('')  // 수식 초기화
        setDisp('0')  // 디스플레이 초기화
    }

    // 수식을 계산하는 함수
    const calc = () => {
        try {
            const result = eval(exp)  // 수식을 계산 (eval은 문자열을 코드로 실행)

            setExp(result.toString())  // 계산 결과를 수식 상태에 저장
            setDisp(result.toString())  // 계산 결과를 디스플레이 상태에 저장
        } catch {
            reset()  // 에러가 발생하면 초기화
            setDisp('Error')  // 디스플레이에 'Error' 표시
        }
    }

    // 버튼 클릭 시 처리하는 함수
    const onBtnClick = (v) => {
        const last = exp.slice(-1)  // 수식에서 마지막 문자를 가져옴

        // 숫자가 클릭되었을 때 수식에 숫자 추가
        if (isNum(v)) {
            updateExp(v)
        }
        // 소수점('.')이 클릭되었을 때 처리
        else if (v === '.') {
            const parts = exp.split(/[\+\-\*\/]/);  // 연산자 기준으로 수식 분리

            // 마지막 숫자에 소수점이 포함되어 있지 않으면 소수점 추가
            const lastNum = parts[parts.length - 1];
            if (!lastNum.includes('.')) {
                updateExp(v);
            }
        }
        // 연산자(+,-,*,/)가 클릭되었을 때 처리
        else if (isOp(v)) {
            if (exp && !isOp(last)) {  // 마지막 문자가 연산자가 아니면 연산자 추가
                updateExp(v)
            }
        }
        // 'C' (초기화) 버튼 클릭 시 처리
        else if (v === 'C') {
            reset()
        }
        // '=' (결과 계산) 버튼 클릭 시 처리
        else if (v === '=') {
            calc()
        }
    }

    // 버튼 배열: 계산기 버튼에 대한 값들
    const btns = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        'C'
    ]

    // 버튼마다 다른 스타일을 적용하는 함수
    const btnClass = (v) => {
        if (v === 'C') return 'clear'  // 'C' 버튼은 'clear' 클래스
        if (v === '=') return 'equal'  // '=' 버튼은 'equal' 클래스
        if (isOp(v)) return 'operator'  // 연산자는 'operator' 클래스
    }

    return (
        <div id='calculator'>
            <h1>Calculator</h1>
            {/* 계산기 디스플레이, 읽기 전용으로 설정 */}
            <input type="text" readOnly id='display' value={disp} />
            <div id="buttons">
                {/* 버튼을 반복 렌더링 */}
                {btns.map((btn, i) => (
                    <Button
                        key={i}
                        onClick={onBtnClick}  // 버튼 클릭 시 onBtnClick 함수 호출
                        value={btn}  // 버튼의 값 (숫자, 연산자 등)
                        className={btnClass(btn)}  // 버튼의 스타일 클래스
                    />
                ))}
            </div>
        </div>
    )
}

export default Calculator

```

---

### 1. **상태 관리** (`useState`)

```jsx
const [exp, setExp] = useState('');  // 계산식 (예: "3+5*2")
const [disp, setDisp] = useState('0');  // 디스플레이에 보여줄 값

```

- `exp`는 사용자가 입력한 계산식(수식)을 저장합니다.
- `disp`는 화면에 표시될 계산기 디스플레이의 값입니다.

---

### 2. **도우미 함수** (`isNum`, `isOp`, `updateExp`, `reset`, `calc`)

- `isNum` 함수:
    
    ```jsx
    const isNum = (v) => !isNaN(v);
    
    ```
    
    - 숫자(0~9)인지 확인하는 함수입니다.
- `isOp` 함수:
    
    ```jsx
    const isOp = (v) => '+-*/'.includes(v);
    
    ```
    
    - 연산자(`+`, , , `/`)인지 확인하는 함수입니다.
- `updateExp` 함수:
    
    ```jsx
    const updateExp = (v) => {
        const newExp = exp + v;
        setExp(newExp);
        setDisp(newExp);
    }
    
    ```
    
    - `exp`에 새로운 값을 추가하고, `disp`에 그 값을 즉시 반영하는 함수입니다.
- `reset` 함수:
    
    ```jsx
    const reset = () => {
        setExp('');
        setDisp('0');
    }
    
    ```
    
    - 계산기 초기화 함수입니다. 수식과 디스플레이를 초기 상태로 되돌립니다.
- `calc` 함수:
    
    ```jsx
    const calc = () => {
        try {
            const result = eval(exp);  // `exp` 수식을 계산
            setExp(result.toString());
            setDisp(result.toString());
        } catch {
            reset();
            setDisp('Error');
        }
    }
    
    ```
    
    - `exp`에 저장된 수식을 `eval()` 함수로 계산하고 결과를 디스플레이합니다. 오류가 발생하면 오류 메시지를 출력합니다.

---

### 3. **버튼 클릭 처리** (`onBtnClick`)

```jsx
const onBtnClick = (v) => {
    const last = exp.slice(-1);

    if (isNum(v)) {
        updateExp(v);
    }
    else if (v === '.') {
        const parts = exp.split(/[\+\-\*\/]/);
        const lastNum = parts[parts.length - 1];

        if (!lastNum.includes('.')) {
            updateExp(v);
        }
    }
    else if (isOp(v)) {
        if (exp && !isOp(last)) updateExp(v);
    } else if (v === 'C') {
        reset();
    } else if (v === '=') {
        calc();
    }
}

```

- 각 버튼이 클릭될 때마다 `onBtnClick` 함수가 호출됩니다.
    - 숫자 버튼 (`isNum`)이 클릭되면, 해당 숫자를 `exp`에 추가합니다.
    - `.`(소수점)이 클릭되면, 현재 수식에 소수점이 추가 가능한지 확인 후 추가합니다.
    - 연산자 (`+`, , , `/`)가 클릭되면, 마지막 문자가 연산자가 아닌 경우에만 추가합니다.
    - `C`는 초기화 버튼으로, `reset()`을 호출해 계산기를 초기화합니다.
    - `=`는 계산 버튼으로, `calc()`를 호출해 수식을 계산합니다.

---

### 4. **버튼 배열** (`btns`)

```jsx
const btns = [
    '7', '8', '9', '/',
    '4', '5', '6', '*',
    '1', '2', '3', '-',
    '0', '.', '=', '+',
    'C'
];

```

- 계산기 버튼 배열입니다. 여기서 각 버튼은 계산식에 맞는 값을 추가하거나 연산을 수행하는 버튼들입니다.

---

### 5. **버튼 스타일** (`btnClass`)

```jsx
const btnClass = (v) => {
    if (v === 'C') return 'clear';
    if (v === '=') return 'equal';
    if (isOp(v)) return 'operator';
}

```

- 버튼마다 특정 클래스 이름을 지정해 스타일을 다르게 적용합니다.
    - `C` 버튼은 `clear` 클래스.
    - `=` 버튼은 `equal` 클래스.
    - 연산자 버튼은 `operator` 클래스.

---

### 6. **렌더링 및 컴포넌트 구조**

```jsx
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

```

- 계산기 전체 UI를 렌더링합니다.
    - `display` 입력창에 `disp` 상태값을 표시합니다.
    - 각 버튼은 `Button` 컴포넌트를 사용해 렌더링됩니다.
    - `Button` 컴포넌트에 클릭 이벤트와 값을 전달하여 버튼 클릭 시 동작하도록 합니다.

---

## CODE.

### Calculator.jsx

```jsx
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

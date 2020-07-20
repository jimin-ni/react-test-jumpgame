import React, { useState, useEffect, useRef } from 'react';
import Chracter from './component/Character';
import Background from './component/Background';
import Enemy from './component/Enemy';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(() => ({
	root: {
	},
	button: {
		border: '1px solid black',
		margin: '50px 0 0 50px',
		position: 'absolute',
		width: '1000px',
		height: '500px',
		fontWeight: 'bold',
		fontSize: '50px',
		textTransform: 'initial'
	},
	timer: {
		position: 'absolute',
		display: 'flex',
		left: '50px',
		top: '570px',
		fontSize: "20px"
	}
}))
const Main = () => {
	// Init
	const updateTime = 20;
	const interval = useRef();
	// State
	const [isStart, setIsStart] = useState(false);
	const [time, setTime] = useState(0);
	const [result, setResult] = useState(0);
	const [isMove, setIsMove] = useState(false);
	// 특정 시간을 주기로
	// 1. Enemy에게 props로 보내는 state를 true 또는 false로 수정
	// 2. 시간을 체크
	// 3. 충돌을 체크
	useEffect(() => {
		if (isStart) {
			interval.current = setInterval(() => {
				if (Math.floor(time)%3 ==2){
					setIsMove(true);
				}else{
					setIsMove(false);
				}
				setTime(time + updateTime * 0.001);
				checkConflict();
			}, updateTime)
		}
		return () => {
			clearInterval(interval.current);
		};
	}, [time, isStart]);
	// CSS
	const classes = useStyles();
	// 게임 시작
	const handleClickStartButton = () => {
		setIsStart(true);
	}
	// 충돌 체크하고 충돌이면 게임을 종료
	const checkConflict = () => {
		let enemy = document.querySelector('img#enemy');
		let character = document.querySelector('img#character');
		if (enemy !== null && character !== null) {
			let dis = Math.pow(enemy.x - character.x, 2) + Math.pow(enemy.y - character.y, 2)
			if (dis < 3000) {
				alert("Game Over!");
				if (result<time){
					setResult(time);
				}
				setIsStart(false);
				setTime(0);
			}
		}
	}
	// 시작한 경우 게임 컴포넌트를 렌더링
	return (
		<div >
			{
				isStart ?
					<div>
						<Background />
						<Chracter />
						<Enemy isMove={isMove}/>
						<div className={classes.timer}>
							<div >React Web Game!!</div>
							<div style={{ margin: "0 0 0 50px" }}> Time : </div>
							<div style={{ margin: "0 0 0 10px" }}>{Math.floor(time)}s</div>
						</div>
					</div>
					:
					<div>
						<Button onClick={handleClickStartButton} className={classes.button}>
							Your Highest Record is {Math.floor(result)}s
							<br/>
							Click to Start Game!
						</Button>
					</div>
			}
		</div>
	)
}
export default Main;
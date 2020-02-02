import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import EnemyImg from '../image/enemy.png';
const useStyles = makeStyles(theme => ({
  root: {

  },
  character: {
    position: 'absolute',
    width: '80px',
    height: '80px',
    top: '410px'
  },
}))
const Enemy = (props) => {
  // init
  const updateTime = 20;
  const initLeft = 1000 - 20;
  const moveWidth = 1000 - 50;
  const speed = 10;
  const timeOutList = [];
  // State
  const [left, setLeft] = useState(initLeft);
  const [isMoving, setIsMoving] = useState(false);
  // props.isMove가 변하면 props.isMove를 isMove에 저장
  useEffect(()=>{
    //setIsMove(props.isMove);
    if (props.isMove) {
      setIsMoving(true);
      setLeft(initLeft);
      move();
    }
  },[props.isMove])
  // 컴포넌트가 Unmount되면 timeout을 모두 삭제
  useEffect(()=>{
    return () => {
      for (let i=0; i< timeOutList.length; i++){
        clearTimeout(timeOutList[i]);
      }
    }
  },[])
  // css
  const classes = useStyles();
  // 움직임을 시작하며 끝까지가면 움직임 끝
  const move = () => {
    for (let i = 0; i < moveWidth / speed; i++) {
      let timeOut = setTimeout(() => {
        setLeft(initLeft - speed * i);
        if (i === moveWidth / speed - 1)
          setIsMoving(false);
      }, updateTime * i);
      timeOutList.push(timeOut);
    }
  }
  // 움직이는 경우만 렌더링
  return (
    <div>
      {
        isMoving ?
          <img id="enemy" src={EnemyImg} className={classes.character} style={{ left:left }}></img>
          : null
      }
    </div>
  )
}
export default Enemy;
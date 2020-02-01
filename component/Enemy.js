import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Motion, spring } from 'react-motion';
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
  const [isMove, setIsMove] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  // props.isMove가 변하면 props.isMove를 isMove에 저장
  useEffect(()=>{
    setIsMove(props.isMove);
  },[props.isMove])
  // 컴포넌트가 Unmount되면 timeout을 모두 삭제
  useEffect(()=>{
    return () => {
      for (let i=0; i< timeOutList.length; i++){
        clearTimeout(timeOutList[i]);
      }
    }
  },[])
  // isMove가 true로 변하는 경우 움직임을 시작
  useEffect(() => {
    if (isMove) {
      setIsMoving(true);
      setLeft(initLeft);
      move();
    }
  }, [isMove]);
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
          <Motion style={{ left: spring(left) }}>
            {
              ({ }) => <img id="enemy" src='../enemy.png' className={classes.character} style={{ left }} />
            }
          </Motion>
          : null
      }
    </div>
  )
}
export default Enemy;
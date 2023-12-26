import React, {useEffect, useRef, useState} from 'react';
import styles from './index.module.scss';
import classNames from "classnames";

function Index() {

    const [currentIndex,setCurrentIndex] = useState(1)

    const handleClick = (id:number) => {
        setCurrentIndex(id)
    }

    return (
        <div className={styles.box}>
            <div className={styles.click}>
                <div style={{width: '50px',height:'50px',border:'1px solid #fff'}} onClick={()=>handleClick(1)}>1</div>
                <div style={{width: '50px',height:'50px',border:'1px solid #fff'}} onClick={()=>handleClick(2)}>2</div>
                <div style={{width: '50px',height:'50px',border:'1px solid #fff'}} onClick={()=>handleClick(3)}>3</div>
                <div style={{width: '50px',height:'50px',border:'1px solid #fff'}} onClick={()=>handleClick(4)}>4</div>
            </div>
            <div className={classNames(styles.face)}>
                <span className={classNames(currentIndex===1?styles.show : styles.hide,styles.face1)}></span>
                {/*<span  className={currentIndex===1?styles.show : styles.hide}></span>*/}
                {/*<span  className={currentIndex===1?styles.show : styles.hide}></span>*/}
                {/*<span  className={currentIndex===1?styles.show : styles.hide}></span>*/}
            </div>
            <div className={classNames(styles.face)}>
                <span  className={classNames(currentIndex===2?styles.show : styles.hide,styles.face2)}></span>
                {/*<span  className={currentIndex===2?styles.show : styles.hide}></span>*/}
                {/*<span  className={currentIndex===2?styles.show : styles.hide}></span>*/}
                {/*<span  className={currentIndex===2?styles.show : styles.hide}></span>*/}
            </div>
            <div className={classNames(styles.face)}>
                <span  className={classNames(currentIndex===3?styles.show : styles.hide,styles.face3)}></span>
                {/*<span  className={currentIndex===3?styles.show : styles.hide}></span>*/}
                {/*<span  className={currentIndex===3?styles.show : styles.hide}></span>*/}
                {/*<span  className={currentIndex===3?styles.show : styles.hide}></span>*/}
            </div>
            <div className={classNames(styles.face)}>
                <span  className={classNames(currentIndex===4?styles.show : styles.hide,styles.face4)}></span>
                {/*<span  className={currentIndex===4?styles.show : styles.hide}></span>*/}
                {/*<span  className={currentIndex===4?styles.show : styles.hide}></span>*/}
                {/*<span  className={currentIndex===4?styles.show : styles.hide}></span>*/}
            </div>
        </div>
    );
}

export default Index;
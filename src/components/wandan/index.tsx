import React, { useEffect, useMemo, useRef, useState } from 'react';
import { GetServerSidePropsContext, NextPage } from 'next';
import { getChannel } from '@/utils';
import VideoBox from '@/components/VideoBox';
import styles from './index.module.scss';
import logo from "@/assets/images/wandan/logo.png"
import Image from 'next/image';
import banner_one from "@/assets/images/wandan/banner_one.png"
import banner_two from "@/assets/images/wandan/banner_two.png"
import banner_three from "@/assets/images/wandan/banner_three.png"
import banner_four from "@/assets/images/wandan/banner_four.png"
import left_button from "@/assets/images/wandan/left_button.png"
import right_button from "@/assets/images/wandan/right_button.png"
import chapter_one from "@/assets/images/wandan/chapter_one.png"
import chapter_two from "@/assets/images/wandan/chapter_two.png"
import chapter_three from "@/assets/images/wandan/chapter_three.png"
import chapter_four from "@/assets/images/wandan/chapter_four.png"
import chapter_five from "@/assets/images/wandan/chapter_five.png"
import chapter_six from "@/assets/images/wandan/chapter_six.png"
import spark_studio from "@/assets/images/wandan/spark_studio.png"
import big_logo from "@/assets/images/wandan/big_logo.png"
import pane_left from "@/assets/images/wandan/pane_left.png"
import pane_right from "@/assets/images/wandan/pane_right.png"
import qq from "@/assets/images/wandan/qq.png"
import weixin from "@/assets/images/wandan/weixin.png"
import buy from "@/assets/images/wandan/buy.png"
import buy_button from "@/assets/images/wandan/buy_button.png"
import explanation from "@/assets/images/wandan/explanation.png"
import introduction from "@/assets/images/wandan/introduction.png"
import mask_chapter_one from "@/assets/images/wandan/mask_chapter_one.png"
import mask_chapter_two from "@/assets/images/wandan/mask_chapter_two.png"
import mask_chapter_three from "@/assets/images/wandan/mask_chapter_three.png"
import mask_chapter_four from "@/assets/images/wandan/mask_chapter_four.png"
import mask_chapter_five from "@/assets/images/wandan/mask_chapter_five.png"
import mask_chapter_six from "@/assets/images/wandan/mask_chapter_six.png"
import lock from "@/assets/images/wandan/lock.png"
import story from "@/assets/images/wandan/story.png"
import { postCounter } from '@/services/activity';

interface WdProps {
  count: number;
}
// count
const Wd: NextPage<WdProps> = ({
   count
}) => {
  //常量
  const videoMp4 = "https://yiqiyoo-1300033206.cos.ap-nanjing.myqcloud.com/prod/assets/wandan-banner.mp4"
  const videoWebm = "https://yiqiyoo-1300033206.cos.ap-nanjing.myqcloud.com/prod/assets/wandan-banner.mp4"
  const carousel = ["心动的她","她的礼物","你与她的故事","完蛋群聊"]
  const secondCarousel = [banner_one,banner_two,banner_three,banner_four]
  //第二三级索引
  const [secondIndex,setSecondIndex] = useState(0);
  const [thirdIndex,setThirdIndex] = useState([
    {
      state:false,
      image:chapter_one,
      maskImage:mask_chapter_one
    },
    {
      state:false,
      image:chapter_two,
      maskImage:mask_chapter_two
    },
    {
      state:false,
      image:chapter_three,
      maskImage:mask_chapter_three
    },
    {
      state:false,
      image:chapter_four,
      maskImage:mask_chapter_four
    },
    {
      state:false,
      image: chapter_five,
      maskImage:mask_chapter_five
    },
    {
      state:false,
      image: chapter_six,
      maskImage:mask_chapter_six
    }
  ]);
  //计时器相关
  const targetDate = new Date("2024-02-29T23:59:59");
  const [remainingTime, setRemainingTime] = useState({ days: 0, hours: 0, minutes: 0});
  const [counter, setCounter] = useState(count)

  useEffect(() => {
    const calculateRemainingTime = () => {
      const currentDate = new Date();
      const remainingTimeInMilliseconds = targetDate.getTime() - currentDate.getTime();

      const days = Math.floor(remainingTimeInMilliseconds / (1000 * 60 * 60 * 24));
      const hours = Math.floor((remainingTimeInMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((remainingTimeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
      setRemainingTime({ days, hours, minutes});
    };

    const timer = setInterval(calculateRemainingTime, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleSecondClick = (direction: string) => {
    if (direction === "left") {
      setSecondIndex((secondIndex + 1) % 4);
    } else {
      setSecondIndex((secondIndex - 1 + 4) % 4);
    }
  };

  const handleMouseEnter = (index:number) => {
    setThirdIndex(thirdIndex.map((item, i) => ({
      ...item,
      state: i === index
    })));
  }

  const handleMouseLeave = () => {
    setThirdIndex(thirdIndex.map((item) => ({
        ...item,
        state: false
    })));
  }

  const handleBuy = async () => {
    const data = await postCounter({
      type: 1,
      method: 'get'
    })
    setCounter(data.data.counter)
  }

  // 页面整体切换逻辑
  const elementRef = useRef<HTMLDivElement>(null);
  const [height,setHeight] = useState(1080)
  const [isCloseTransition, setIsCloseTransition] = useState(false);
  const [canRun, setCanRun] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (elementRef.current) {
      elementRef.current.style.top = transformScroll;
    }
  },[height, index]);

  useEffect(()=>{
    const handleResize = () => {
      const pageHeight = window.innerHeight;
      setHeight(pageHeight)
    };
    // 监听窗口大小改变事件
    window.addEventListener('resize', handleResize);

    // 组件卸载时移除事件监听器
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  },[height])

  const transformScroll = useMemo(()=>{
    return `-${height * index}px`
  },[height, index])

  const goScroll = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      if (index < 3) {
        setIndex(prevIndex => prevIndex + 1);
      }else{
        setIndex(0)
      }
    } else {
      if (index > 0) {
        setIndex(prevIndex => prevIndex - 1);
      } else{
        setIndex(3)
      }
    }
  };

  const handleClick = () => {
    setIndex(1)
  }

  const handleMouseWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    setIsCloseTransition(false)
    if(canRun) {
      setCanRun(false)
      goScroll(e)
      setTimeout(() => {
        setCanRun(true)
      }, 500)
    }
  }

  return (
    <div className={styles.swiper}>
      {/*侧边栏*/}
      <div className={styles.buttonList}>
            {
              carousel.map((item,i) => {
                return (
                  <button className={index === i ? styles.imageNohoverButton : styles.imageButton} onClick={()=>setIndex(i)} key={i}>
                    <span className={styles.buttonFont}>{item}</span>
                  </button>
                )
              })
            }
          </div>
      <div
        ref={elementRef}
        className={`${styles.innerBox} ${isCloseTransition ? styles.activeTransition : ''}`}
        onWheel={handleMouseWheel}
      >
        <div className={styles.backgroundOne} style={{height:`${height}px`}}>
          <VideoBox
            mp4Url={videoMp4}
            webmUrl={videoWebm}
            fit={"cover"}
            style={
              {height:'100%'}
            }
          />
          <div className={styles.description}>
            <div>
              <Image src={logo} alt={'关闭'}/>
            </div>
            <div className={styles.descriptionText}>
              <span className={styles.textBig}>完蛋！我也能追到美女</span>
              <span className={styles.textSmall}>与一位让你心动的女孩展开一场真实的恋爱之旅,</span>
              <span className={styles.textSmall}>你将体验到真正的爱情纠葛与的挣扎！快来做出你的决定吧！</span>
            </div>
          </div>
          <div className={styles.Immediately}>
            <button className={styles.ImmediatelyButton} onClick={handleClick}></button>
            <button className={styles.ImmediatelyScroll} onClick={handleClick}></button>
          </div>
        </div>
        <div className={styles.backgroundTwo} style={{height:`${height}px`}}>
          <div className={styles.left}>
            <div className={styles.textBig}>她的礼物</div>
            <div className={styles.textMiddle}>完蛋！我也能追到美女了！ 国区激活码CDkey</div>
            <div className={styles.carousel}>
              <Image src={left_button} alt={""} width={42} height={64}
                     className={styles.leftButton}
                     onClick={()=>handleSecondClick("left")}
              />
              <Image
                src={secondCarousel[secondIndex]}
                alt={""}
                className={styles.carouselItem}
              />
              <Image src={right_button} alt={""} width={42} height={64}
                     className={styles.rightButton}
                     onClick={()=>handleSecondClick("right")}
              />
            </div>
            <div className={styles.tabBox}>
              {
                secondCarousel.map((item,index) => {
                  return (
                    <Image
                      src={item}
                      alt={""}
                      className={secondIndex === index ? styles.tabItemActive : styles.tabItem}
                      onClick={()=>setSecondIndex(index)}
                      key={index}
                    />
                  )
                })
              }
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.time}>
              <span style={{minWidth:'60px',whiteSpace:'nowrap'}}>限时立减</span>
              <span className={styles.onSale}>10</span>
              <span style={{minWidth:'60px',whiteSpace:'nowrap'}}>元仅剩：</span>
              <div className={styles.boxText}>{remainingTime.days}</div>天
              <div className={styles.boxText}>{remainingTime.hours}</div>
              <span style={{minWidth:'30px',display:'inline-block'}}>小时</span>
              <div className={styles.boxText}>{remainingTime.minutes}</div>分
            </div>
            <div className={styles.introduce}>
              <div>
                <Image src={explanation} alt={""}/>
              </div>
              玩家将在游戏中化身男主角，用第一视角沉浸式与一位让你心动的女孩展开一场真实
              的恋爱之旅。 在游戏的过程中，你将体验到真正的爱情纠葛与人性的挣扎！每一个问
              题的解决都需要你的智慧和勇气，快来做出你的决定吧！
            </div>
            <div className={styles.introduce}>
              <div>
                <Image src={introduction} alt={""}/>
              </div>
              <div>1.支付成功后24小时内发货，在订单页面获取CDKey。</div>
              <div>2.到steam平台直接使用CDkey兑换下载游戏，有任何问题可在（9:00-18:00）咨询电话客服。</div>
              <div>3.售后政策：因数字商品的特殊性，商品一经发货不支持退货退款。</div>
            </div>
            <div className={styles.price}>
              <Image src={buy} alt={""} className={styles.priceImg}/>
              <div className={styles.priceContainer}>
                <div className={styles.priceText}>
                  到手价：
                  <span className={styles.originalPrice}>￥32</span>
                  <span className={styles.discountPrice}>￥42</span>
                </div>
                <div className={styles.quantity}>
                  已售{counter}
                </div>
              </div>
            </div>
            <div className={styles.buy} onClick={handleBuy}>
              <Image src={buy_button} alt={""}/>
            </div>
          </div>
        </div>
        <div className={styles.backgroundThree} style={{height:`${height}px`}}>
          <div className={styles.top}>
            <Image src={story} alt={""}/>
          </div>
          <div className={styles.bottom}>
            {
              thirdIndex.map((item,index) => {
                return (
                  <div className={styles.bottomImage} key={`third-${index}`}>
                    <Image src={item.state ? item.image : item.maskImage} alt={""} className={styles.bottomItem}
                           onMouseEnter={()=>handleMouseEnter(index)}
                           onMouseLeave={()=>handleMouseLeave()}
                    />
                    {
                      !item.state && <Image src={lock} alt={""} className={styles.lock}/>
                    }
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className={styles.backgroundFour} style={{height:`${height}px`}}>
          <div className={styles.topLeft}>
            <Image src={spark_studio} alt={""} width={95} height={95}/>
          </div>
          <Image src={big_logo} alt={""} width={680} height={425} className={styles.top}/>
          <div className={styles.bottom}>
            <Image src={pane_left} alt={""} width={310} height={340}/>
            <div className={styles.bottomLeft}>
              <Image src={qq} alt={""}  width={190} height={190}/>
              <div className={styles.bottomText}>QQ扫码进群</div>
            </div>
            <Image src={pane_right} alt={""} width={310} height={340}/>
            <div className={styles.bottomRight}>
              <Image src={weixin} alt={""}  width={190} height={190}/>
              <div className={styles.bottomText}>微信扫码进群</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  //获取查询字符串参数
  const channel = getChannel(context);
  const data = await postCounter({
    type: 1,
    method: 'get'
  })
  const count = data.data.counter
  return {
    props: {
      count,
      hydrationData: {
        initConfigStore: {
          channel,
        },
      },
    },
  };
};

export default Wd;

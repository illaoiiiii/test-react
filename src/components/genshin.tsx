import {LegacyRef, useEffect, useMemo, useRef, useState} from "react";
import {useWindowSize} from "react-use";
import './genshin.scss'

function Genshin() {
    const ysImage = [
        {
            backgroundImage: 'https://ys.mihoyo.com/main/_nuxt/img/5c125a1.png',
        },
        {
            backgroundImage: 'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921550320292.jpg',
        },
        {
            backgroundImage: 'https://uploadstatic.mihoyo.com/contentweb/20200319/2020031921552395638.jpg',
        },
        {
            backgroundImage: 'https://uploadstatic.mihoyo.com/contentweb/20210719/2021071918001232800.jpg',
        },
        {
            backgroundImage:
                'https://webstatic.mihoyo.com/upload/contentweb/2022/08/15/8969f683b92839ac427c875d0d742be2_4825576482548821743.jpg',
        },
        {
            backgroundImage:
                'https://act-webstatic.mihoyo.com/upload/contentweb/hk4e/721a74c43614d7aeb25b046cabfb57be_2012964858524199390.jpg',
        },
    ]
    const asideData = [
        {
            title: '首页',
        },
        {
            title: '蒙德',
        },
        {
            title: '璃月',
        },
        {
            title: '稻妻',
        },
        {
            title: '须弥',
        },
        {
            title: '枫丹',
        },
    ]

    const elementRef = useRef<HTMLDivElement>(null);
    const {height} = useWindowSize()
    const [isCloseTransition, setIsCloseTransition] = useState(false);
    const [canRun, setCanRun] = useState(true);
    const [index, setIndex] = useState(0);

    useEffect(() => {
        if (elementRef.current) {
            elementRef.current.style.top = transformScroll;
        }
    },[height, index]);

    const windowHeight = useMemo(() => {
        setIsCloseTransition(true)
        return height
    },[height])

    const transformScroll = useMemo(()=>{
        return `-${windowHeight * index}px`
    },[windowHeight, index])

    const goScroll = (e: React.WheelEvent<HTMLDivElement>) => {
        if (e.deltaY > 0) {
            if (index < ysImage.length - 1) {
                setIndex(prevIndex => prevIndex + 1);
            }else{
                setIndex(0)
            }
        } else {
            if (index > 0) {
                setIndex(prevIndex => prevIndex - 1);
            } else{
                setIndex(ysImage.length - 1)
            }
        }
    };

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

    const changeBackground = (selectedIndex: number) => {
        setIsCloseTransition(false);
        setIndex(selectedIndex);
    };

    return (
        <div className="outer-box">
            {/* 内层容器 */}
            <div
                ref={elementRef}
                className={`inner-box ${isCloseTransition ? 'activeTranstion' : ''}`}
                onWheel={handleMouseWheel}
            >
                {ysImage.map((item, i) => (
                    <div
                        key={i}
                        style={{ backgroundImage: `url(${item.backgroundImage})`, height: `${windowHeight}px` }}
                        className={`scroll-element`}
                    ></div>
                ))}
            </div>
            {/* 指示器 */}
            <ul className="aside">
                {asideData.map((item, i) => (
                    <li key={i} onClick={() => changeBackground(i)}>
                        <span className={i === index ? 'active' : ''}></span>
                        <div className={`show-dec`}>{item.title}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Genshin;
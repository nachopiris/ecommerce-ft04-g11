import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';
import config from '../config';
import s from '../styles/homePage.module.scss';
import  TextyAnim from 'rc-texty';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import {useSpring, animated} from 'react-spring';
import AliceCarousel from 'react-alice-carousel';
import { CgShoppingCart } from 'react-icons/cg';

const APP_NAME = config.app.name;

function TextIntro() {
    const props = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1,
        },

        delay:200,

        config:{
            duration: 800
        }
    })
    return (
        <animated.p style={props}>
            <em>"Soy lo que los dioses han hecho de mi"</em> - Kratos
        </animated.p>
    )
}

function ShowAppName() {
    const props = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: 1,
        },
        delay:100,
        config:{
            duration: 800
        }
    })
    return (
        <animated.h1 style={props}>
            {APP_NAME}
        </animated.h1>
    )
}

function ExploreButton() {
    const props = useSpring({
        from: {
            opacity: 0,
            transform: 'scale(0.5)'
        },
        to: {
            opacity: 1,
            transform: 'scale(1)'
        },

        delay: 500,
        config:{
            duration: 600
        }
    })
    return (
        <animated.div style={props}>
            <Link to="/catalogo" className={s['kewx'] + ' btn btn-danger shadow btn-lg'}>
                Catálogo completo
            </Link>
        </animated.div>
    );
}

function HomePage({}) {
    return (
        <Container fluid>
            <Row className={s['main-section'] + ' ' + s['section']}>
                <div className={s['cover-main']}>
                    <img src="https://images.hdqwalls.com/wallpapers/thanos-vs-kratos-jt.jpg"/>
                </div>
                <div className={s['main-inside']}>
                    <ShowAppName />
                    <TextIntro />
                    <ExploreButton />
                </div>
            </Row>

            <Gallery />
            
        </Container>
    );
}


function Gallery()
{
    const handleOnDragStart = (e) => e.preventDefault();

    useEffect(()=>{

    },[])

    return(
        <Row className={s['section2']}>
            <AliceCarousel
                mouseTrackingEnabled
                mouseDragEnabled
                infinite={false}
                responsive={{0: {items: 2},500:{items: 3},1024:{tems: 6}}}
                dotsDisabled
                buttonsDisabled
                > 
                <div onDragStart={handleOnDragStart} className={'text-decoration-none text-light ' + s['carousel-item']}>
                    <div className={s['cover-carousel']} >
                        <img src="https://wallpaperaccess.com/full/7445.jpg" className={s['perspective']} />
                    </div>
                    <span className="mb-4 mt-auto">
                        Titulo del game quesey
                    </span>
                    <span className="mt-auto mb-4"><Button variant="light"><CgShoppingCart /></Button> <Button variant="outline-light">Detalles</Button></span>
                </div>
                <div onDragStart={handleOnDragStart} className={'text-decoration-none text-light ' + s['carousel-item']}>
                    <div className={s['cover-carousel']} >
                        <img src="https://i.pinimg.com/originals/ba/4d/80/ba4d801db37ad7ba4d455d742d46e680.jpg" className={s['perspective']} />
                    </div>
                    <span className="mb-4 mt-auto">
                        Titulo del game quesey
                    </span>
                    <span className="mt-auto mb-4"><Button variant="light"><CgShoppingCart /></Button> <Button variant="outline-light">Detalles</Button></span>
                </div>
                <div onDragStart={handleOnDragStart} className={'text-decoration-none text-light ' + s['carousel-item']}>
                    <div className={s['cover-carousel']} >
                        <img src="https://images.wallpapersden.com/image/download/teppen-game_67864_3841x2161.jpg" className={s['perspective']} />
                    </div>
                    <span className="mb-4 mt-auto">
                        Titulo del game quesey
                    </span>
                    <span className="mt-auto mb-4"><Button variant="light"><CgShoppingCart /></Button> <Button variant="outline-light">Detalles</Button></span>
                </div>
                <div onDragStart={handleOnDragStart} className={'text-decoration-none text-light ' + s['carousel-item']}>
                    <div className={s['cover-carousel']} >
                        <img src="https://www.10wallpaper.com/wallpaper/1440x900/1204/God_of_war_HD_Game_Wallpaper_11_1440x900.jpg" className={s['perspective']} />
                    </div>
                    <span className="mb-4 mt-auto">
                        Titulo del game quesey
                    </span>
                    <span className="mt-auto mb-4"><Button variant="light"><CgShoppingCart /></Button> <Button variant="outline-light">Detalles</Button></span>
                </div>
                <div onDragStart={handleOnDragStart} className={'text-decoration-none text-light ' + s['carousel-item']}>
                    <div className={s['cover-carousel']} >
                        <img src="https://www.fondoshd.mx/descargar.php?id=2576&resolucion=1440x900" className={s['perspective']} />
                    </div>
                    <span className="mb-4 mt-auto">
                        Titulo del game quesey
                    </span>
                    <span className="mt-auto mb-4"><Button variant="light"><CgShoppingCart /></Button> <Button variant="outline-light">Detalles</Button></span>
                </div>
                <div onDragStart={handleOnDragStart} className={'text-decoration-none text-light ' + s['carousel-item']}>
                    <div className={s['cover-carousel']} >
                        <img src="https://wallpaperstock.net/wallpapers/thumbs1/20924wide.jpg" className={s['perspective']} />
                    </div>
                    <span className="mb-4 mt-auto">
                        Titulo del game quesey
                    </span>
                    <span className="mt-auto mb-4"><Button variant="light"><CgShoppingCart /></Button> <Button variant="outline-light">Detalles</Button></span>
                </div>
                <div onDragStart={handleOnDragStart} className={'text-decoration-none text-light ' + s['carousel-item']}>
                    <div className={s['cover-carousel']} >
                        <img src="https://www.freegreatpicture.com/files/photo102/50881-game-wallpaper.jpg" className={s['perspective']} />
                    </div>
                    <span className="mb-4 mt-auto">
                        Titulo del game quesey
                    </span>
                    <span className="mt-auto mb-4"><Button variant="light"><CgShoppingCart /></Button> <Button variant="outline-light">Detalles</Button></span>
                </div>
                <div onDragStart={handleOnDragStart} className={'text-decoration-none text-light ' + s['carousel-item']}>
                    <div className={s['cover-carousel']} >
                        <img src="https://cdn.guidingtech.com/imager/assets/2020/05/898612/Best-Assassins-Creed-Valhalla-HD-and-4K-Wallpapers-8_4d470f76dc99e18ad75087b1b8410ea9.jpg?1588512644" className={s['perspective']} />
                    </div>
                    <span className="mb-4 mt-auto">
                        Titulo del game quesey
                    </span>
                    <span className="mt-auto mb-4"><Button variant="light"><CgShoppingCart /></Button> <Button variant="outline-light">Detalles</Button></span>
                </div>
                <div className={s['carousel-item']}>

                    <p className="mb-0">
                        <h2 className={s['kewx']}>Explorá</h2>
                    </p>
                    <p className={s.kewx}>
                        Mirá nuestro catálogo completo!
                    </p>
                    <Link to="/catalogo" className={s['kewx']+" px-5 btn btn-outline-danger mb-4 btn-lg"}>Ver todos</Link>
                </div>
            </AliceCarousel>
        </Row>
    );
}


export default HomePage;
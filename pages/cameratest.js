import React, {useEffect, useRef, useState} from 'react';
import {Button, Nav, NavItem, NavLink} from 'reactstrap';

const getWebcam = (callback) => {
    try {
        const constraints = {
            'video': true,
            'audio': false
        }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(callback);
    } catch (err) {
        console.log(err);
        return undefined;
    }
}

const Styles = {
    Video: {
        width: '30vw',
        background: 'rgba(245, 240, 215, 0.5)',
        border: '1px solid green',
        zIndex: 1,
        position: 'absolute'
    },
    Canvas: {
        width: '30vw',
        border: '1px solid green',
        // background: 'rgba(245, 240, 215, 0.5)',
        zIndex: 2,
        position: 'absolute',
        // background: `url(/img/rabbit.png)`
    },
    None: {display: 'none'},
}

function WebcamCanvas() {
    const [timer, setTimer] = useState(undefined);

    const videoRef = useRef(null);
    const canvasRef = useRef(null);

    useEffect(() => {
        getWebcam((stream => {
            videoRef.current.srcObject = stream;
        }));
        const t = setTimeout(() => drawToCanvas(),1000);
        // const t = setInterval(() => drawToCanvas(), 0.01);
        setTimer(t);
    }, []);

    const drawToCanvas = () => {
        try {
            const ctx = canvasRef.current.getContext('2d');

            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;

            if (ctx) {
                if (videoRef.current) {
                    ctx.translate(canvasRef.current.width, 0);
                    ctx.scale(-1, 1);
                    // ctx.drawImage("../pages/img/rabbit.png", 0, 0,canvasRef.current.width, canvasRef.current.height);
                    // ctx.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                }
                // ctx.fillStyle = "white ";
                // ctx.fillRect(10, 10, 100, 50);
                ctx.font = "15px Arial";
                ctx.fillStyle = "green";
                ctx.fillText("권진용", 15, 30);
                const background = new Image()
                background.src = "rabbit.png"
                background.onload = function () {
                    ctx.drawImage(background, 0, 0, canvasRef.current.width, canvasRef.current.height);
                }
            }
        } catch (err) {
            console.log(err);
        }
    }

    return (<>
        <div style={{width: '100vw', height: '100vh', padding: '3em'}}>
            <video ref={videoRef} autoPlay style={Styles.Video}/>
            <canvas ref={canvasRef} style={Styles.Canvas}/>
        </div>
        <hr/>
    </>);
}

export default WebcamCanvas;
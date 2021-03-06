import './About.css'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { range } from 'lodash'
import { useRef, useState } from 'react'


const Star = ({ x, y, z, colors, size }) => {

    const star = useRef()

    useFrame((state) => {
        star.current.position.x += 0.1
        star.current.position.y += 0.1
    })

    return (
        <mesh
            ref={star}
            position={[x, y, z]}
        >
            <sphereBufferGeometry args={[size, 32, 32]} />
            <meshBasicMaterial color={colors[Math.floor(Math.random() * colors.length)]} />
        </mesh>
    )
}


const About = () => {
    const [colors] = useState(['red', 'green', 'purple', 'lightblue', 'orange', 'yellow', 'white', 0x91171F, 0xA3C3D9, 0x5C6D70, 0xDDCECD, 0x311847])

    return (
        <div className='AboutPageParent'>
            <div className='AboutPageCont'>
                <div className='AboutName'>Noah Carmichael-Hitsman</div>
                <div className='AboutLink' onClick={() => {
                    window.open('https://github.com/NCHitsman')
                }}>Github</div>
                <div className='AboutLink' onClick={() => {
                    window.open('https://www.linkedin.com/in/noah-carmichael-hitsman-b024a1203/')
                }}>LinkedIn</div>
            </div>
            <Canvas
                className='AboutCanvas'
                style={{ backgroundColor: 'black' }}
                camera={{
                    fov: 75,
                    near: 0.1,
                    far: 20000,
                    position: [50, 50, 0],
                }}
            >
                <ambientLight />
                <OrbitControls />
                {/* <mesh>
                    <boxBufferGeometry args={[2000, 2000, 2000]} />
                    <meshBasicMaterial wireframe={true} />
                </mesh> */}
                {range(2000).map((a, i) => {
                    let size = (Math.random() * 2) + 1
                    let x;
                    let y;
                    let z;

                    let randX = Math.random() * 1000;
                    let randXtwo = Math.random();
                    if (randXtwo > .5) {
                        x = randX;
                    } else {
                        x = -(randX);
                    }

                    let randY = Math.random() * 1000;
                    let randYtwo = Math.random();
                    if (randYtwo > .5) {
                        y = randY;
                    } else {
                        y = -(randY);
                    }

                    let randZ = Math.random() * 1000;
                    let randZtwo = Math.random();
                    if (randZtwo > .5) {
                        z = randZ;
                    } else {
                        z = -(randZ);
                    }

                    return (
                        <Star key={i} x={x} y={y} z={z} colors={colors} size={size} />
                    )
                })}
            </Canvas>
        </div>
    )
}

export default About

import './Home.css'
import {useDispatch} from 'react-redux'
import { useEffect } from 'react'
import {getSystem} from '../../store/systems'
import { getMap } from '../../store/maps'
// import { useSelector } from 'react-redux'

export default function Home({user}) {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(getSystem(user.id))
        dispatch(getMap(1))
    }, [dispatch, user.id])

    // const systems = useSelector()

    return (
        <>
            <div>Yo</div>
        </>
    )
}

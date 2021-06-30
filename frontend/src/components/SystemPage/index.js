import { useEffect } from "react"
import { useParams } from "react-router-dom"
import {connect, useDispatch, useSelector} from 'react-redux'
import { getSystem } from "../../store/systems"
import { getSystemMaps } from "../../store/maps"
import MapCard from "./MapCard"

const SystemPage = ({user, maps}) => {
    const {systemId} = useParams()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSystem(systemId))
        dispatch(getSystemMaps(systemId))
    }, [dispatch, systemId])

    let currentSystem = useSelector(state=>state.systems.system)
    let systemMaps = useSelector(state=>state.maps.systemMaps)

    return (
        <>
            {systemMaps && currentSystem ?
            <div className='systemCard__cont'>
                <div className='systemCard__cont__title'>
                    Worlds in {currentSystem?.name}:
                </div>

            {Object.values(systemMaps).map((map, i) => (
                <MapCard key={i} map={map} />
            ))}
            </div>
            :
            <div>Loading...</div>
            }
        </>
    )
}

export default connect(state=>({maps:state.maps}))(SystemPage)
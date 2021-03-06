

import { csrfFetch } from "./csrf"


const GET_MAP = 'map/GET_MAP'
const USER_MAPS = 'map/USER_MAPS'
const CLEAR = 'map/CLEAR'

const getAMap = (map) => ({
    type: GET_MAP,
    payload: map
})

const systemMaps = (maps) => ({
    type: USER_MAPS,
    payload: maps
})

const clear = () => ({
    type: CLEAR
})


export const getMap = (mapId) => async dispatch => {
    const res = await csrfFetch(`/api/maps/${mapId}`).catch((rej) => rej.ok)
    if (!res) return null
    const data = await res.json()
    if (!data) return null
    dispatch(getAMap(data))
    return res
}

export const getSystemMaps = (systemId) => async dispatch => {
    const res = await csrfFetch(`/api/maps/system/${systemId}`)
    const data = await res.json()
    dispatch(systemMaps(data))
    return res
}

export const clearMaps = () => async dispatch => {
    dispatch(clear())
}

export const createMap = (name, type, system_id, size, seed) => async dispatch => {
    const res = await csrfFetch(`/api/maps/createMap`, {
        method: 'POST',
        body: JSON.stringify({
            name,
            type,
            system_id,
            size,
            map_seed: seed,
        })
    })
    const data = await res.json()
    return data
}

export const removeMap = (mapId) => async dispatch => {
    const res = await csrfFetch(`/api/maps/removeMap/${mapId}`, { method: 'DELETE' })
    return res
}

export const saveMapChanges = (mapId, mapSeed) => async dispatch => {
    const res = await csrfFetch(`/api/maps/update/${mapId}`, {
        method: 'PATCH',
        body: JSON.stringify(mapSeed)
    })
    const data = await res.json()
    dispatch(getAMap(data))
    return res
}


const mapReducer = (state = {}, action) => {
    let newState = { ...state };

    switch (action.type) {
        case (GET_MAP):
            newState.map = action.payload
            return newState
        case (USER_MAPS):
            newState.systemMaps = {}
            action.payload.forEach(map => {
                newState.systemMaps[map.id] = map
            })
            return newState
        case (CLEAR):
            newState = {}
            return newState
        default:
            return state
    }
}


export default mapReducer

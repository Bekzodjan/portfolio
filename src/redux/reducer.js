import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'video',
    initialState: {
        isOpen: false,
        isOpenInfo: false,
        inputs: [],
        videos: [],
        currentUser: {},
        loading: true
    },
    reducers: {
        getVideos: (state, action) => {
            state.videos = action.payload
            state.loading = false
        },
        changeLoading: (state, action) => {
            state.loading = !state.loading
            state.isOpen = !state.isOpen
        },
        deleteItm: (state, action) => {
            console.log(JSON.parse(JSON.stringify(state.inputs.splice(action.payload, 1))));
            console.log(action.payload);
        },
        changeModal: (state, action) => {
            state.isOpen = !state.isOpen
        },
        changeModalInfo: (state, action) => {
            state.isOpenInfo = !state.isOpenInfo
        },
        changeNameV: (state, action) => {
            state.inputs[action.payload.i].nameV =  action.payload.value
        },
        changeUrl: (state, action) => {
            state.inputs[action.payload.i] = {...state.inputs[action.payload.i], url: action.payload.value}
        },
        newInput: (state, action) => {
            state.inputs.push({
                nameV: '',
                url: ''
            })
        },
        openInfo: (state, action) => {
            state.currentUser = action.payload
            console.log(state.currentUser.videos);
            state.isOpenInfo = !state.isOpenInfo
        },
    }
})

////////////////////////////////////
export const actions = {...slice.actions, get, myS, deleteItmCard}
////////////////////////////////////

//////////// function //////////////
function get(){
    return {
        type: 'apicall',
        payload: {
            url: 'videos',
            method: 'get',
            onSuccess: actions.getVideos
        }
    }
}
function myS(data) {
    console.log(data);
    return {
        type: 'apicall',
        payload: {
            url: 'videos',
            method: 'post',
            data: {name: data.data.name, videos: data.videos},
            onSuccess: {get, load: actions.changeLoading}
        }
    }
}
function deleteItmCard(id) {
    return {
        type: 'apicall',
        payload: {
            url: 'videos',
            method: 'delete',
            data: id,
            onSuccess: {get, load: actions.changeLoading}
        }
    }
}

////////////////////////////////////

export default slice

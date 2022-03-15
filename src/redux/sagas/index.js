import { put, call, takeEvery, fork } from 'redux-saga/effects'
import {SET_PEOPLE, SET_PLANETS} from "../reducers";

const swapiGet = async (pattern) => {
    const request = await fetch(`https://swapi.dev/api/${pattern}`);
    const data = await request.json();
    return data;

}

export function* loadPeople() {
    const people = yield call(swapiGet, 'people');
    console.log('people', people.results);
    yield put({type: SET_PEOPLE, payload: people.results});
}

export function* loadPlanets(){
    const planets = yield call(swapiGet, 'planets');
    console.log('planets', planets.results);
    yield put({type: SET_PLANETS, payload: planets.results});
}

export function* workerSaga(){
    yield fork(loadPeople)
    yield fork(loadPlanets)
}

export function* loadDataWatcherSaga(){

    yield takeEvery('LOAD_DATA', workerSaga);

};

export default function* rootSaga(){
    yield loadDataWatcherSaga();
}
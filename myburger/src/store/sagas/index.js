import { takeEvery, all,} from 'redux-saga/effects';

import * as actiontTypes from '../actions/actionTypes'
import { 
    logoutSaga, 
    checkAuthTimeoutSaga,
    authUserSaga,
    authCheckStateSaga ,
} from './auth';

import {
    initIngredientsSaga
}from './burgerBuilder'

import {
    purchaseBurgerSaga, 
    fetchOrdersSaga
}from './order'

export function* watchAuth(){
    yield all ([
        takeEvery(actiontTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
        takeEvery(actiontTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
        takeEvery(actiontTypes.AUTH_USER, authUserSaga),
        takeEvery(actiontTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    ])
}

export function* watchBurgerBuilder(){
    yield takeEvery(actiontTypes.INIT_INGREDIENTS, initIngredientsSaga);
}

export function* watchOrder(){
    yield all ([
        takeEvery(actiontTypes.PURCHASE_BURGER, purchaseBurgerSaga),
        takeEvery(actiontTypes.FETCH_ORDERS, fetchOrdersSaga)
    ])
}
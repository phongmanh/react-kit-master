import 'whatwg-fetch'
import { delay } from 'redux-saga'
import { call, put, takeEvery, all, take, fork, takeLatest, select, race } from 'redux-saga/effects';
var Config = require('Config')


export function fetch_Data(type, url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        contentType: 'json'
    })
}

function* FetchData() {
    try {
        // const [DevData, AppData] = yield all([
        //     call(ajax_Request, "LOAD_DEV", DevSetting_Url),
        //     call(ajax_Request, "LOAD_APP", AppId_Url)
        // ])
        // yield all([
        //     put({ type: "LOAD_DEV", data: DevData }),
        //     //put({ type: "LOAD_APP", data: AppData })
        // ])

        let devData = null;
        try {
            const res1 = yield call(fetch_Data, "LOAD_DEV", "");
            if (res1.ok) {
                 devData = yield res1.json();
                console.log("Dev Data", devData);
                //yield put({ type: "LOAD_DEV", data: devData })
            } else {
                console.log("34234234   ")
            }
        } catch (error) {
            console.log(error)
        }
        let appData = null;
        const res = yield call(fetch_Data, "LOAD_APP", "")
        if (res.ok) {
             appData = yield res.json();
            console.log("App Data: ", appData);
            //yield put({ type: "LOAD_APP", data: appData })

        } else {
            console.log("34234234   ")
        }
        yield all([
            put({ type: "LOAD_DEV", data: devData }),
            put({ type: "LOAD_APP", data: appData })
        ])
    } catch (error) {
        //yield put({ type: "ERROR", error })
        console.log("Error :", error)

    }

}



function* watchFetchAPI() {

    // Using Same Action name for dispatch and  watch function
    // const action = yield take("INIT_DATA")
    // yield call(FetchData)
    yield takeEvery("INIT_DATA", FetchData)
    // Using difference Action name for dispatch and watch function
    // yield takeEvery("LOAD_APP_DATA", FetchData1)
    // yield takeEvery("LOAD_DEV_DATA", FetchData2)

}

function* watchAndLog() {
    while (true) {
        const action = yield take('*')
        const state = yield select()
        console.log('action', action)
        console.log('state after', state)
    }
}

export function* helloSaga() {
    console.log('Hello Sagas!', Config.serverUrl);
}


export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchAndLog()
    ])
}
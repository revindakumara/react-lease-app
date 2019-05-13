import { GET_ALL_LEASES, GET_MORE_INFO } from '../constants/actionTypes'
import axios from "axios";


const API_URL = "https://hiring-task-api.herokuapp.com/v1"

export function getAllLeases() {

    return function (dispatch) {
        const response = axios
            .get(
                `${API_URL}/leases`
            )
            .then(response => {

                dispatch({
                    type: GET_ALL_LEASES,
                    payload: response.data,
                })


            });
    }
}


export function getMoreDetails(id) {

    return function (dispatch) {
        const response = axios
            .get(
                `${API_URL}/leases/${id}`
            )
            .then(response => {

                dispatch({
                    type: GET_MORE_INFO,
                    payload: response.data,
                })


            });
    }
}
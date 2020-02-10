import { reject } from "q";
import axios from 'axios';

export function PostData(type, userData){

    let BaseUrl = 'http://localhost:8080/secured/';

    return new Promise((resolve,reject) =>{
        fetch(BaseUrl+type,{
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-Type': 'application/json'
            }
        })
        .then((response) => localStorage.setItem('user-jwt', response.json()))
        .then((responseJson) => {
            resolve(responseJson)
        })
        .catch((error) => {
            reject(error);
        });
    });

}
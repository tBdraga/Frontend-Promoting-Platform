import { reject } from "q";

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
        .then((response) => response.json())
        .then((responseJson) => {
            resolve(responseJson)
        })
        .catch((error) => {
            reject(error);
        });
    });

}
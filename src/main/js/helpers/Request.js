import xhr from 'superagent'

/**
 * Ex:
 * Request.post('/users', user).then(data => console.log(data))
 */
class Request {
    static get = url => promise("GET", url)
    static post = (url, data) => promise("POST", url, data)
    static put = (url, data) => promise("PUT", url, data)
    static delete = url => promise("DELETE", url)
}

function promise(method, url, data){
    return new Promise((resolve, reject) => {
        let request = xhr(method, url);

        if(data){
            // Content-Type: application/json é automatico
            request.send(data);
        }

        request.end((err, res) => {
            if(err){
                reject(err);
            } else {
                resolve(res.body);
            }
        })
    });
}

export default Request

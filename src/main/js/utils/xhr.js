import $ from 'jquery'
import xhrMock from './xhr-mock'

var xhr = {
    get(url, settings) {
        return new Promise(function (resolve, reject) {
            console.log("Requesting...", url);

            var completeSettings = Object.assign({}, settings, {
                url: url,
                type: 'GET',
                dataType: 'json',

                success(data) {
                    console.log("Response", data);
                    resolve(data);
                },

                error(xhr, status, err) {
                    reject(err);
                }
            });

            $.ajax(completeSettings);
        });
    }
};

// FIXME remover xhrMock
export default xhrMock
//export default xhr

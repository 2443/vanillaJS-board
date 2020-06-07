const module = {
    xhr: function ({
        path,
        method,
        data,
    }) {
        return new Promise((resolve, reject) => {
            const defaultUrl = 'http://localhost:3000/';;
            const xhr = new XMLHttpRequest();
            let url = defaultUrl + path;
            if (!this.isEmpty(data) && method === 'get') {
                url += '?' + this.jsonToQueryString(data);
            }
            xhr.open(method, url);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                }
            }

            if (!this.isEmpty(data) && ['post', 'delete', 'PATCH'].indexOf(method)) {
                xhr.setRequestHeader('Content-Type', 'application/json'); // 컨텐츠타입을 json으로
                xhr.send(JSON.stringify(data)); // 데이터를 stringify해서 보냄
            } else {
                xhr.send();
            }
        })
    },
    queryStringToJson: function (queryString) {
        const json = {}
        queryString.split('&').forEach(element => {
            const keyValue = element.split('=');
            json[keyValue[0]] = keyValue[1]
        });
        return json;
    },
    jsonToQueryString: json => {
        const querys = [];
        for (let [key, value] of Object.entries(json)) {
            querys.push(`${key}=${value}`);
        }
        return querys.join('&');
    },
    isEmpty: data => {
        for (let key in data) {
            if (key) {
                return false;
            }
        }
        return true;
    }
}

export default module
const assert = require('assert');
const axios = require('axios');


// it('double done detected', function (done) {
//     setImmediate(done);
// });

describe('group tests', function () {
    // this.timeout(0);

    it.only('equal test', function () {
        assert.strictEqual(1, 1);
    });

    it.only('return promise test', function() {
		return axios({
            url: 'http://dev.lateres.ru/app/index.php'
        }).then(response => {
            // console.log('response', response);
            assert.strictEqual(response.data, '');
        });
	});
});
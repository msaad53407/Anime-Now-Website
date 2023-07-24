let responseData = null;

function setResponseData(data) {
    responseData = data;
}

function getResponseData() {
    return responseData;
}

module.exports = { setResponseData, getResponseData };

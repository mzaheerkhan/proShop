//! CUSTOM ERROR HANDLER CLASS
class HttpError extends Error {
    constructor(message , errorCode){
        super(message); // add a "messge" property
        this.code = errorCode // adds a "code" property
    }
}


export default HttpError
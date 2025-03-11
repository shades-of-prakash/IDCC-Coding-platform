class AppResponse{
    constructor(statusCode,data,message="somethig went wrong"){
        this.statusCode=statusCode
        this.data=data
        this.message=message
        this.success = statusCode < 400
    }
}

export default AppResponse
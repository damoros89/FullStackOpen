const Notification = ({message,messageType}) => {
    if(messageType === "confirmation"){
        return(
        <div className="confirmation">
        {message}
        </div>)
    }
    else if(messageType==="error"){
        return (
            <div className="error">
                {message}
            </div>
        )
    }else{
        return(null)
    }

}

export default Notification;
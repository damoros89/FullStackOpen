import React from "react";

const Header = ({course}) => {
    console.log(course.name);
    
    return(
        <div>
            <h1>{course}</h1>
        </div> 
    )
}

export default Header
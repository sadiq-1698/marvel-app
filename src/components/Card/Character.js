import React from 'react';
import './styles.css';

const Character = (data) => {

    const imageURL = data.thumbnail.path + '/portrait_uncanny.jpg';

    if(imageURL.includes("image_not_available")){
        return (
            <>
            </>
        )
    }else{
        return (
            <div className="flip-card">
                <div className="flip-card-inner">
                    <div className="flip-card-front">
                            {(!imageURL.includes("image_not_available")) && 
                                <img src={imageURL} alt=""
                                onError={(e) => {
                                    e.target.src = 'https://i.pinimg.com/originals/24/92/00/249200c431fe811110761709b303fcaf.jpg';
                                }}/>
                            }
                    </div>
                    <div className="flip-card-back">
                        <h1>{data.name}</h1>
                    </div>
                </div>
            </div>


        );
    }
}

export default  Character;
import React from 'react'

export default function Option(props){

    function submit(){
        let colour
        if(props.correct === true&&props.state){
            return colour = '#94D7A2'
        }
        else if (props.held === true && props.correct === false && props.state){
            return colour = '#F8BCBC'
        }
        else if (props.held === false && props.correct === true && props.state){
            return colour =  '#94D7A2'
        }
        else if (props.state === false){
            return colour = '#D6DBF5'
        }
    }
   
return(
    <button className="option-box" onClick={!props.state ? props.holdOption : ''} style={{backgroundColor : props.held ? submit() : (props.correct && props.state? '#94D7A2' : '' )}}>{props.answer}</button>
)
}
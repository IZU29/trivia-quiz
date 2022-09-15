import React from "react";
import Option from './Option'
import { nanoid } from 'nanoid'
export default function Quiz(props) {
    const [state , setState] = React.useState(false)
    const [count , setCount] = React.useState(0)
    const [question, setQuestion] = React.useState(...Options())
   
    function Options() {
        const NewArr = [
            props.quiz.map(opt => ({
                question: opt.question,
                id: nanoid(),
                answer: [{ answer: opt.correct_answer, id: nanoid(), correct: true, held: false }, ...opt.incorrect_answers.map(inc => ({ answer: inc, id: nanoid(), correct: false, held: false }))].sort(() => 0.5 - Math.random())
            }))]
      
        return NewArr 
    }
    
   
   
    function holdOption(questionId , id) {
        setQuestion(prev => prev.map(
            (old) => {
                if(questionId === old.id){
                    return { ...old, answer: old.answer.map(
            (prev) => {
                
                if(id === prev.id){
                    return { ...prev, held: !prev.held }
                }
                else{
                    return  { ...prev, held: false }
                }
            }
             ) }
                }
            else{
                return { ...old, answer: old.answer.map(
                    (prev) => {
                        
                        if(id === prev.id){
                            return { ...prev, held: true }
                        }
                        else{
                            return  { ...prev, held:  prev.held }
                        }
        
                    })
            }
        }
            }
        ))
           
    }
    function Add(){
        setCount( prev => prev + 1)
    }
    function submit(){
        setState( prev => !prev)
    }


    const eachQuestion = question.map(prevQuestion => (
        <div className="question-box" key={prevQuestion.id}>
            <p>{prevQuestion.question}</p>
            <div className="options">{
            prevQuestion.answer.map((prev) => (<Option 
                holdOption = {() => holdOption(prevQuestion.id ,prev.id)}
                key={prev.id}
                answer={prev.answer}
                held={prev.held}
                state={state}
                correct = {prev.correct}
                add = {Add}
            />))}</div>
            <hr></hr>
        </div>
    )
    )
    return (
        
        <div className="quiz-box">
            {eachQuestion}
            {!state ? <button className="submit" onClick={() => submit()}>Submit</button> : `You have finished this Quiz`}
        </div>
        
    )
}

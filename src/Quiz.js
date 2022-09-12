import React from "react";
import { nanoid } from 'nanoid'
export default function Quiz(props) {
    const [question, setQuestion] = React.useState(...Options())
    // const [option , setOption] = React.useState(...Shuffle())
    function Options() {
        const NewArr = [
            props.quiz.map(opt => ({
                question: opt.question,
                id: nanoid(),
                answer: [{ answer: opt.correct_answer, id: nanoid(), correct: true, held: false }, ...opt.incorrect_answers.map(inc => ({ answer: inc, id: nanoid(), correct: false, held: false }))].sort(() => 0.5 - Math.random())
            }))]
        // NewArr.map(prev => prev.answer.sort( () => 0.5 - Math.random() ))
        return NewArr
    }
    console.log(Options())
    function Shuffle() {
        const Shuffle = [question.map(prev => prev.answer)]
        return Shuffle
    }
    // const optionShuff = option.map(pre => pre.map(old => (<button>{old.answer}</button>)))
    console.log(question)
    // const styles = setQuestion(pre => pre.map( old => old.answer.map(pre => ({
    //     backgroundColor : pre.held ? 'green' : ''

    //    }))))
    function holdOption(questionId , id) {
        setQuestion(prev =>
            { prev.map(
            old => 
            {
                ({ question: old.question, answer: old.answer.map(pre => pre.id === id ? { ...pre, held: !pre.held } : { ...pre, held: pre.held }) })}
        )})
        // const styles = {
        //     backgroundColor: setQuestion(prev => prev.map(old => old.answer.map(pre => pre.held ? '#D6DBF5' : '')))
        // }
        //    {...old,answer:[{answer:pre.answer , id: pre.id ,correct: pre.correct , held: !pre.held}]} : {...old,answer:[{answer:pre.answer , id: pre.id ,correct: pre.correct , held: false}]}
        //    id === pre.id ? {...pre,held: !pre.held} : {...pre,held : false}
    }

    const eachQuestion = question.map(prevQuestion => (
        <div className="question-box" key={prevQuestion.id}>
            <p>{prevQuestion.question}</p>
            <div className="options">{prevQuestion.answer.map(prev => (<button className="option-box" onClick={() => holdOption(prevQuestion.id ,prev.id)} key={prev.id}>{prev.answer}</button>))}</div>
            <hr></hr>
        </div>
    )
    )
    return (
        <div className="quiz-box">
            {eachQuestion}
            <button className="submit">Submit</button>
        </div>
    )
}

function Quote({text, author, r, g, b}){
    return(
        <div className="quote" style={{color:`rgb(${r},${g},${b})`}}>
            <div id="text">
                <i className="fa fa-quote-left"/>
                {text}
            </div>
            <div id="author">{author && <span>--</span>}{author}</div>
        </div>
    )
}

function Controls({text, setText, setAuthor, r, g, b, setR, setG, setB, rndColor}){
    function getQuote(){
        fetch("https://quotes15.p.rapidapi.com/quotes/random/", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "quotes15.p.rapidapi.com",
                "x-rapidapi-key": "47dc4b72ccmsh7d7e50ecf3726b3p1dd101jsnd29e0c39a99f"
            }
        })
        .then(res=>res.json())
        .then(data => {
            //console.log(data)
            setText(data.content)
            setAuthor(data.originator.name)
            setR(rndColor())
            setG(rndColor())
            setB(rndColor())
        })
        .catch(err => {
            console.error(err);
        });
    }
    function handleClick(){
        getQuote()
    }
    React.useEffect(()=>{
        getQuote()
    },[])
    return(
        <div className="controls">
            <div className="social">
                <a href="twitter.com/intent/tweet" id="tweet-quote"><i className="flex fab fa-twitter" style={{background:`rgb(${r},${g},${b})`}}></i></a>
                <a href="#"><i className="flex fab fa-tumblr" style={{background:`rgb(${r},${g},${b})`}}></i></a>
            </div>
            <button id="new-quote" onClick={handleClick} style={{background:`rgb(${r},${g},${b})`}}>new quote</button>
        </div>
    )
}

function App(){
    const [text, setText] = React.useState("")
    const [author, setAuthor] = React.useState("")
    const [r, setR] = React.useState("")
    const [g, setG] = React.useState(null)
    const [b, setB] = React.useState("")
    React.useEffect(()=>{
        setR(rndColor())
        setG(rndColor())
        setB(rndColor())
    },[])
    function rndColor(){
        return Math.floor(Math.random()*256)
    }
    return(
        <div className="flex wrapper" style={{background:`rgb(${r},${g},${b})`}}>
            <div id="quote-box" style={text? {display:"block"} : {display:"none"}}>
                <Quote text={text} author={author} r={r} g={g} b={b}/>
                <Controls setText={setText} setAuthor={setAuthor} r={r} g={g} b={b} setR={setR} setG={setG} setB={setB} rndColor={rndColor} text={text}/>
            </div>
            <div className="fa-3x" style={text? {display:"none"} : {display:"block"}}>
                <i className="fas fa-cog fa-spin"></i>
            </div>
        </div>
    )
}

ReactDOM.render(<App/>,document.getElementById("root"))
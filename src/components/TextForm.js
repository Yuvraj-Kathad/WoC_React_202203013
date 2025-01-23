import React, { useState } from 'react'
import PropTypes from 'prop-types'

export default function TextForm(props) {
  
  const [text, setText] = useState("");

  const handleUpClick=()=>{
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("Converted to Uppercase",'success')
  }
  const handleLoClick=()=>{
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("Converted to Lowercase",'success')
  }
  const handleClearClick = ()=>{
    setText('');
    props.showAlert("Text Cleared!",'success')
  }
  const handleCopy = ()=>{
    // var copytext = document.getElementById("myBox");
    // copytext.select();
    navigator.clipboard.writeText(text);
    // document.getSelection().removeAllRanges();
    props.showAlert("Copied to Clipboard!",'success')
  }
  const handleExtraSpaces = ()=>{
    let newText = text.split(/[ ]+/);
    setText(newText.join(" "));
    props.showAlert("Extra spaces removed!",'success')
  }
  const handleOnChange=(event)=>{
    setText(event.target.value)
  }

  return (
    <>
    <div className='container' style={{color: props.mode==='dark'?'white':'black'}}>
        <h2 className='mb-3'>{props.heading}</h2>
        <div className="mb-3">
            <textarea className="form-control" value={text} style={{backgroundColor: props.mode==='dark'?'#13466e':'white', color: props.mode==='dark'?'white':'black'}} onChange={handleOnChange} id="myBox" rows="6"></textarea>
        </div>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleUpClick} >Convert to UPPERCASE</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleLoClick} >Convert to lowercase</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleExtraSpaces} >Remove Extraa Spaces</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleCopy} >Copy Text</button>
        <button disabled={text.length===0} className="btn btn-primary mx-1 my-1" onClick={handleClearClick} >Clear</button>

    </div>

    <div className='container my-4' style={{color: props.mode==='dark'?'white':'black'}}>
      <h2>Your Text Summary</h2>
      <p>{text.length===0?'0':text.trim().split(/\s+/).length} words and {text.length} characters</p>
       {/* or  
      <p>{text.split(/\s+/).filter((elemment)=>{element.length!==0}).length} words and {text.length} characters</p> */}
      <p>{text.length===0?0: 0.008*text.trim().split(/\s+/).length} Minutes read</p>
      <h3>Preview</h3>
      <p>{text.length>0?text:"Preview will be displayed here!"}</p>
    </div>
    </>
  )
}

TextForm.propTypes = {
    heading: PropTypes.string,
    textArea: PropTypes.string
}

// TextForm.default = {
//     heading: 'Text Heading',
//     textArea: 'Text Area'
// }
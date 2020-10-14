import React, {useState, useEffect} from 'react';
import imgflip from '../api/imgflip.js'
import './meme.css'

const Meme = () => {

    const [meme, setMeme] = useState(null);
    const [texts,setTexts] = useState({});
    const [captionedMeme,setCaptionedMeme] = useState(null)
    var inputs = []

    const onInputChange = (e) => {
        e.preventDefault()
        setTexts({...texts,[e.target.name]: e.target.value})
        
    }

    const onSubmit = async() => {
        console.log(texts)
        setMeme(null)
        const textArray = Object.entries(texts)
        var str = ""
        for(let i = 0; i < textArray.length; i++) {
            str += textArray[i][0] + '=' + textArray[i][1] + '&'
        }
        console.log(str)
   
        let url = `/caption_image?template_id=${meme.id}&username={YOUR USERNAME}&password={YOUR PASSWORD}&${str}`
        const response = await imgflip.post(url)
        console.log(response.data.data)
        setCaptionedMeme(response.data.data)
    }
   
    useEffect(async () => {
        const response = await imgflip.get('./get_memes')
        let ind = Math.floor(Math.random() * 100) + 1 
        const memeResponse = response.data.data.memes[ind]
        console.log(memeResponse)
        setMeme(memeResponse)
        
    },[]);
    var display;
    var inputFields = [];
    if(meme) {
        for(let i = 0; i < meme.box_count; i++) {
            inputFields.push(
                <div className="ui large icon input ">
                    <input type="text" name={`text${i}`}  key={`input-${i}`} onChange={onInputChange} placeholder="Search large..." />
                    
                </div>
            )
        }

        
    }
    else {
        display = <div></div>
    }

    return (
        <div >
            { meme ?
            <div>
                <div className="input-fields">
                    { inputFields}

                    <button onClick={onSubmit} className="ui large primary button bttn">
                        Save
                    </button>
                </div>

                

                <img className="center" src={meme.url} />
            </div>:<div></div>}

            {captionedMeme ?
            <div>
                 <img className="center" src={captionedMeme.url} />
                </div>:<div></div>}
        </div>


    )
}

export default Meme;
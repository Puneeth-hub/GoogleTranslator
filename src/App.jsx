import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

export default function Translate() {
    const [inputText, setInputText] = useState('');
    const [detectLanguageKey, setdetectedLanguageKey] = useState('');
    const [selectedLanguageKey, setLanguageKey] = useState('')
    const [languagesList, setLanguagesList] = useState([])
    const [resultText, setResultText] = useState('');
    const getLanguageSource = () => {
        axios.post(`https://libretranslate.de/detect`, {
            q: inputText
        })
            .then((response) => {
                setdetectedLanguageKey(response.data[0].language)
            })
    }
    useEffect(() => {
        axios.get(`https://libretranslate.de/languages`)
            .then((response) => {
                setLanguagesList(response.data)
            })
    }, [])

    const languageKey = (selectedLanguage) => {
        setLanguageKey(selectedLanguage.target.value)
    }

    const translateText = () => {
        getLanguageSource();

        let data = {
            q : inputText,
            source: detectLanguageKey,
            target: selectedLanguageKey
        }
        axios.post(`https://libretranslate.de/translate`, data)
        .then((response) => {
            setResultText(response.data.translatedText)
        })
    }

    return (
        <div className='main-contianer'>
            <div className="app-header">
                <h2 className="header">Text Translator</h2>
            </div>

            <div className='app-body'>
                <div>
                    <div>
                        <textarea
                            role="7"
                            placeholder='Type Text to Translate..'
                            onChange={(e) => setInputText(e.target.value)}
                            className='textarea-line'
                        /><br/>

                        <select className="language-select" onChange={languageKey}>
                            <option>Please Select Language..</option>
                            {languagesList.map((language) => {
                                return (
                                    <option value={language.code}>
                                        {language.name}
                                    </option>
                                )
                            })}
                        </select><br/>

                        <textarea
                            rows="6"
                            placeholder='Your Result Translation..'
                            value={resultText}
                            className='textarea-line'
                        /><br/>

                        <button
                            className='buton'
                            onClick={translateText}
                        >
                            
                            Translate</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
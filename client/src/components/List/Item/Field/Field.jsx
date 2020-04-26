import React, { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import css from './field.module.css'
import { changeItemField } from '../../../../redux/actions';

const Field = ({ id, name, value, faName, faEyes, faLink }) => {
    const inputRef = useRef()
    const dispatch = useDispatch()
    const [stateboxShadow, setBoxShadow] = useState()

    const [form, setForm] = useState({ })
    const [firstValue, setFirstValue] = useState()
    const [isHover, setIsHover] = useState(false)
    const [iconEye, setIconEye] = useState(false)
    const handleInputChange = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    }
    const handleFocusInput = event => {
        if(event.target) {
            setFirstValue(event.target.value)
        } else {
            setFirstValue(event.value)
        }
    }
    const handleSaveData = (event) => {
        const key = Object.keys(form)[0]
        const value = form[key]
        if(event.target.value !== firstValue) {
            dispatch(changeItemField(id, key, value))
        }
    }
    const handleMouseOver = () => {
        if(name === "password" || name === "link") {
            setIsHover(true)
        }
        setBoxShadow({boxShadow: "inset 0px 1px 3px 0px rgba(0, 0, 0, 0.08)"})
    }
    const hanldeMouseLeave = () => {
        if(name === "password" || name === "link") {
            setIsHover(false)
        }
        setBoxShadow(null)
    }
    const handleIconClick = () => {
        if(name === "password") {
            handleShowPas()
        } else {
            handleOpenLink(name)
        }
    }
    const handleShowPas = () => {
        if(name === "password" && iconEye) {
            setIconEye(false)
            inputRef.current.type = "text"
        } else {
            setIconEye(true)
            inputRef.current.type = "password"
        }
    }
    const handleOpenLink = () => {
        window.open(value, "_blank")
    }
    const handleIcon = () => {
        if (name === "password") {
            return iconEye ? faEyes[0] : faEyes[1]
        } else if(name === "link") {
            return faLink
        }
    }

    
    const handleEnter= event => {
        if (event.keyCode === 13) {
            const parLi = event.target.parentElement
            const nextLi = parLi.nextSibling
            if(nextLi) {
                const nextInpt = nextLi.lastElementChild
                hanldeMouseLeave()
                handleSaveData(event)
                event.target.blur()
                nextInpt.click()
                nextInpt.focus()
            } else {
                hanldeMouseLeave()
                handleSaveData(event)
                event.target.blur()
            }
        }
    }

    return (
        <li 
            className={css.editField + " list-group-item"}
            onMouseOver={handleMouseOver} 
            onMouseLeave={hanldeMouseLeave}
            style={stateboxShadow}
            onClick={() => stateboxShadow && inputRef.current.click()}
            onKeyDown={handleEnter}
        >
            <FontAwesomeIcon icon={faName} className="mr-2" />
            <input
                className={css.editInput}
                type={name}
                name={name}
                defaultValue={value}
                placeholder={`Your ${name}`}
                onClick={( (e) => e.target.select())}
                onChange={handleInputChange}
                onBlur={handleSaveData}
                onFocus={handleFocusInput}
                ref={inputRef}
                autoComplete="off"
                
            />
            {isHover && value &&
                <FontAwesomeIcon 
                    onClick={handleIconClick} 
                    icon={handleIcon()} 
                    className="mr-2" 
                    style={{cursor: 'pointer'}} 
                />
            }
        </li>
    )
}

export default Field
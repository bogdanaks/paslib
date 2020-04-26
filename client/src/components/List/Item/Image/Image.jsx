import React, { useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { imageUpload } from '../../../../redux/actions'
import useWindowDimensions from '../../../useWindowDimensions'
import {Spring} from 'react-spring/renderprops'

import Loader from '../../../Loader/Loader'
import unknownImg from '../../../../assets/unknown.png'

import css from "./image.module.css"


const Image = ({itemId, linkImg}) => {
    const inputRef = useRef()
    const dispatch = useDispatch()
    const [visibleChange, setVisibleChange] = useState(false)
    const handleMouseOver = () => setVisibleChange(true)
    const hanldeMouseLeave = () => setVisibleChange(false)
    const loader = useSelector(state => state.app.loadingImage)
    const { width } = useWindowDimensions()

    const handleUpload = (event) => {
        const file = event.target.files[0]
        dispatch(imageUpload(file, itemId))
    }
    
    return (
        <div 
            className={css.imageBlock + " col-12 col-sm-4 my-auto p-4"}
            onMouseOver={handleMouseOver}
            onMouseLeave={hanldeMouseLeave}
        >
            {loader
            ? <Loader margin={0}/>
            : <img className="w-100" name="image" alt="Card cap" src={linkImg !== "unknown" ? linkImg : unknownImg}/>
            }
            {visibleChange || width < 992
            ?   <Spring
                    from={{ transform: 'translate3d(0, 10px ,0)'}}
                    to={{ transform: 'translate3d(0, 0, 0)'}}>
                    {anim => 
                    <div className={css.changeBlock} style={anim}>
                        <div 
                            className={css.changeButton}
                            onClick={()=>inputRef.current.click()}
                        >
                            <button type="button">Upload image</button>
                        </div>
                        <input type="file" name="photo" style={{visibility: "hidden", position: "absolute"}} ref={inputRef} onChange={handleUpload} />
                    </div>
                    }
                </Spring>
            : null
            }
        </div>
    )
}

export default Image
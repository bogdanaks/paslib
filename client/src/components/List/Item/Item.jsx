import React from 'react'
import {Spring} from 'react-spring/renderprops'

import { faUser, faEyeSlash, faEye } from '@fortawesome/free-regular-svg-icons'
import { faLink, faKey, faHashtag, faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons'

import css from "./item.module.css"

import Image from './Image/Image'
import DeleteItem from './DeleteItem/DeleteItem'
import Field from './Field/Field'

const Item = ({item, itemId}) => {
    return (
        <Spring
            key={itemId}
            from={{ transform: 'translate3d(0,-60px,0)', opacity: 0 }}
            to={{ transform: 'translate3d(0,0px,0)', opacity: 1 }}>
            {props => 
            <div className="card mb-4 shadow" style={props}>
                <div className={css.cardHorizontal}>
                    <Image itemId={itemId} linkImg={item.image}/>
                    <div className="card-body col-12 col-sm-8 d-flex align-items-center">
                        <ul className="list-group list-group-flush w-100">
                            <Field id={itemId} name="title" value={item.title} faName={faHashtag} />
                            <Field id={itemId} name="login" value={item.login} faName={faUser} />
                            <Field id={itemId} name="password" value={item.password} faName={faKey} faEyes={[faEye, faEyeSlash]} />
                            <Field id={itemId} name="link" value={item.link} faName={faLink} faLink={faExternalLinkAlt} />
                        </ul>
                    </div>
                    <DeleteItem id={itemId}/>
                </div>
            </div>
            }
        </Spring>
    )
}

export default Item

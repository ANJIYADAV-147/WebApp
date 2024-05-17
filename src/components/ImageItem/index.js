import React from 'react'
import './index.css'

const ImageItem = ({imageDetails,openModal}) => {
  const {regular} = imageDetails

  const onClickImage=()=>{
    openModal(imageDetails)
  }

  return (
    <li className='image-items'>
      <img src={regular} alt="unsplash" className='images' onClick={onClickImage}/>
    </li>
  )
}

export default ImageItem
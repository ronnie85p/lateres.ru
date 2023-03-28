import React, { useContext } from 'react'

import AppGallery from '@js/components/Gallery'
import Context from '../context'

const Gallery = (props) => {
    const { data } = useContext(Context)

    return <>
        <AppGallery 
            images={data.object.images}
        />
    </>
}

export default Gallery
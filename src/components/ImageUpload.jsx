import React from 'react'
import axios from "axios"


const ImageUpload = ({ value, imageChanged }) => {
    const upload = async (files) => {
        if (files === null) return;
        const data = new FormData();
        data.append("image", files[0])

        const response = await axios.post('pro/upload/', data)
        console.log(response)

        imageChanged(response.data.url)
    }
    return (
        <>
            <div className="input-group">
                <input value={value} onChange={e => imageChanged(e.target.value)} type="text"
                    name="image"
                    className="form-control" />
                <div className="input-group-append">
                    <label className="btns edit mx-1">
                        <i className="fa fa-upload"></i><span className="mx-1">File</span>
                        <input type="file" hidden onChange={e => upload(e.target.files)} />

                    </label>
                </div>

            </div>

            {value && <>
                <label>
                    Preview:
            </label> <br />
                <img src={value} alt="product_image" className="preview_img" /></>}
        </>
    )
}

export default ImageUpload

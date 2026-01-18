import { NavLink } from 'react-router-dom';
import defaultImg from '../assets/images/Group3164.png';
const defaultNoPhoto = defaultImg;

export default function PhotoGroup ({
    data,
    isEdit, 
    handleFileChange,
    id,
    index,
    previewImage,
    handleImgDel,
}){
    return(<>
            {isEdit
                ? (<div className=" photo-item flex-shrink-1 position-relative ">

                        <div className="photo-upload position-absolute top-0 start-0">
                            <input className="d-none" type="file" 
                                id={id} name="imageUrl" 
                                accept="image/*" 
                                onChange={(e) => handleFileChange(e,index)}/>
                            <label htmlFor={id} className="btn btn-dark px-4 rounded-pill mx-2">
                                <i className="bi bi-upload"></i>
                            </label>
                        </div>

                        <div className="position-absolute top-0 end-0">
                            <div className="">
                                <button className="btn py-0 pe-2 fs-5 border-0" style={{color:"#000000e0"}}
                                onClick={() => handleImgDel(index)}>
                                    <i className="bi bi-x-circle-fill "></i>
                                </button>
                            </div>
                        </div>
                        
                        <img src={previewImage[index] || data || defaultNoPhoto} alt="" />
                    </div >)
                : (<>
                    <div className=" photo-item flex-shrink-1">
                        <img src={data || null} alt="" />
                    </div>
                        {data?.imagesUrl?.map((item,index) =>(
                            <div className="photo-item flex-shrink-1" key={index}>
                                <img src={item || null} alt="商品圖片" />
                            </div>)
                        )}
                </>)
            }
    </>)
}
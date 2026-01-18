
import PhotoGroup from "../Components/PhotoGroup.jsx";

export default function ProductDetail({
    productDetail,
    isEdit,
    handleFileChange,
    previewImage,
    handleImgDel,
    handleInputChange
}) {
    return(<>
        <div className="row align-items-center">
            <div className="col-5">
                <div className=" d-flex  flex-column gap-1 photo-area ">
                    <PhotoGroup 
                        data={productDetail?.imageUrl} 
                        isEdit={isEdit} 
                        handleFileChange={handleFileChange}
                        id={"fileImg-main"}
                        index={0}
                        previewImage={previewImage}
                        handleImgDel={handleImgDel}
                            />

                    {productDetail?.imagesUrl.map((item,index)=> (
                        <PhotoGroup data={item} isEdit={isEdit} 
                        handleFileChange={handleFileChange}
                        id={`fileImg-${index+1}`}
                        index={index+1}
                        previewImage={previewImage}
                        handleImgDel={handleImgDel}
                        />
                    ))}
                

                </div>
            </div>
            <div className="col-7">
                <div className=" table-responsive" style={{ maxHeight: '530px', overflowY: 'auto' }}>
                    <table className="table ">
                        {isEdit  
                            ? <tbody >
                                <tr>
                                    <td style={{width:"120px"}}>產品名稱</td>
                                    <td ><input type="text" className="form-control w-100" value={productDetail?.title} name="title" onChange={handleInputChange}/></td>
                                </tr>
                                <tr>
                                    <td>評價</td>
                                    <td ><input type="number" className="form-control w-100" min="0" value={productDetail?.rating} name="rating" onChange={handleInputChange}/></td>
                                </tr>
                                <tr>
                                    <td>類別</td>
                                    <td ><input type="text" className="form-control w-100" value={productDetail?.category} name="category" onChange={handleInputChange}/></td>
                                </tr>
                                <tr>
                                    <td>原價</td>
                                    <td ><input type="number" className="form-control w-100" min="0" value={productDetail?.origin_price  || 0} name="origin_price" onChange={handleInputChange}/> </td>
                                </tr>
                                <tr>
                                    <td>售價</td>
                                    <td ><input type="number" className="form-control w-100" min="0" value={productDetail?.price || 0}name="price" onChange={handleInputChange}/></td>
                                </tr>
                                <tr>
                                    <td>啟用狀態</td>
                                    <td>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="is_enabled" id="product-on" value="1" checked={productDetail?.is_enabled === 1} onChange={handleInputChange}/>
                                            <label className="form-check-label" htmlFor="product-on">啟用</label>
                                        </div>
                                        <div className="form-check form-check-inline">
                                            <input className="form-check-input" type="radio" name="is_enabled" id="product-off" value="0" checked={productDetail?.is_enabled === 0} onChange={handleInputChange}/>
                                            <label className="form-check-label" htmlFor="product-off">停用</label>
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>描述</td>
                                    <td >
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={productDetail?.description} name="description" onChange={handleInputChange}></textarea>
                                    </td>
                                    
                                </tr>
                                <tr>
                                    <td scope="col" >說明</td>
                                    <td >
                                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" value={productDetail?.content} name="content" onChange={handleInputChange}></textarea>
                                    </td>
                                </tr>
                            </tbody>

                            :<tbody >
                                <tr>
                                    <td style={{width:"120px"}}>產品名稱</td>
                                    <td >{productDetail?.title}</td>
                                </tr>
                                <tr>
                                    <td>評價</td>
                                    <td><i class="bi bi-star-fill me-2" style={{color:"#FFEF5F"}}></i>{productDetail?.rating}</td>
                                </tr>
                                <tr>
                                    <td>類別</td>
                                    <td>{productDetail?.category}</td>
                                </tr>
                                <tr>
                                    <td>原價</td>
                                    <td>$ {productDetail?.origin_price?.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td>售價</td>
                                    <td>$ {productDetail?.price?.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <td>啟用狀態</td>
                                    <td>{productDetail?.is_enabled ? <i className="bi bi-check-circle-fill text-success"></i> : <i className="bi bi-x-circle-fill text-danger"></i> }</td>
                                </tr>
                                <tr>
                                    <td>描述</td>
                                    <td>{productDetail?.description}</td>
                                </tr>
                                <tr>
                                    <td scope="col" >說明</td>
                                    <td>{productDetail?.content}</td>
                                </tr>
                            </tbody>
                        }
                        
                    </table>
                </div>

                
            </div>
        </div>
    </>)
}
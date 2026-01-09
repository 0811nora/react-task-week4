import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts , userCheck , userLogout , putSingleProduct } from '../api/Api';
import { successNotify , errorNotify } from '../layout/BaseFunc.jsx';
import CustomModal from '../Components/CustomModal.jsx';


const PhotoGroup = ({data ,isEdit,handleArrInputChange,handleInputChange}) => {
    return (
        <div className=" d-flex  flex-column gap-1 photo-area "> 
            {isEdit
                ? (<>
                    <div className="  flex-shrink-1 mb-4">
                        <div className="">
                            <label htmlFor="image1" className="form-label text-white">圖片1</label>
                            <input type="text" className="form-control" id="image1" name="imageUrl"  value={data?.imageUrl}  onChange={handleInputChange}/>
                        </div>
                    </div>
                        {data?.imagesUrl?.map((item,index) =>(
                            <div className=" flex-shrink-1 mb-4" key={index}>
                                <div className="">
                                    <label 
                                        htmlFor={`image${index+1}`} 
                                        className="form-label text-white">
                                            {`圖片${index+2}`}
                                    </label>
                                    <input 
                                        type="text" className="form-control" 
                                        id={`image${index+1}`} 
                                        name="imagesUrl" value={item || ""} 
                                        onChange={(e)=>handleArrInputChange(index,e.target.value)}/>
                                </div>
                            </div>)
                        )}
                    </>) 
                : (<>
                    <div className=" photo-item flex-shrink-1">
                    <img src={data?.imageUrl} alt="" />
                        </div >
                        {data?.imagesUrl?.map((item,index) =>(
                            <div className="photo-item flex-shrink-1" key={index}>
                                <img src={item} alt="商品圖片" />
                            </div>)
                        )}
                </>)
            }
        
            
        </div>
    )
}

export default function Home() {
    
    
    const navigate = useNavigate();
    const token = document.cookie.split("; ").find((row) => row.startsWith("noraToken="))?.split("=")[1];

    const [isLoading , setIsLoading] = useState(true);
    const [ products , setProduct ] = useState([]);
    const [ productDetail, setProductDetail ] = useState();
    const [ originalDetail, setOriginalDetail ] = useState();
    const [ view , setView ] = useState('list');
    const [ isEdit , setIsEdit ] = useState(false);
    const [ model , setModel] = useState('');

    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);



    const getProductList = async () =>{
        try{
            const res = await getProducts();
            console.log(res)
            setProduct(Object.values(res.data.products))
        }catch(err){
            errorNotify(err)
    }}

    // 看資料區，記得刪掉
    useEffect( () => {
        console.log('單一產品資料',productDetail)
    },[productDetail])


    
    
    useEffect(() => {

        if(!token){
            navigate('/login')
            return;
        }

        const checkState = async () =>{
            try{
                const res = await userCheck();

                if(res.data.success){
                    getProductList();
                    setIsLoading(false);
                }else{
                    navigate('/login')
                }
            }catch(err){
                console.log(err)
                navigate('/login')
            }
        }

        checkState();
    },[navigate,token])

    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <div className="loader"></div>
            </div>
        );
    }


    const findSingleProduct = (id) =>{
        setProductDetail(products.find(item => item.id === id));
        setOriginalDetail(products.find(item => item.id === id));
        setView('detail');
        
    }

    const handleBack = () => {
        setView('list');
        setIsEdit(false);
    };

    const handleInputChange = (e) =>{
        const {name , value} = e.target;
        console.log(name , value)

        const nameIsNumber = ["is_enabled","origin_price","price"]
        setProductDetail({
            ...productDetail,
            [name] : nameIsNumber.includes(name) ? (Number(value) || 0 ) : value
        })
    }

    const handleArrInputChange = (index , value) =>{
        const newImages = [...productDetail.imagesUrl]
        console.log(newImages)
        console.log(index , value)

        newImages[index] = value;
        
        setProductDetail({
            ...productDetail,
            imagesUrl: newImages
        })
    }


    // const editProduct = async() => {
    //     const res = await putSingleProduct(id,productDetail)
    // }

    const handleCancel = () => {
        setProductDetail(originalDetail);
        setIsEdit(false);
    }

    const handleLogout = async () =>{
        try{
            const res = await userLogout();
            navigate('/login');
            successNotify(res.data.message);
        }catch(err){
            errorNotify(err.data.message)
        }
    }







    return ( <>

        <div className="container ">
            <div className="d-flex justify-content-center align-items-center min-vh-100 ">
                <div className="home-card">

                    <div className="d-flex justify-content-between align-items-center px-5 mt-2">
                        <h1 className="text-white">產品列表</h1>
                        <div className="">
                            <button className="btn-log btn-logout" onClick={handleLogout}><span>登出</span></button>
                        </div>
                    </div>
                    

                    <div className={`sliding-container ${view === 'detail' ? 'show-detail' : ''}` } >

                        <div className="view-section">
                            <div className="container">
                                <div className="mb-4">
                                    <button className="btn-action btn-action-add"><i class="bi bi-plus-circle me-2"></i>新增產品</button>
                                </div>
                                <div className=" table-responsive" style={{ maxHeight: '620px', overflowY: 'auto' }}>
                                    <table className="table  align-middle ">
                                        <thead className="sticky-top" >
                                            <tr>
                                                <th scope="col">產品名稱</th>
                                                <th scope="col" className="text-center">類別</th>
                                                <th scope="col" className="text-center" >售價</th>
                                                <th scope="col" className="text-center" >啟用狀態</th>
                                                <th scope="col" className="text-center">內容</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.title}</td>
                                                    <td className="text-center">{item.category}</td>
                                                    <td className="text-center">$ {item.price.toLocaleString()}</td>
                                                    <td className="text-center">{item.is_enabled ? <i className="bi bi-check-circle-fill text-success"></i> : <i className="bi bi-x-circle-fill text-danger"></i> }</td>
                                                    <td className="text-center">
                                                        <button className="btn btn-dark-light" onClick={() => findSingleProduct(item.id)}>詳情</button>
                                                    </td>
                                                </tr>
                                            ))}
                    
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                        <div className="view-section">
                            <div className="container">
                                <div className="">
                                    <div className="mb-3">
                                        <button className="btn text-white fs-5 btn-border" onClick={handleBack}><i className="bi bi-arrow-left me-2" ></i>返回列表</button>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-5">
                                            <PhotoGroup data={productDetail} isEdit={isEdit} handleArrInputChange={handleArrInputChange} handleInputChange={handleInputChange}/>
                                        </div>
                                        <div className="col-7">
                                            <div className=" table-responsive" style={{ maxHeight: '520px', overflowY: 'auto' }}>
                                                <table className="table ">
                                                    {isEdit  
                                                        ? <tbody >
                                                            <tr>
                                                                <td style={{width:"120px"}}>產品名稱</td>
                                                                <td >
                                                                    <input type="text" className="form-control w-100" value={productDetail?.title} name="title" onChange={handleInputChange}/>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>類別</td>
                                                                <td >
                                                                    <input type="text" className="form-control w-100" value={productDetail?.category} name="category" onChange={handleInputChange}/>
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>原價</td>
                                                                <td >
                                                                    <input type="text" className="form-control w-100" value={productDetail?.origin_price  || 0} name="origin_price" onChange={handleInputChange}/> 
                                                                </td>
                                                            </tr>
                                                            <tr>
                                                                <td>售價</td>
                                                                <td >
                                                                    <input type="text" className="form-control w-100" value={productDetail?.price || 0}name="price" onChange={handleInputChange}/>
                                                                </td>
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
                                    <div className="d-flex justify-content-center  mt-4" style={{gap:"100px"}}>
                                        {isEdit
                                            ? (<><button className="btn-action btn-action-cancel-edit"onClick={handleCancel}>
                                                <i className="bi bi-x-octagon me-2"></i>取消編輯</button>
                                                <button className="btn-action btn-action-comfirm-edit"  onClick={() => setIsUpdateModalOpen(true)}>
                                                    <i className="bi bi-check-circle me-2"></i>確認更改</button>
                                                    
                                                </>)
                                            : (<><button className="btn-action btn-action-del" onClick={()=>{setIsDelModalOpen(true)}}>
                                                <i className="bi bi-trash me-2"></i>刪除產品</button>
                                            <button className=" btn-action btn-action-edit" onClick={()=>setIsEdit(true)}>
                                                <i className="bi bi-pencil-square me-2"></i>編輯產品
                                            </button>
                                            </>)
                                        }
                                        
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    
                </div>
            </div>
        </div>
        <CustomModal 
            isOpen={isUpdateModalOpen} 
            onClose={() => setIsUpdateModalOpen(false)}
            title="是否更新產品資料？"
            footer={(
            <>
                <button className="btn-action btn-action-cancel-edit" onClick={() => setIsUpdateModalOpen(false)}>取消</button>
                <button className="btn-action btn-action-comfirm-edit">確認更新</button>
            </>
            )}
        >
            <p>產品：<strong>{productDetail?.title}</strong> </p>
        </CustomModal>

        <CustomModal 
            isOpen={isDelModalOpen} 
            onClose={() => setIsDelModalOpen(false)}
            title="是否刪除產品？"
            footer={(
            <>
                <button className="btn-action btn-action-cancel-edit" onClick={() => setIsDelModalOpen(false)}>取消</button>
                <button className="btn-action btn-action-del-fill">確認刪除</button>
            </>
            )}
        >
            <p>產品：<strong>{productDetail?.title}</strong> </p>
        </CustomModal>

    </>)
}


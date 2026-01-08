import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from '../api/Api';
import { successNotify } from '../layout/BaseFunc.jsx';


const PhotoGroup = ({data}) => {
    return (
        <div className=" d-flex  flex-column gap-1 photo-area "> 
            <div className=" photo-item flex-shrink-1">
                <img src={data.imageUrl} alt="" />
            </div >
            {data?.imagesUrl?.map((item,index) =>(
                <div className="photo-item flex-shrink-1" key={index}>
                    <img src={item} alt="" />
                </div>)
            )}
        </div>
    )
}

export default function Home() {
    

    

    const navigate = useNavigate();
    const token = sessionStorage.getItem('token');
    const [ products , setProduct ] = useState([]);
    const [ productDetail, setProductDetail ] = useState('');
    const [ view ,setView ] = useState('list');


    useEffect(() =>{
        console.log(token)
    },[token]);

    useEffect(() => {
        const getProductList = async () =>{
            try{
                const res = await getProducts(token);
                console.log(res)
                setProduct(Object.values(res.data.products))
            }catch(err){
                console.log(err)
            }
        }

        if(!token){
            navigate('/login')
        }else{
            getProductList();
        }
    },[navigate,token])


    const findSingleProduct = (id) =>{
        setProductDetail(products.find(item => item.id === id));

        setView('detail');
        
    }


    const handleBack = () => {
        setView('list');
    };

    const delToken = () =>{
        sessionStorage.removeItem('token');
        navigate('/login');
        successNotify("登出成功");

    }




    return ( <>

        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="home-card">

                    <div className="d-flex justify-content-between align-items-center px-5">
                        <h1 className="text-white">產品列表</h1>
                        <div className="">
                            <button className="btn-blueSm" onClick={delToken}>登出</button>
                        </div>
                    </div>

                    <div className={`sliding-container ${view === 'detail' ? 'show-detail' : ''}` } >

                        <div className="view-section">
                            <div className="container">
                                <div className=" table-responsive" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                                    <table class="table  align-middle ">
                                        <thead className="sticky-top" >
                                            <tr>
                                                <th scope="col">產品名稱</th>
                                                <th scope="col" className="text-center">類別</th>
                                                <th scope="col" className="text-center" >售價</th>
                                                <th scope="col"className="text-center" >啟用狀態</th>
                                                <th scope="col" className="text-center">內容</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {products.map((item) => (
                                                <tr key={item.id}>
                                                    <td>{item.title}</td>
                                                    <td className="text-center">{item.category}</td>
                                                    <td className="text-center">$ {item.price.toLocaleString()}</td>
                                                    <td className="text-center">{item.is_enabled ? <i class="bi bi-check-circle-fill text-success"></i> : <i class="bi bi-x-circle-fill text-danger"></i> }</td>
                                                    <td className="text-center">
                                                        <button className="btn btn btn-dark" onClick={() => findSingleProduct(item.id)}>詳情</button>
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
                                        <button className="btn text-white fs-5 btn-border" onClick={handleBack}><i class="bi bi-arrow-left me-2" ></i>返回列表</button>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-5">
                                            <PhotoGroup data={productDetail} />
                                        </div>
                                        <div className="col-7">
                                            <table class="table ">

                                                <tbody >
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
                                                        <td>{productDetail?.is_enabled ? <i class="bi bi-check-circle-fill text-success"></i> : <i class="bi bi-x-circle-fill text-danger"></i> }</td>
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
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    
                </div>
            </div>
        </div>
        
    </>)
}


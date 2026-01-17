import { useEffect,  useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts , userCheck , userLogout , putSingleProduct, postNewProduct , delSingleProduct ,upload } from '../api/Api';
import { successNotify , errorNotify } from '../layout/BaseFunc.jsx';
import CustomModal from '../Components/CustomModal.jsx';
import ProductDetail from "../Components/ProductDetail.jsx";
import ProductTable from "../Components/ProductTable.jsx";
import Header from "../Components/Header.jsx";
import YesOrNoBtn from "../Components/YesOrNoBtn.jsx";
import ModalBtn from "../Components/ModalBtn.jsx";




export default function Home() {

    const productData = {
        category: "",
        content: "",
        description: "", 
        imageUrl: "",
        imagesUrl:["","",""],
        is_enabled: 1,
        origin_price : null,
        price: null, 
        title: "", 
        unit: "個",
        rating: 0,
    }


    
    
    const navigate = useNavigate();
    const token = document.cookie.split("; ").find((row) => row.startsWith("noraToken="))?.split("=")[1];

    const [ isLoading , setIsLoading ] = useState(true);
    const [ products , setProduct ] = useState([]);
    const [ productDetail, setProductDetail ] = useState();
    const [ originalDetail, setOriginalDetail ] = useState();
    const [ newProduct, setNewProduct ] = useState(productData);
    const [ view , setView ] = useState('list');
    const [ isEdit , setIsEdit ] = useState(false);
    const [ isPass , setIsPass ] = useState(true);
    const [ previewImage , setPreviewImage ] = useState([]);
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
    const [isDelModalOpen, setIsDelModalOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);



    useEffect(() => {
        console.log(previewImage);
        console.log(newProduct)
        console.log(productDetail);
    },[previewImage,productDetail,newProduct])



    // 取得產品列表API
    const getProductList = async () =>{
        try{
            const res = await getProducts();
            setProduct(Object.values(res.data.products))
        }catch(err){
            errorNotify(err)
    }}

    
    
    // 登入判斷
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
            }catch{
                navigate('/login')
            }
        }

        checkState();
    },[navigate,token])


    // loading 圖示
    if (isLoading) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                <div className="loader"></div>
            </div>
        );
    }


    // 單一產品比對ID
    const findSingleProduct = (id) =>{
        setProductDetail(products.find(item => item.id === id));
        setOriginalDetail(products.find(item => item.id === id));
        setView('detail');
        
    }

    //產品細節返回產品列表
    const handleBack = () => {
        setView('list');
        setIsEdit(false);
    };


    // input 修改時存資料 (新增 / 編輯)
    const handleInputChange = (e) =>{
        const {name , value} = e.target;
        const nameIsNumber = ["is_enabled","origin_price","price"]
        const finalValue =  nameIsNumber.includes(name) ? (Number(value) || 0 ) : value

        if(isAddModalOpen){
            setNewProduct( pre => ({...pre, [name]:finalValue}))
        }else{
            setProductDetail( pre => ({...pre, [name]:finalValue}))
        }
        
    }


    // 刪除編輯狀態下的圖片預覽
    const handleImgDel = (index) => {
        const setState = isAddModalOpen ? setNewProduct : setProductDetail;
        const currentProduct = isAddModalOpen ? newProduct : productDetail;

        setState((pre) => {
            if(index === 0){
                return {...pre,imageUrl:""}
            }

            const newImages = [...currentProduct.imagesUrl];
            newImages[index-1] = "";

            return {...pre,imagesUrl: newImages}
        })

        setPreviewImage(pre => ({...pre, [index]: null}))
    }



    // 編輯完畢，送出資料
    const handleEditProduct = async(id, data = productDetail) => {
        try{
            const res = await putSingleProduct(id,data)
            console.log(res.data)
            setProductDetail(data);
            setIsUpdateModalOpen(false);
            setIsEdit(false);
            getProductList();
            successNotify(res.data.message);

        }catch(err){
            errorNotify(err.data.message)

        }
    }

    // 取消編輯
    const handleEditCancel = () => {
        setProductDetail(originalDetail);
        setIsEdit(false);
        setPreviewImage([]);
    }

    // 取消新增
    const handleAddCancel = () => {
        setNewProduct(productData);
        setIsAddModalOpen(false);
    }

    // 新增單一產品
    const sendNewProduct = async() => {
        if(Object.values(newProduct).includes("") || Object.values(newProduct).includes(null)){
            setIsPass(false);
            return;
        }
        try{
            const res = await postNewProduct(newProduct)
            setIsPass(true);
            setNewProduct(productData);
            setPreviewImage([]);
            getProductList();
            successNotify(res.data.message);
            setIsAddModalOpen(false);

        }catch(err){
            errorNotify(err.data.message)
        }
        
    }

    // 刪除單一產品
    const handleDelProduct = async (id) => {
        try{
            const res = await delSingleProduct(id);
            setIsDelModalOpen(false);
            setView('list');
            getProductList();
            successNotify(res.data.message);
        }catch(err){
            errorNotify(err.data.message)
        }
    }

    // 登出
    const handleLogout = async () =>{
        try{
            const res = await userLogout();
            navigate('/login');
            successNotify(res.data.message);
        }catch(err){
            errorNotify(err.data.message)
        }
    }



    // 上傳圖片到圖庫，並且取得圖片連結
    const handleupload = async(index,file) => {
        const  formData = new FormData();
        formData.append('file-to-upload', file)

        try{
            const res = await upload(formData);
            console.log("網址列",res.data.imageUrl)
            const newUrl = res.data.imageUrl;

            const setState = isAddModalOpen ? setNewProduct : setProductDetail;
            const currentProduct = isAddModalOpen ? newProduct : productDetail;


            let updateData = { 
                ...currentProduct, 
                imagesUrl: [...(currentProduct.imagesUrl || [])] 
            };

            if(index === 0){
                updateData.imageUrl = newUrl
            }else{
                updateData.imagesUrl[index-1] = newUrl;
            }
            setState(updateData);

        }catch(err){
            console.log('上傳錯誤',err)
        }
    }

    // 取得上傳圖片時的預覽圖片網址
    const handleFileChange = (e ,index) => {
        const file = e.target.files[0]
        const preview = URL.createObjectURL(e.target.files[0]);
        console.log(index , preview)

        setPreviewImage({
            ...previewImage,
            [index]:preview
        })

        handleupload(index,file)
    }







    return ( <>

        <div className="container ">
            <div className="d-flex justify-content-center align-items-center min-vh-100 ">
                <div className="home-card" style={{height:"850px"}}>

                    <Header handleLogout={handleLogout}/>
                    

                    <div className={`sliding-container ${view === 'detail' ? 'show-detail' : ''}` } >
                        <div className="view-section">
                            <div className="container">
                                <div className="mb-2">
                                    <button className="btn-action btn-action-add" 
                                        onClick={()=>setIsAddModalOpen(true)}>
                                        <i className="bi bi-plus-circle me-2"></i>新增產品</button>
                                </div>
                                <ProductTable 
                                    products={products}
                                    findSingleProduct={findSingleProduct}
                                />
                            </div>
                        </div>
                        <div className="view-section">
                            <div className="container">
                                <div className="">
                                    <div className="mb-3">
                                        <button className="btn text-white fs-5 btn-border" onClick={handleBack}><i className="bi bi-arrow-left me-2" ></i>返回列表</button>
                                    </div>

                                    <ProductDetail 
                                        productDetail={productDetail} 
                                        isEdit={isEdit}
                                        handleFileChange={handleFileChange}
                                        previewImage={previewImage}
                                        handleImgDel={handleImgDel}
                                        handleInputChange={handleInputChange}
                                    />

                                    <div className="d-flex justify-content-center  mt-5" style={{gap:"100px"}}>
                                        {isEdit
                                            ? (<>
                                                < YesOrNoBtn 
                                                    cancel={handleEditCancel} 
                                                    confirm={() => setIsUpdateModalOpen(true)} 
                                                    cancelText="取消編輯" confirmText="確認更改"
                                                    style={null}
                                                />
                                                    
                                            </>)
                                            : (<>

                                                < YesOrNoBtn 
                                                    cancel={()=>{setIsDelModalOpen(true)}} 
                                                    confirm={()=>setIsEdit(true)} 
                                                    cancelText="刪除產品" 
                                                    confirmText="編輯產品"
                                                    style="btn-action-del"
                                            />
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

                < ModalBtn 
                    cancel={() => setIsUpdateModalOpen(false)}
                    confirm={()=> handleEditProduct(productDetail.id)}
                    cancelText="取消"
                    confirmText="確認更新"
                />

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
                < ModalBtn 
                    cancel={() => setIsDelModalOpen(false)}
                    confirm={()=> handleDelProduct(productDetail.id)}
                    cancelText="取消"
                    confirmText="確認刪除"
                />
            </>
            )}
        >
            <p>產品：<strong>{productDetail?.title}</strong> </p>
        </CustomModal>

        <CustomModal 
            isOpen={isAddModalOpen} 
            onClose={() => setIsAddModalOpen(false)}
            size="lg"
            title="新增產品"
        >
            <div className="add-card home-card" >
                <ProductDetail 
                    productDetail={newProduct} 
                    isEdit={true}
                    handleFileChange={handleFileChange}
                    previewImage={previewImage}
                    handleImgDel={handleImgDel}
                    handleInputChange={handleInputChange}
                />
                {isPass ? "" : <p className="text-center text-danger">所有欄位皆須填寫！</p>}

                < YesOrNoBtn 
                    cancel={handleAddCancel} 
                    confirm={sendNewProduct} 
                    cancelText="取消新增" 
                    confirmText="新增商品"
                    style={null}
                />


            </div>
            
        </CustomModal>

    </>)
}



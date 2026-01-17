

export default function ProductTable({
    products,
    findSingleProduct,
}){

    return(<>
        <div className=" table-responsive" style={{ maxHeight: '620px', overflowY: 'auto' }}>
            <table className="table  align-middle ">
                <thead className="sticky-top" >
                    <tr>
                        <th scope="col">產品圖片</th>
                        <th scope="col">產品名稱</th>
                        <th scope="col" className="text-center">評價</th>
                        <th scope="col" className="text-center">類別</th>
                        <th scope="col" className="text-center" >售價</th>
                        <th scope="col" className="text-center" >啟用狀態</th>
                        <th scope="col" className="text-center">內容</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((item) => (
                        <tr key={item.id}>
                            <td><img src={item.imageUrl} style={{width:"50px",height:"50px"}} alt="" /></td>
                            <td>{item.title}</td>
                            <td><i class="bi bi-star-fill me-2" style={{color:"#FFEF5F"}}></i>{item.rating}</td>
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
    </>)
}
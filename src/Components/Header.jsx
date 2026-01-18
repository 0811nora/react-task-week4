export default function Header({handleLogout}){
    return(<>
        <div className="d-flex justify-content-end align-items-center px-5 mt-2 position-relative">
            <h1 className="text-white position-absolute start-50 translate-middle-x m-0">產品列表</h1>
            <div className="">
                <button className="btn-log btn-logout" onClick={handleLogout}><span>登出</span></button>
            </div>
        </div>



    </>)
}
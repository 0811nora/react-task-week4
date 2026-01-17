export default function YesOrNoBtn({cancel , confirm , cancelText , confirmText, style}) {
    return(<>
        <div className="d-flex justify-content-center  mt-3" style={{gap:"100px"}}>
            <button className={`btn-action ${style === null ? "btn-action-cancel-edit" : style }`} onClick={cancel}>
                <i className="bi bi-x-octagon me-2"></i>{cancelText}
            </button>
            <button className="btn-action btn-action-comfirm-edit"  onClick={confirm}>
                <i className="bi bi-check-circle me-2"></i>{confirmText}
            </button>
        </div>
    </>)
}
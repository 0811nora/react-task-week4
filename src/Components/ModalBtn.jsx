
export default function ModalBtn({cancel , confirm , cancelText , confirmText }){
    return(<>
        <button className="btn-action btn-action-cancel-edit" onClick={cancel}>{cancelText}</button>
        <button className="btn-action btn-action-comfirm-edit" onClick={confirm}>{confirmText}</button>
    </>)
}
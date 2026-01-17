

const CustomModal = ({ isOpen, onClose, title, children, footer, size = 'md'  }) => {
    if (!isOpen) return null; 

    return (
        <div className="custom-modal-overlay">
            <div className={`custom-modal-container modal-${size}`}>
                <div className="custom-modal-header ">
                    <h3 className="modal-title ">{title}</h3>
                    <button className="btn-close-icon" onClick={onClose}>
                        <i className="bi bi-x-lg"></i>
                    </button>
                </div>

                <div className="custom-modal-body">
                    {children}
                </div>

                {footer && (
                    <div className="custom-modal-footer">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomModal;
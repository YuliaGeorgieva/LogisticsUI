import React, { useState, useEffect } from "react";

const Toaster = ({ title, Color, Error, Success }) => {
    const [showToaster, setShowToaster] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowToaster(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    return showToaster ? (
        <div style={{ background: Color }} className="info">
            <div className="info__icon">
                {Error ? (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            className="info__icon-cross"
                        >
                            <path
                                fill="#393a37"
                                d="M12.0001 10.586L16.9501 5.636C17.3401 5.246 17.3401 4.615 16.9501 4.225C16.5601 3.835 15.9301 3.835 15.5401 4.225L10.5901 9.175L5.6401 4.225C5.2501 3.835 4.6201 3.835 4.2301 4.225C3.8401 4.615 3.8401 5.246 4.2301 5.636L9.1801 10.586L4.2301 15.536C3.8401 15.926 3.8401 16.557 4.2301 16.947C4.4701 17.187 4.7701 17.306 5.0701 17.306C5.3701 17.306 5.6701 17.187 5.9101 16.947L10.8601 12L15.8101 16.95C16.0501 17.19 16.3501 17.308 16.6501 17.308C16.9501 17.308 17.2501 17.19 17.4901 16.95C17.8801 16.56 17.8801 15.929 17.4901 15.539L12.5401 10.589L12.0001 10.586Z"
                            />
                        </svg>
                    </>
                ) : null}

                {Success ? (
                    <>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                        >
                            <path
                                fill="#ffffff" // White color for the checkmark
                                d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z"
                            />
                        </svg>
                    </>
                ) : null}
            </div>
            <div className="info__title">{title}</div>
        </div>
    ) : null;
};

export default Toaster;

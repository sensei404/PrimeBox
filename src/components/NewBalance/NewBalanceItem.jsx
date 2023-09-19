import React from 'react';
import {Link} from "react-router-dom";

const NewBalanceItem = ({
                            ifExists,
                            id,
                            color,
                            shadow,
                            title,
                            text,
                            img,
                            btn,
                            rating,
                            price,}) => {

    return (
        <>
            <Link to={`/newBalance/${id}`}>
                <div
                    className={`relative bg-gradient-to-b ${color} ${shadow} grid items-center ${
                        ifExists ? "justify-items-start" : "justify-items-center"
                    } rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105`}
                >
                    <div
                        className={`grid items-center ${
                            ifExists ? "justify-items-start" : "justify-items-center"
                        }`}
                    >
                        <h1 className="text-slate-200 text-xl lg:text-lg md:text-base font-medium filter drop-shadow">
                            {title}
                        </h1>
                        <p className="text-slate-200 filter drop-shadow text-base md:text-sm font-normal">
                            {text}
                        </p>

                        <div className="flex items-center justify-between w-28 my-2">
                            <div className="flex items-center bg-white/80  px-1 rounded blur-effect-theme">
                                <h1 className="text-black text-sm font-medium">${price}</h1>
                            </div>
                            <div className="flex items-center gap-1">
                                <h1 className="md:text-sm font-normal text-slate-100">
                                    {rating}
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                className="bg-white/90 blur-effect-theme button-theme px-2 py-1 shadow shadow-sky-200 text-sm text-black"
                            >
                                {btn}
                            </button>
                        </div>
                    </div>
                    <div
                        className={`flex items-center ${
                            ifExists ? "absolute top-5 right-1" : "justify-center"
                        }`}
                    >
                        <img
                            src={img}
                            alt={`img/item-img/${id}`}
                            className={`transitions-theme hover:-rotate-12 ${
                                ifExists
                                    ? "h-auto w-64 lg:w-56 md:w-48 -rotate-[35deg]"
                                    : "h-36 w-64"
                            }`}
                        />
                    </div>
                </div>
            </Link>
        </>
    );
};

export default NewBalanceItem;
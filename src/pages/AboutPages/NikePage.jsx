import { useNavigate, useParams } from "react-router-dom";
import NikeSales from "../../components/NikeProducts/NikeSales.jsx";
import { nikeProduct } from "../../data/data.js";
import { useEffect, useState } from 'react';
import Swal from "sweetalert2";

const NikePage = ({ ifExists }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const product = nikeProduct.items.find((item) => item.id === id);
    const [selectedSize, setSelectedSize] = useState("");
    const [selectedImageInfo, setSelectedImageInfo] = useState(product.images[0]);
    const [selectedImage, setSelectedImage] = useState(product.images[0].src);
    const [selectedImagePrice, setSelectedImagePrice] = useState(0);
    const [selectedColorDescription, setSelectedColorDescription] = useState("");
    const [totalPrice, setTotalPrice] = useState(0);
    const [activeImage, setActiveImage] = useState(product.images[0].src);
    const [selectedSizePrice, setSelectedSizePrice] = useState(null);


    useEffect(() => {
        if (selectedSize && selectedImagePrice !== null) {
            const selectedPrice = product.prices[selectedSize];
            setTotalPrice(selectedImagePrice + selectedPrice);
        }
    }, [selectedSize, selectedImagePrice]);

    const changeSelectedImage = (image) => {
        const selectedImageData = product.images.find((imageData) => imageData.src === image);
        setSelectedImageInfo(selectedImageData);
        setActiveImage(image);

        // Обновить selectedColorDescription на основе выбранной фотографии
        setSelectedColorDescription(selectedImageData.description);
    };


    if (!product || !product.images || product.images.length === 0) {
        return <div>Товар не найден.</div>;
    }

    if (!selectedImageInfo) {
        // Если selectedImageInfo не найден, выполните какие-то действия по умолчанию или верните сообщение об ошибке.
        return <div>Выбранное изображение не найдено.</div>;
    }

    const handleSizeClick = (size) => {
        setSelectedSize(size);
        const newSelectedImageInfo = product.images.find((imageData) => imageData.src === activeImage);
        const newSelectedImagePrice = newSelectedImageInfo.sizes[size];
        setSelectedImageInfo(newSelectedImageInfo);
        setSelectedImagePrice(newSelectedImagePrice);
    };



    const handleBuyClick = () => {
        if (!selectedSize || !selectedImage) {
            Swal.fire('Выберите размер и рассветку, прежде чем купить товар.')
            return;
        }

        const message = `Артикул: ${product.id}\nНазвание: ${product.title}\nРазмер: ${selectedSize}\nЦвет: ${selectedColorDescription}\nИтого: ${totalPrice} Сом`;
        const whatsappNumber = '+996708659585';
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, '_blank');
    };

    return (
        <>
            <div className="nike-container mt-24">
                <div className="flex flex-wrap-reverse items-en">
                    <div>
                        <div
                            className={`relative bg-gradient-to-b ${product.color} ${product.shadow} grid items-center ${
                                ifExists ? "justify-items-start" : "justify-items-center"
                            } rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full hover:scale-105 my-container`}
                            style={{ height: "300px", marginBottom: "50px", marginRight: "15px" }}
                        >
                            <img
                                src={selectedImageInfo.src}
                                alt={product.title}
                                className="w-400 h-400 sm:w-300 sm:h-300 relative rounded-xl py-4 px-5 transition-all duration-700 ease-in-out hover:scale-105 lg:flex justify-center items-center"
                            />
                        </div>
                        <div className="mr-11 flex justify-between">
                            {product.images.map((imageData, i) => (
                                <div key={i} className="mb-7">
                                    <div
                                        className={`w-36 h-36 sm:w-24 sm:h-24 mr-5 border-2 rounded-2xl cursor-pointer p-5 ${
                                            activeImage === imageData.src ? 'border-blue-500' : 'border-red-500'
                                        }`}
                                        onClick={() => changeSelectedImage(imageData.src)}
                                    >
                                        <img className="w-full h-full" src={imageData.src} alt={`Image ${i + 1}`} />
                                    </div>
                                    <div className="text-center text-white  text-2xl sm:text-1xl">{imageData.description}</div>
                                </div>
                            ))}
                        </div>
                        <div className="flex-wrap">
                            <h1 className="text-2xl text-white pb-2">размер</h1>
                            <div className="flex gap-3 flex-wrap mb-10 w-100">
                                {Object.keys(selectedImageInfo.sizes).map((size, i) => (
                                    <div
                                        key={i}
                                        className={`border-2 w-45 h-45 p-1.5 rounded text-white cursor-pointer ${
                                            selectedSize === size ? 'bg-blue-500 text-black' : ''
                                        }`}
                                        onClick={() => handleSizeClick(size)} // Используйте функцию handleSizeClick для обновления выбранного размера
                                    >
                                        {size}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-white text-3xl flex items-center">
                            {product.title}
                        </h1>
                        <h1 className="text-white text-2xl flex items-center">
                            {product.text}
                        </h1>
                        <div
                            className={`relative bg-gradient-to-b ${product.color} ${product.shadow} grid items-center ${
                                ifExists ? "justify-items-start" : "justify-items-center"
                            } rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full`}
                            style={{
                                width: "180px",
                                display: "flex",
                                justifyContent: "center",
                                marginTop: "15px",
                                marginBottom: "40px"
                            }}>
                            <p className="text-white text-3xl">{product.price} <span className="text-opacity-60 text-gray-100 text-3xl">Сом</span></p>
                        </div>
                    </div>
                </div>
                <div className="border-2 border-blue-400 p-5 w-96 rounded-2xl sm:w-64">
                    <h4 className="text-white mb-5 text-2xl">Артикул: {product.id}</h4>
                    <h3 className="text-white mb-5 text-2xl sm:text-1xl">Название: {product.title}</h3>
                    <p className="text-white mb-5 text-2xl sm:text-1xl">
                        Размер: {selectedSize}
                    </p>
                    <h4 className="text-white mb-5 text-2xl sm:text-1xl">Цвет: {selectedColorDescription}</h4>
                    <h4 className="text-white mb-5 text-2xl sm:text-1xl">Цена за товар: {selectedSizePrice} Сом</h4>

                    <button
                        className={`relative bg-gradient-to-b ${product.color} ${product.shadow} grid items-center ${
                            ifExists ? 'justify-items-start' : 'justify-items-center'
                        } rounded-xl py-4 px-5 transition-all duration-700 ease-in-out w-full`}
                        style={{ width: '180px', color: 'white' }}
                        onClick={handleBuyClick}
                    >
                        Оформить заказ
                    </button>
                </div>
            </div>
            <div className="mt-24 sm:items-center">
                <NikeSales nikeProduct={nikeProduct} />
            </div>
        </>
    );
};

export default NikePage;

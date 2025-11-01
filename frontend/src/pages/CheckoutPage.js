import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, User, Feather, CreditCard, Truck, MapPin, Check } from 'lucide-react';

function CheckoutPage() {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);
    const [currentStep, setCurrentStep] = useState(1);

    useEffect(() => {
        const link = document.createElement('link');
        link.href = 'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        address: '',
        addressDetail: '',
        zipCode: '',
        deliveryMessage: '',
        paymentMethod: 'card',
        agreeTerms: false,
        agreePrivacy: false
    });

    const orderItems = [
        {
            id: 1,
            title: "The Metamorphosis",
            author: "Franz Kafka",
            price: 14500,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop"
        },
        {
            id: 2,
            title: "Norwegian Wood",
            author: "Haruki Murakami",
            price: 16800,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop"
        }
    ];

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal >= 20000 ? 0 : 3000;
    const total = subtotal + shippingFee;

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.agreeTerms || !formData.agreePrivacy) {
            alert('필수 약관에 동의해주세요.');
            return;
        }
        alert('주문이 완료되었습니다!');
        navigate('/mypage');
    };

    return (
        <div className="min-h-screen bg-zinc-50" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            {/* Header */}
            <header className="fixed w-full top-0 z-50 transition-all duration-500 bg-white/98 backdrop-blur-md shadow-sm border-b border-zinc-100">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex items-center">
                            <Feather className="w-7 h-7 mr-3 text-zinc-900" />
                            <div>
                                <h1 className="text-2xl font-serif tracking-wider text-zinc-900">
                                    BIBLIOTHECA
                                </h1>
                                <p className="text-xs tracking-widest font-light text-zinc-500">
                                    FINE LITERATURE
                                </p>
                            </div>
                        </Link>

                        <div className="flex items-center space-x-5">
                            <Link to="/login" className="transition-colors text-zinc-700 hover:text-zinc-900">
                                <User className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Progress Steps */}
            <section className="bg-white border-b border-zinc-200 mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                    <div className="flex items-center justify-center space-x-4">
                        {[
                            { step: 1, label: '장바구니', icon: ShoppingBag },
                            { step: 2, label: '주문/결제', icon: CreditCard },
                            { step: 3, label: '주문완료', icon: Check }
                        ].map((item, index) => (
                            <React.Fragment key={item.step}>
                                <div className="flex items-center">
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                                        currentStep >= item.step ? 'bg-zinc-900 text-white' : 'bg-zinc-200 text-zinc-400'
                                    }`}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <span className={`ml-3 font-light ${
                                        currentStep >= item.step ? 'text-zinc-900' : 'text-zinc-400'
                                    }`}>
                    {item.label}
                  </span>
                                </div>
                                {index < 2 && (
                                    <div className={`w-16 h-px ${
                                        currentStep > item.step ? 'bg-zinc-900' : 'bg-zinc-200'
                                    }`} />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                <h1 className="text-4xl font-serif text-zinc-900 mb-12" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 600 }}>
                    주문/결제
                </h1>

                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Order Form */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-8">
                        {/* Shipping Info */}
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <div className="flex items-center space-x-2 mb-6">
                                <Truck className="w-6 h-6 text-zinc-900" />
                                <h2 className="text-2xl font-serif text-zinc-900" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                    배송 정보
                                </h2>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-zinc-600 mb-2">받는 사람 *</label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                        placeholder="이름을 입력하세요"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm text-zinc-600 mb-2">연락처 *</label>
                                        <input
                                            type="tel"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                            placeholder="010-1234-5678"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-zinc-600 mb-2">이메일 *</label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                            placeholder="email@example.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-zinc-600 mb-2">우편번호 *</label>
                                    <div className="flex space-x-2">
                                        <input
                                            type="text"
                                            name="zipCode"
                                            value={formData.zipCode}
                                            onChange={handleInputChange}
                                            required
                                            className="flex-1 px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                            placeholder="12345"
                                        />
                                        <button
                                            type="button"
                                            className="px-6 py-3 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors whitespace-nowrap"
                                        >
                                            주소 검색
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm text-zinc-600 mb-2">주소 *</label>
                                    <input
                                        type="text"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors mb-2"
                                        placeholder="기본 주소"
                                    />
                                    <input
                                        type="text"
                                        name="addressDetail"
                                        value={formData.addressDetail}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                        placeholder="상세 주소"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm text-zinc-600 mb-2">배송 메시지</label>
                                    <select
                                        name="deliveryMessage"
                                        value={formData.deliveryMessage}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                    >
                                        <option value="">배송 메시지를 선택하세요</option>
                                        <option value="door">문 앞에 놓아주세요</option>
                                        <option value="security">경비실에 맡겨주세요</option>
                                        <option value="call">배송 전 연락주세요</option>
                                        <option value="direct">직접 입력</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <div className="flex items-center space-x-2 mb-6">
                                <CreditCard className="w-6 h-6 text-zinc-900" />
                                <h2 className="text-2xl font-serif text-zinc-900" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                    결제 수단
                                </h2>
                            </div>

                            <div className="space-y-3">
                                {[
                                    { value: 'card', label: '신용/체크카드' },
                                    { value: 'transfer', label: '무통장 입금' },
                                    { value: 'phone', label: '휴대폰 결제' },
                                    { value: 'kakao', label: '카카오페이' },
                                    { value: 'naver', label: '네이버페이' }
                                ].map((method) => (
                                    <label
                                        key={method.value}
                                        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                                            formData.paymentMethod === method.value
                                                ? 'border-zinc-900 bg-zinc-50'
                                                : 'border-zinc-300 hover:border-zinc-400'
                                        }`}
                                    >
                                        <input
                                            type="radio"
                                            name="paymentMethod"
                                            value={method.value}
                                            checked={formData.paymentMethod === method.value}
                                            onChange={handleInputChange}
                                            className="mr-3"
                                        />
                                        <span className="text-zinc-900">{method.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Terms Agreement */}
                        <div className="bg-white rounded-lg shadow-md p-8">
                            <h2 className="text-2xl font-serif text-zinc-900 mb-6" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                약관 동의
                            </h2>

                            <div className="space-y-4">
                                <label className="flex items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreeTerms"
                                        checked={formData.agreeTerms}
                                        onChange={handleInputChange}
                                        className="mt-1 mr-3"
                                    />
                                    <span className="text-zinc-700">
                    <span className="text-red-600">[필수]</span> 이용약관에 동의합니다
                  </span>
                                </label>

                                <label className="flex items-start cursor-pointer">
                                    <input
                                        type="checkbox"
                                        name="agreePrivacy"
                                        checked={formData.agreePrivacy}
                                        onChange={handleInputChange}
                                        className="mt-1 mr-3"
                                    />
                                    <span className="text-zinc-700">
                    <span className="text-red-600">[필수]</span> 개인정보 수집 및 이용에 동의합니다
                  </span>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-zinc-900 text-white py-5 rounded-lg hover:bg-zinc-800 transition-colors font-light tracking-wider text-lg"
                        >
                            ₩{total.toLocaleString()} 결제하기
                        </button>
                    </form>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-32">
                            <h2 className="text-xl font-serif text-zinc-900 mb-6" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                주문 상품
                            </h2>

                            <div className="space-y-4 mb-6 pb-6 border-b border-zinc-200">
                                {orderItems.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-16 h-24 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-serif text-sm text-zinc-900 mb-1">{item.title}</h3>
                                            <p className="text-xs text-zinc-500 mb-2">{item.author}</p>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-600">{item.quantity}권</span>
                                                <span className="text-zinc-900">₩{(item.price * item.quantity).toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 mb-6 pb-6 border-b border-zinc-200">
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-600">상품 금액</span>
                                    <span className="text-zinc-900">₩{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-600">배송비</span>
                                    <span className="text-zinc-900">
                    {shippingFee === 0 ? '무료' : `₩${shippingFee.toLocaleString()}`}
                  </span>
                                </div>
                            </div>

                            <div className="flex justify-between mb-6 text-lg">
                                <span className="font-medium text-zinc-900">총 결제 금액</span>
                                <span className="text-2xl font-light text-zinc-900">₩{total.toLocaleString()}</span>
                            </div>

                            <div className="bg-zinc-50 rounded-lg p-4">
                                <h3 className="font-medium text-zinc-900 mb-3 text-sm">적립 혜택</h3>
                                <ul className="space-y-2 text-xs text-zinc-600">
                                    <li>• 구매 확정 시 {Math.floor(total * 0.05).toLocaleString()}원 적립</li>
                                    <li>• 리뷰 작성 시 1,000원 추가 적립</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-zinc-900 text-white pt-20 pb-10 mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-zinc-800">
                        <div>
                            <div className="flex items-center mb-6">
                                <Feather className="w-6 h-6 mr-2" />
                                <div>
                                    <h4 className="text-lg font-serif tracking-wider">BIBLIOTHECA</h4>
                                    <p className="text-xs text-zinc-500 tracking-widest font-light">FINE LITERATURE</p>
                                </div>
                            </div>
                            <p className="text-zinc-400 text-sm leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 }}>
                                1987년부터 이어온<br />
                                문학의 전통
                            </p>
                        </div>

                        {[
                            { title: '컬렉션', links: ['문학', '철학', '시 & 에세이', '예술'] },
                            { title: '서비스', links: ['큐레이션', '독서 클럽', '저자 만남', '맞춤 추천'] },
                            { title: '고객지원', links: ['공지사항', '배송 안내', '반품 정책', '문의하기'] }
                        ].map((section, idx) => (
                            <div key={idx}>
                                <h5 className="font-serif mb-4 tracking-wide">{section.title}</h5>
                                <ul className="space-y-3">
                                    {section.links.map((link, i) => (
                                        <li key={i}>
                                            <a href="#" className="text-zinc-400 hover:text-white transition-colors text-sm font-light">
                                                {link}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                        <p className="text-zinc-500 font-light">
                            © 2024 BIBLIOTHECA. All rights reserved.
                        </p>
                        <div className="flex space-x-8 mt-4 md:mt-0">
                            <a href="#" className="text-zinc-500 hover:text-white transition-colors font-light">
                                이용약관
                            </a>
                            <a href="#" className="text-zinc-500 hover:text-white transition-colors font-light">
                                개인정보처리방침
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default CheckoutPage;
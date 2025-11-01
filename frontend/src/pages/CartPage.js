import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, User, Feather, Minus, Plus, X, ChevronRight } from 'lucide-react';

function CartPage() {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);

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

    // 샘플 장바구니 데이터
    const [cartItems, setCartItems] = useState([
        {
            id: 1,
            bookId: 1,
            title: "The Metamorphosis",
            author: "Franz Kafka",
            translator: "김영웅 역",
            price: 14500,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop"
        },
        {
            id: 2,
            bookId: 2,
            title: "Norwegian Wood",
            author: "Haruki Murakami",
            translator: "양억관 역",
            price: 16800,
            quantity: 2,
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop"
        },
        {
            id: 3,
            bookId: 3,
            title: "Being and Time",
            author: "Martin Heidegger",
            translator: "이기상 역",
            price: 38000,
            quantity: 1,
            image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop"
        }
    ]);

    const updateQuantity = (id, delta) => {
        setCartItems(items =>
            items.map(item =>
                item.id === id
                    ? { ...item, quantity: Math.max(1, item.quantity + delta) }
                    : item
            )
        );
    };

    const removeItem = (id) => {
        setCartItems(items => items.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shippingFee = subtotal >= 20000 ? 0 : 3000;
    const total = subtotal + shippingFee;

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

                        <nav className="hidden lg:flex items-center space-x-10">
                            {[
                                { name: '문학', path: '/category/literature' },
                                { name: '철학', path: '/category/philosophy' },
                                { name: '예술', path: '/category/art' },
                                { name: '신간', path: '/category/new' },
                            ].map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className="text-sm tracking-wide font-light transition-colors text-zinc-700 hover:text-zinc-900"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-5">
                            <button className="transition-colors text-zinc-700 hover:text-zinc-900">
                                <Search className="w-5 h-5" />
                            </button>
                            <button className="transition-colors text-zinc-700 hover:text-zinc-900">
                                <Heart className="w-5 h-5" />
                            </button>
                            <Link to="/login" className="transition-colors text-zinc-700 hover:text-zinc-900">
                                <User className="w-5 h-5" />
                            </Link>
                            <Link to="/cart" className="relative transition-colors text-zinc-900">
                                <ShoppingBag className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-900 rounded-full text-white text-xs flex items-center justify-center font-medium">
                  {cartItems.length}
                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
                <h1 className="text-4xl font-serif text-zinc-900 mb-2" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 600 }}>
                    장바구니
                </h1>
                <p className="text-zinc-500 mb-12">총 {cartItems.length}개의 상품</p>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20">
                        <ShoppingBag className="w-16 h-16 text-zinc-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-serif text-zinc-400 mb-4">장바구니가 비어있습니다</h2>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-zinc-900 text-white px-8 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
                        >
                            쇼핑 계속하기
                        </button>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-6">
                            {cartItems.map((item) => (
                                <div key={item.id} className="bg-white rounded-lg shadow-md p-6 flex gap-6">
                                    <div
                                        className="w-24 h-36 flex-shrink-0 bg-zinc-100 rounded overflow-hidden cursor-pointer"
                                        onClick={() => navigate(`/book/${item.bookId}`)}
                                    >
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between mb-4">
                                            <div>
                                                <h3
                                                    className="font-serif text-lg text-zinc-900 mb-1 cursor-pointer hover:text-zinc-600"
                                                    onClick={() => navigate(`/book/${item.bookId}`)}
                                                >
                                                    {item.title}
                                                </h3>
                                                <p className="text-sm text-zinc-500 mb-1">{item.author}</p>
                                                <p className="text-xs text-zinc-400">{item.translator}</p>
                                            </div>
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="text-zinc-400 hover:text-zinc-900 transition-colors"
                                            >
                                                <X className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center border border-zinc-300 rounded-lg">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="p-2 hover:bg-zinc-100 transition-colors"
                                                >
                                                    <Minus className="w-4 h-4" />
                                                </button>
                                                <span className="px-6 text-center min-w-[60px]">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="p-2 hover:bg-zinc-100 transition-colors"
                                                >
                                                    <Plus className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <p className="text-2xl font-light text-zinc-900">
                                                    ₩{(item.price * item.quantity).toLocaleString()}
                                                </p>
                                                <p className="text-xs text-zinc-400">
                                                    ₩{item.price.toLocaleString()} × {item.quantity}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-md p-6 sticky top-32">
                                <h2 className="text-xl font-serif text-zinc-900 mb-6" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                    주문 요약
                                </h2>

                                <div className="space-y-4 mb-6 pb-6 border-b border-zinc-200">
                                    <div className="flex justify-between">
                                        <span className="text-zinc-600">상품 금액</span>
                                        <span className="text-zinc-900">₩{subtotal.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-zinc-600">배송비</span>
                                        <span className="text-zinc-900">
                      {shippingFee === 0 ? '무료' : `₩${shippingFee.toLocaleString()}`}
                    </span>
                                    </div>
                                    {subtotal < 20000 && (
                                        <p className="text-xs text-blue-600">
                                            ₩{(20000 - subtotal).toLocaleString()} 더 담으면 무료배송!
                                        </p>
                                    )}
                                </div>

                                <div className="flex justify-between mb-6 text-lg">
                                    <span className="font-medium text-zinc-900">총 결제 금액</span>
                                    <span className="text-2xl font-light text-zinc-900">₩{total.toLocaleString()}</span>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full bg-zinc-900 text-white py-4 rounded-lg hover:bg-zinc-800 transition-colors font-light tracking-wider mb-3 flex items-center justify-center space-x-2"
                                >
                                    <span>주문하기</span>
                                    <ChevronRight className="w-4 h-4" />
                                </button>

                                <button
                                    onClick={() => navigate('/')}
                                    className="w-full border border-zinc-300 text-zinc-700 py-4 rounded-lg hover:bg-zinc-50 transition-colors font-light tracking-wider"
                                >
                                    쇼핑 계속하기
                                </button>

                                <div className="mt-6 pt-6 border-t border-zinc-200">
                                    <h3 className="font-medium text-zinc-900 mb-3">혜택 안내</h3>
                                    <ul className="space-y-2 text-sm text-zinc-600">
                                        <li>• 2만원 이상 구매시 무료배송</li>
                                        <li>• 구매금액의 5% 포인트 적립</li>
                                        <li>• 회원 등급별 추가 할인</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </section>

            {/* Recommended Books */}
            {cartItems.length > 0 && (
                <section className="bg-white border-t border-zinc-200 py-20">
                    <div className="max-w-7xl mx-auto px-6 lg:px-8">
                        <h2 className="text-3xl font-serif text-zinc-900 mb-8" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                            함께 보면 좋은 책
                        </h2>
                        <div className="grid md:grid-cols-4 gap-8">
                            {[
                                {
                                    id: 4,
                                    title: "The Stranger",
                                    author: "Albert Camus",
                                    price: 12000,
                                    image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop"
                                },
                                {
                                    id: 5,
                                    title: "1984",
                                    author: "George Orwell",
                                    price: 13500,
                                    image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop"
                                },
                                {
                                    id: 6,
                                    title: "Collected Poems",
                                    author: "Rainer Maria Rilke",
                                    price: 24000,
                                    image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=400&h=600&fit=crop"
                                },
                                {
                                    id: 7,
                                    title: "Sapiens",
                                    author: "Yuval Noah Harari",
                                    price: 22500,
                                    image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop"
                                }
                            ].map((book) => (
                                <div
                                    key={book.id}
                                    onClick={() => navigate(`/book/${book.id}`)}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative aspect-[2/3] overflow-hidden bg-zinc-100 rounded-lg mb-4">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    </div>
                                    <h3 className="font-serif text-zinc-900 mb-1 group-hover:text-zinc-600 transition-colors">
                                        {book.title}
                                    </h3>
                                    <p className="text-sm text-zinc-500 mb-2">{book.author}</p>
                                    <p className="text-lg font-light text-zinc-900">
                                        ₩{book.price.toLocaleString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer className="bg-zinc-900 text-white pt-20 pb-10">
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

export default CartPage;
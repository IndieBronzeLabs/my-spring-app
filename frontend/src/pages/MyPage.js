import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, User, Feather, Package, Star, BookOpen, Settings, LogOut } from 'lucide-react';

function MyPage() {
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);
    const [activeTab, setActiveTab] = useState('orders');

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

    const userInfo = {
        name: '김독서',
        email: 'reader@bibliotheca.com',
        phone: '010-1234-5678',
        membershipLevel: 'Gold',
        points: 12500,
        joinDate: '2023.01.15'
    };

    const orders = [
        {
            id: 'ORD-2024-001',
            date: '2024.10.28',
            status: '배송완료',
            items: [
                {
                    title: 'The Metamorphosis',
                    author: 'Franz Kafka',
                    price: 14500,
                    quantity: 1,
                    image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop'
                }
            ],
            total: 14500
        },
        {
            id: 'ORD-2024-002',
            date: '2024.10.15',
            status: '배송완료',
            items: [
                {
                    title: 'Norwegian Wood',
                    author: 'Haruki Murakami',
                    price: 16800,
                    quantity: 2,
                    image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=300&fit=crop'
                }
            ],
            total: 33600
        }
    ];

    const wishlist = [
        {
            id: 1,
            title: 'Being and Time',
            author: 'Martin Heidegger',
            price: 38000,
            image: 'https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop'
        },
        {
            id: 2,
            title: 'The Stranger',
            author: 'Albert Camus',
            price: 12000,
            image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop'
        },
        {
            id: 3,
            title: 'Sapiens',
            author: 'Yuval Noah Harari',
            price: 22500,
            image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop'
        }
    ];

    const reviews = [
        {
            id: 1,
            bookTitle: 'The Metamorphosis',
            author: 'Franz Kafka',
            rating: 5,
            date: '2024.10.29',
            content: '부조리한 현실 속에서 개인의 고독과 소외를 탁월하게 그려낸 작품입니다.',
            image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=200&h=300&fit=crop'
        }
    ];

    const statusColors = {
        '배송준비중': 'bg-blue-100 text-blue-700',
        '배송중': 'bg-yellow-100 text-yellow-700',
        '배송완료': 'bg-green-100 text-green-700',
        '구매확정': 'bg-gray-100 text-gray-700'
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
                            <Link to="/mypage" className="transition-colors text-zinc-900">
                                <User className="w-5 h-5" />
                            </Link>
                            <Link to="/cart" className="relative transition-colors text-zinc-700 hover:text-zinc-900">
                                <ShoppingBag className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-900 rounded-full text-white text-xs flex items-center justify-center font-medium">
                  3
                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
                <div className="grid lg:grid-cols-4 gap-12">
                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-md p-6 sticky top-32">
                            <div className="text-center mb-6 pb-6 border-b border-zinc-200">
                                <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-10 h-10 text-zinc-400" />
                                </div>
                                <h2 className="text-xl font-serif text-zinc-900 mb-1" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                    {userInfo.name}
                                </h2>
                                <p className="text-sm text-zinc-500 mb-2">{userInfo.email}</p>
                                <span className="inline-block bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-medium">
                  {userInfo.membershipLevel} 회원
                </span>
                            </div>

                            <div className="mb-6 pb-6 border-b border-zinc-200">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-zinc-600">적립금</span>
                                    <span className="text-lg font-medium text-zinc-900">{userInfo.points.toLocaleString()}원</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-zinc-600">가입일</span>
                                    <span className="text-sm text-zinc-900">{userInfo.joinDate}</span>
                                </div>
                            </div>

                            <nav className="space-y-2">
                                {[
                                    { id: 'orders', label: '주문 내역', icon: Package },
                                    { id: 'wishlist', label: '찜 목록', icon: Heart },
                                    { id: 'reviews', label: '내 리뷰', icon: Star },
                                    { id: 'settings', label: '설정', icon: Settings }
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                                            activeTab === tab.id
                                                ? 'bg-zinc-900 text-white'
                                                : 'text-zinc-600 hover:bg-zinc-50'
                                        }`}
                                    >
                                        <tab.icon className="w-5 h-5" />
                                        <span>{tab.label}</span>
                                    </button>
                                ))}

                                <button
                                    onClick={() => {
                                        alert('로그아웃 되었습니다.');
                                        navigate('/');
                                    }}
                                    className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-red-600 hover:bg-red-50"
                                >
                                    <LogOut className="w-5 h-5" />
                                    <span>로그아웃</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="lg:col-span-3">
                        {/* Orders Tab */}
                        {activeTab === 'orders' && (
                            <div>
                                <h1 className="text-4xl font-serif text-zinc-900 mb-8" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 600 }}>
                                    주문 내역
                                </h1>

                                <div className="space-y-6">
                                    {orders.map((order) => (
                                        <div key={order.id} className="bg-white rounded-lg shadow-md p-6">
                                            <div className="flex justify-between items-start mb-4 pb-4 border-b border-zinc-200">
                                                <div>
                                                    <p className="text-sm text-zinc-500 mb-1">{order.date}</p>
                                                    <p className="text-lg font-medium text-zinc-900">{order.id}</p>
                                                </div>
                                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[order.status]}`}>
                          {order.status}
                        </span>
                                            </div>

                                            {order.items.map((item, index) => (
                                                <div key={index} className="flex gap-4 mb-4">
                                                    <img
                                                        src={item.image}
                                                        alt={item.title}
                                                        className="w-20 h-30 object-cover rounded"
                                                    />
                                                    <div className="flex-1">
                                                        <h3 className="font-serif text-lg text-zinc-900 mb-1">{item.title}</h3>
                                                        <p className="text-sm text-zinc-500 mb-2">{item.author}</p>
                                                        <div className="flex justify-between items-end">
                                                            <span className="text-sm text-zinc-600">{item.quantity}권</span>
                                                            <span className="text-lg font-light text-zinc-900">
                                ₩{item.price.toLocaleString()}
                              </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}

                                            <div className="flex justify-between items-center pt-4 border-t border-zinc-200">
                                                <span className="text-zinc-600">총 결제 금액</span>
                                                <span className="text-2xl font-light text-zinc-900">
                          ₩{order.total.toLocaleString()}
                        </span>
                                            </div>

                                            <div className="flex gap-3 mt-4">
                                                <button className="flex-1 border border-zinc-300 text-zinc-700 py-2 rounded-lg hover:bg-zinc-50 transition-colors text-sm">
                                                    배송 조회
                                                </button>
                                                {order.status === '배송완료' && (
                                                    <>
                                                        <button className="flex-1 bg-zinc-900 text-white py-2 rounded-lg hover:bg-zinc-800 transition-colors text-sm">
                                                            구매 확정
                                                        </button>
                                                        <button className="flex-1 border border-zinc-300 text-zinc-700 py-2 rounded-lg hover:bg-zinc-50 transition-colors text-sm">
                                                            리뷰 작성
                                                        </button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Wishlist Tab */}
                        {activeTab === 'wishlist' && (
                            <div>
                                <h1 className="text-4xl font-serif text-zinc-900 mb-8" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 600 }}>
                                    찜 목록
                                </h1>

                                <div className="grid md:grid-cols-3 gap-6">
                                    {wishlist.map((book) => (
                                        <div key={book.id} className="group bg-white rounded-lg shadow-md overflow-hidden">
                                            <div
                                                className="relative aspect-[2/3] overflow-hidden bg-zinc-100 cursor-pointer"
                                                onClick={() => navigate(`/book/${book.id}`)}
                                            >
                                                <img
                                                    src={book.image}
                                                    alt={book.title}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        alert('찜 목록에서 제거되었습니다.');
                                                    }}
                                                    className="absolute top-4 right-4 w-10 h-10 bg-white/95 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                                                >
                                                    <Heart className="w-5 h-5 text-red-600 fill-red-600" />
                                                </button>
                                            </div>
                                            <div className="p-4">
                                                <h3 className="font-serif text-zinc-900 mb-1">{book.title}</h3>
                                                <p className="text-sm text-zinc-500 mb-3">{book.author}</p>
                                                <div className="flex justify-between items-center">
                          <span className="text-lg font-light text-zinc-900">
                            ₩{book.price.toLocaleString()}
                          </span>
                                                    <button className="bg-zinc-900 text-white px-4 py-2 rounded-lg text-xs hover:bg-zinc-800 transition-colors">
                                                        담기
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Reviews Tab */}
                        {activeTab === 'reviews' && (
                            <div>
                                <h1 className="text-4xl font-serif text-zinc-900 mb-8" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 600 }}>
                                    내 리뷰
                                </h1>

                                <div className="space-y-6">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
                                            <div className="flex gap-4 mb-4">
                                                <img
                                                    src={review.image}
                                                    alt={review.bookTitle}
                                                    className="w-20 h-30 object-cover rounded"
                                                />
                                                <div className="flex-1">
                                                    <h3 className="font-serif text-lg text-zinc-900 mb-1">{review.bookTitle}</h3>
                                                    <p className="text-sm text-zinc-500 mb-2">{review.author}</p>
                                                    <div className="flex items-center space-x-2 mb-2">
                                                        <div className="flex items-center space-x-1">
                                                            {[...Array(5)].map((_, i) => (
                                                                <Star
                                                                    key={i}
                                                                    className={`w-4 h-4 ${
                                                                        i < review.rating
                                                                            ? 'fill-zinc-900 text-zinc-900'
                                                                            : 'text-zinc-300'
                                                                    }`}
                                                                />
                                                            ))}
                                                        </div>
                                                        <span className="text-xs text-zinc-400">{review.date}</span>
                                                    </div>
                                                    <p className="text-zinc-700 leading-relaxed">{review.content}</p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2 pt-4 border-t border-zinc-200">
                                                <button className="text-sm text-zinc-600 hover:text-zinc-900">수정</button>
                                                <button className="text-sm text-red-600 hover:text-red-700">삭제</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Settings Tab */}
                        {activeTab === 'settings' && (
                            <div>
                                <h1 className="text-4xl font-serif text-zinc-900 mb-8" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 600 }}>
                                    설정
                                </h1>

                                <div className="bg-white rounded-lg shadow-md p-8">
                                    <h2 className="text-xl font-serif text-zinc-900 mb-6" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                        회원 정보
                                    </h2>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm text-zinc-600 mb-2">이름</label>
                                            <input
                                                type="text"
                                                defaultValue={userInfo.name}
                                                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-zinc-600 mb-2">이메일</label>
                                            <input
                                                type="email"
                                                defaultValue={userInfo.email}
                                                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm text-zinc-600 mb-2">연락처</label>
                                            <input
                                                type="tel"
                                                defaultValue={userInfo.phone}
                                                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                            />
                                        </div>

                                        <div className="pt-6">
                                            <button className="w-full bg-zinc-900 text-white py-4 rounded-lg hover:bg-zinc-800 transition-colors font-light tracking-wider">
                                                정보 수정
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-zinc-200">
                                        <h3 className="text-lg font-serif text-zinc-900 mb-4">비밀번호 변경</h3>
                                        <div className="space-y-4">
                                            <input
                                                type="password"
                                                placeholder="현재 비밀번호"
                                                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                            />
                                            <input
                                                type="password"
                                                placeholder="새 비밀번호"
                                                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                            />
                                            <input
                                                type="password"
                                                placeholder="새 비밀번호 확인"
                                                className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors"
                                            />
                                            <button className="w-full border border-zinc-300 text-zinc-700 py-3 rounded-lg hover:bg-zinc-50 transition-colors">
                                                비밀번호 변경
                                            </button>
                                        </div>
                                    </div>

                                    <div className="mt-8 pt-8 border-t border-zinc-200">
                                        <button className="text-red-600 hover:text-red-700 text-sm">
                                            회원 탈퇴
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

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

export default MyPage;
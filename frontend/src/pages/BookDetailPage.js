import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, User, ChevronRight, Star, BookOpen, Award, Feather, Minus, Plus, Share2 } from 'lucide-react';

function BookDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [selectedTab, setSelectedTab] = useState('description');

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

    // 샘플 데이터 (나중에 API로 대체)
    const book = {
        id: id,
        title: "The Metamorphosis",
        author: "Franz Kafka",
        translator: "김영웅 역",
        price: 14500,
        originalPrice: 16000,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=1200&fit=crop",
        publisher: "민음사",
        publishDate: "2023.03.15",
        pages: 224,
        isbn: "9788937460784",
        category: "문학",
        rating: 4.8,
        reviewCount: 1247,
        description: `카프카의 대표작 『변신』은 어느 날 아침 벌레로 변한 그레고르 잠자의 이야기를 통해 현대인의 소외와 실존적 불안을 탁월하게 그려낸 작품입니다. 

    부조리한 상황 속에서 개인이 겪는 고독과 가족 관계의 붕괴, 사회적 소외를 날카롭게 포착한 이 소설은 출간 100년이 지난 지금까지도 현대 사회의 단면을 예리하게 비추는 거울로 작용합니다.

    간결하면서도 강렬한 문체, 환상과 현실을 넘나드는 서사는 독자에게 깊은 사유의 시간을 선사합니다.`,
        tableOfContents: [
            "변신",
            "판결",
            "화부",
            "작품 해설",
            "작가 연보"
        ],
        authorInfo: `프란츠 카프카(1883-1924)는 20세기 가장 영향력 있는 작가 중 한 명입니다. 프라하에서 유대인 집안에 태어나 법학을 공부했으나, 평생 문학에 몰두했습니다. 생전에는 소수의 단편만을 발표했으나, 사후 친구 막스 브로트에 의해 미완성 장편들이 출간되면서 세계적인 명성을 얻었습니다.`
    };

    const reviews = [
        {
            id: 1,
            userName: "박지민",
            rating: 5,
            date: "2024.10.28",
            content: "부조리한 현실 속에서 개인의 고독과 소외를 탁월하게 그려낸 작품입니다. 카프카 특유의 불안과 공포가 현대 사회의 단면을 예리하게 포착합니다.",
            helpful: 24
        },
        {
            id: 2,
            userName: "이준호",
            rating: 5,
            date: "2024.10.25",
            content: "읽을수록 깊어지는 여운. 단순한 우화가 아닌 실존에 대한 깊은 성찰을 담고 있습니다.",
            helpful: 18
        },
        {
            id: 3,
            userName: "최유진",
            rating: 4,
            date: "2024.10.20",
            content: "번역이 훌륭합니다. 원문의 뉘앙스를 잘 살린 것 같아요.",
            helpful: 12
        }
    ];

    const relatedBooks = [
        {
            id: 2,
            title: "The Stranger",
            author: "Albert Camus",
            price: 12000,
            image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=400&h=600&fit=crop"
        },
        {
            id: 3,
            title: "1984",
            author: "George Orwell",
            price: 13500,
            image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=400&h=600&fit=crop"
        },
        {
            id: 4,
            title: "Norwegian Wood",
            author: "Haruki Murakami",
            price: 16800,
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&h=600&fit=crop"
        },
        {
            id: 5,
            title: "Being and Time",
            author: "Martin Heidegger",
            price: 38000,
            image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=400&h=600&fit=crop"
        }
    ];

    const handleAddToCart = () => {
        alert(`${book.title} ${quantity}권을 장바구니에 담았습니다.`);
        // 나중에 실제 장바구니 로직 추가
    };

    const handleBuyNow = () => {
        navigate('/checkout');
    };

    return (
        <div className="min-h-screen bg-zinc-50" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            {/* Header */}
            <header
                className={`fixed w-full top-0 z-50 transition-all duration-500 bg-white/98 backdrop-blur-md shadow-sm border-b border-zinc-100`}
            >
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

            {/* Book Detail */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Book Image */}
                    <div className="sticky top-32 h-fit">
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                            <img
                                src={book.image}
                                alt={book.title}
                                className="w-full aspect-[2/3] object-cover"
                            />
                        </div>
                    </div>

                    {/* Book Info */}
                    <div>
                        <div className="mb-6">
                            <p className="text-zinc-500 text-sm tracking-widest uppercase mb-2">{book.category}</p>
                            <h1 className="text-4xl font-serif text-zinc-900 mb-4" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 600 }}>
                                {book.title}
                            </h1>
                            <p className="text-xl text-zinc-600 mb-2" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 400 }}>
                                {book.author}
                            </p>
                            <p className="text-sm text-zinc-500">{book.translator}</p>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-zinc-200">
                            <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={`w-5 h-5 ${
                                            i < Math.floor(book.rating)
                                                ? 'fill-zinc-900 text-zinc-900'
                                                : 'text-zinc-300'
                                        }`}
                                    />
                                ))}
                            </div>
                            <span className="text-lg font-medium text-zinc-900">{book.rating}</span>
                            <span className="text-sm text-zinc-500">({book.reviewCount.toLocaleString()} 리뷰)</span>
                        </div>

                        {/* Book Details */}
                        <div className="space-y-3 mb-8 pb-8 border-b border-zinc-200">
                            <div className="flex justify-between">
                                <span className="text-zinc-500">출판사</span>
                                <span className="text-zinc-900 font-light">{book.publisher}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">출간일</span>
                                <span className="text-zinc-900 font-light">{book.publishDate}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">페이지</span>
                                <span className="text-zinc-900 font-light">{book.pages}쪽</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">ISBN</span>
                                <span className="text-zinc-900 font-light">{book.isbn}</span>
                            </div>
                        </div>

                        {/* Price */}
                        <div className="mb-8">
                            {book.originalPrice && (
                                <div className="text-lg text-zinc-400 line-through mb-2">
                                    ₩{book.originalPrice.toLocaleString()}
                                </div>
                            )}
                            <div className="text-4xl font-light text-zinc-900 mb-2">
                                ₩{book.price.toLocaleString()}
                            </div>
                            {book.originalPrice && (
                                <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-medium">
                                    {Math.round((1 - book.price / book.originalPrice) * 100)}% 할인
                                </div>
                            )}
                        </div>

                        {/* Quantity */}
                        <div className="mb-8">
                            <label className="block text-sm text-zinc-600 mb-3">수량</label>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-zinc-300 rounded-lg">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-zinc-100 transition-colors"
                                    >
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-8 text-lg font-medium">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="p-3 hover:bg-zinc-100 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-zinc-500">
                                    총 <span className="text-xl font-medium text-zinc-900">₩{(book.price * quantity).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-zinc-900 text-white py-4 rounded-lg hover:bg-zinc-800 transition-colors font-light tracking-wider"
                            >
                                장바구니 담기
                            </button>
                            <button
                                onClick={handleBuyNow}
                                className="flex-1 bg-white border-2 border-zinc-900 text-zinc-900 py-4 rounded-lg hover:bg-zinc-50 transition-colors font-light tracking-wider"
                            >
                                바로 구매
                            </button>
                        </div>

                        <div className="flex space-x-4">
                            <button className="flex-1 border border-zinc-300 text-zinc-700 py-3 rounded-lg hover:bg-zinc-50 transition-colors flex items-center justify-center space-x-2">
                                <Heart className="w-5 h-5" />
                                <span>찜하기</span>
                            </button>
                            <button className="flex-1 border border-zinc-300 text-zinc-700 py-3 rounded-lg hover:bg-zinc-50 transition-colors flex items-center justify-center space-x-2">
                                <Share2 className="w-5 h-5" />
                                <span>공유하기</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Section */}
            <section className="bg-white border-t border-zinc-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex border-b border-zinc-200">
                        {[
                            { id: 'description', label: '상세 정보' },
                            { id: 'toc', label: '목차' },
                            { id: 'author', label: '저자 소개' },
                            { id: 'reviews', label: `리뷰 (${book.reviewCount})` }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSelectedTab(tab.id)}
                                className={`px-8 py-4 font-light tracking-wide transition-colors ${
                                    selectedTab === tab.id
                                        ? 'border-b-2 border-zinc-900 text-zinc-900'
                                        : 'text-zinc-500 hover:text-zinc-900'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    <div className="py-16">
                        {selectedTab === 'description' && (
                            <div className="max-w-3xl">
                                <h3 className="text-2xl font-serif text-zinc-900 mb-6" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                    책 소개
                                </h3>
                                <div className="text-zinc-700 leading-relaxed whitespace-pre-line" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 400, lineHeight: '1.8' }}>
                                    {book.description}
                                </div>
                            </div>
                        )}

                        {selectedTab === 'toc' && (
                            <div className="max-w-3xl">
                                <h3 className="text-2xl font-serif text-zinc-900 mb-6" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                    목차
                                </h3>
                                <ul className="space-y-3">
                                    {book.tableOfContents.map((item, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="text-zinc-400 mr-4">{String(index + 1).padStart(2, '0')}</span>
                                            <span className="text-zinc-700">{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {selectedTab === 'author' && (
                            <div className="max-w-3xl">
                                <h3 className="text-2xl font-serif text-zinc-900 mb-6" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                    저자 소개
                                </h3>
                                <div className="text-zinc-700 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 400, lineHeight: '1.8' }}>
                                    {book.authorInfo}
                                </div>
                            </div>
                        )}

                        {selectedTab === 'reviews' && (
                            <div className="max-w-4xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-serif text-zinc-900" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                        독자 리뷰
                                    </h3>
                                    <button className="bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors text-sm">
                                        리뷰 작성
                                    </button>
                                </div>

                                <div className="space-y-6">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="border-b border-zinc-200 pb-6">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center space-x-4">
                                                    <span className="font-medium text-zinc-900">{review.userName}</span>
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
                                                    <span className="text-sm text-zinc-400">{review.date}</span>
                                                </div>
                                                <button className="text-sm text-zinc-500 hover:text-zinc-900">
                                                    도움됨 {review.helpful}
                                                </button>
                                            </div>
                                            <p className="text-zinc-700 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 400, lineHeight: '1.8' }}>
                                                {review.content}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Related Books */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
                <h3 className="text-3xl font-serif text-zinc-900 mb-8" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                    함께 보면 좋은 책
                </h3>
                <div className="grid md:grid-cols-4 gap-8">
                    {relatedBooks.map((relatedBook) => (
                        <div
                            key={relatedBook.id}
                            onClick={() => navigate(`/book/${relatedBook.id}`)}
                            className="group cursor-pointer"
                        >
                            <div className="relative aspect-[2/3] overflow-hidden bg-zinc-100 rounded-lg mb-4">
                                <img
                                    src={relatedBook.image}
                                    alt={relatedBook.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>
                            <h4 className="font-serif text-zinc-900 mb-1 group-hover:text-zinc-600 transition-colors">
                                {relatedBook.title}
                            </h4>
                            <p className="text-sm text-zinc-500 mb-2">{relatedBook.author}</p>
                            <p className="text-lg font-light text-zinc-900">
                                ₩{relatedBook.price.toLocaleString()}
                            </p>
                        </div>
                    ))}
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

export default BookDetailPage;
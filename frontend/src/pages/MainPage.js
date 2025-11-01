import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, User, ChevronRight, Star, BookOpen, Award, Feather } from 'lucide-react';

function MainPage() {
    const navigate = useNavigate();
    const [currentSlide, setCurrentSlide] = useState(0);
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

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % 3);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    const heroSlides = [
        {
            title: "Literature & Art",
            subtitle: "문학의 품격",
            description: "시대를 초월한 문학 작품",
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1600&h=900&fit=crop"
        },
        {
            title: "Philosophy & Thought",
            subtitle: "사유의 깊이",
            description: "철학자들의 위대한 통찰",
            image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1600&h=900&fit=crop"
        },
        {
            title: "Timeless Classics",
            subtitle: "영원한 고전",
            description: "세대를 넘어 읽히는 명작",
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=1600&h=900&fit=crop"
        }
    ];

    const collections = [
        {
            name: "Literary Fiction",
            subtitle: "현대 문학의 정수",
            count: "287 titles",
            image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=800&fit=crop",
            category: "literature"
        },
        {
            name: "Philosophy",
            subtitle: "사유의 본질",
            count: "156 titles",
            image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=800&fit=crop",
            category: "philosophy"
        },
        {
            name: "Poetry & Essays",
            subtitle: "언어의 예술",
            count: "203 titles",
            image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=800&fit=crop",
            category: "poetry"
        },
        {
            name: "Art & Design",
            subtitle: "시각적 영감",
            count: "194 titles",
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=800&fit=crop",
            category: "art"
        }
    ];

    const booksOldCoded = [
        {
            id: 1,
            title: "The Metamorphosis",
            author: "Franz Kafka",
            translator: "김영웅 역",
            price: 14500,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=900&fit=crop",
            badge: "CLASSIC"
        },
        {
            id: 2,
            title: "Norwegian Wood",
            author: "Haruki Murakami",
            translator: "양억관 역",
            price: 16800,
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=900&fit=crop",
            badge: "BESTSELLER"
        },
        {
            id: 3,
            title: "Being and Time",
            author: "Martin Heidegger",
            translator: "이기상 역",
            price: 38000,
            image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=900&fit=crop",
            badge: "PHILOSOPHY"
        },
        {
            id: 4,
            title: "The Stranger",
            author: "Albert Camus",
            translator: "김화영 역",
            price: 12000,
            image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=900&fit=crop",
            badge: "ESSENTIAL"
        },
        {
            id: 5,
            title: "Collected Poems",
            author: "Rainer Maria Rilke",
            translator: "김재혁 역",
            price: 24000,
            image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&h=900&fit=crop",
            badge: null
        },
        {
            id: 6,
            title: "1984",
            author: "George Orwell",
            translator: "정회성 역",
            price: 13500,
            image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&h=900&fit=crop",
            badge: "ESSENTIAL"
        },
        {
            id: 7,
            title: "Sapiens",
            author: "Yuval Noah Harari",
            translator: "조현욱 역",
            price: 22500,
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=900&fit=crop",
            badge: "BESTSELLER"
        },
        {
            id: 8,
            title: "The Art of Loving",
            author: "Erich Fromm",
            translator: "황문수 역",
            price: 15000,
            image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&h=900&fit=crop",
            badge: null
        }
    ];

    // 서버에서 가져온 도서 리스트
    const [books, setBooks] = useState([]);
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [errorBooks, setErrorBooks] = useState('');

    useEffect(() => {
        setLoadingBooks(true);
        fetch('/api/books?page=0&size=8&sort=id,desc')           // ← 페이지 파라미터 제거
            .then(r => r.json())
            .then(data =>
                {
                    const items = Array.isArray(data?.content) ? data.content : [];
                    setBooks(items);
                }
            )
            .catch(err => setErrorBooks(err.message || 'fail'))
            .finally(() => setLoadingBooks(false));
    }, []);


    const badges = {
        "CLASSIC": "bg-gradient-to-r from-amber-700 to-amber-900",
        "BESTSELLER": "bg-gradient-to-r from-blue-700 to-indigo-900",
        "PHILOSOPHY": "bg-gradient-to-r from-purple-700 to-purple-900",
        "ESSENTIAL": "bg-gradient-to-r from-gray-700 to-gray-900"
    };

    return (
        <div className="min-h-screen bg-zinc-50" style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>
            {/* Header */}
            <header
                className={`fixed w-full top-0 z-50 transition-all duration-500 ${
                    scrollY > 50
                        ? 'bg-white/98 backdrop-blur-md shadow-sm border-b border-zinc-100'
                        : 'bg-gradient-to-b from-black/60 to-transparent'
                }`}
            >
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <Link to="/" className="flex items-center">
                            <Feather className={`w-7 h-7 mr-3 ${scrollY > 50 ? 'text-zinc-900' : 'text-white'}`} />
                            <div>
                                <h1 className={`text-2xl font-serif tracking-wider ${
                                    scrollY > 50 ? 'text-zinc-900' : 'text-white'
                                }`}>
                                    BIBLIOTHECA
                                </h1>
                                <p className={`text-xs tracking-widest font-light ${
                                    scrollY > 50 ? 'text-zinc-500' : 'text-white/80'
                                }`}>
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
                                    className={`text-sm tracking-wide font-light transition-colors ${
                                        scrollY > 50
                                            ? 'text-zinc-700 hover:text-zinc-900'
                                            : 'text-white hover:text-white/80'
                                    }`}
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </nav>

                        <div className="flex items-center space-x-5">
                            <button className={`transition-colors ${
                                scrollY > 50 ? 'text-zinc-700 hover:text-zinc-900' : 'text-white hover:text-white/80'
                            }`}>
                                <Search className="w-5 h-5" />
                            </button>
                            <button className={`transition-colors ${
                                scrollY > 50 ? 'text-zinc-700 hover:text-zinc-900' : 'text-white hover:text-white/80'
                            }`}>
                                <Heart className="w-5 h-5" />
                            </button>
                            <Link to="/login" className={`transition-colors ${
                                scrollY > 50 ? 'text-zinc-700 hover:text-zinc-900' : 'text-white hover:text-white/80'
                            }`}>
                                <User className="w-5 h-5" />
                            </Link>
                            <Link to="/cart" className={`relative transition-colors ${
                                scrollY > 50 ? 'text-zinc-700 hover:text-zinc-900' : 'text-white hover:text-white/80'
                            }`}>
                                <ShoppingBag className="w-5 h-5" />
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-900 rounded-full text-white text-xs flex items-center justify-center font-medium">
                  3
                </span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Hero Slider */}
            <section className="relative h-screen overflow-hidden bg-black">
                {heroSlides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-2000 ${
                            currentSlide === index ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <img
                            src={slide.image}
                            alt={slide.title}
                            className="w-full h-full object-cover opacity-60"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
                        <div className="absolute inset-0 flex items-center">
                            <div className="max-w-7xl mx-auto px-6 lg:px-8 w-full">
                                <div className="max-w-2xl">
                                    <p className="text-zinc-300 text-sm tracking-widest mb-4 uppercase font-light">
                                        {slide.description}
                                    </p>
                                    <h2 className="text-6xl lg:text-7xl font-serif text-white mb-4 leading-tight">
                                        {slide.title}
                                    </h2>
                                    <p className="text-2xl text-zinc-300 mb-10" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 300 }}>
                                        {slide.subtitle}
                                    </p>
                                    <button className="group bg-white text-zinc-900 px-10 py-4 font-light text-sm tracking-wider hover:bg-zinc-100 transition-all inline-flex items-center space-x-3">
                                        <span>컬렉션 보기</span>
                                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-px rounded-full transition-all duration-500 ${
                                currentSlide === index ? 'w-16 bg-white' : 'w-8 bg-white/40'
                            }`}
                        />
                    ))}
                </div>
            </section>

            {/* Collections */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 -mt-24 relative z-10">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {collections.map((collection, index) => (
                        <Link
                            key={index}
                            to={`/category/${collection.category}`}
                            className="group relative h-96 bg-white rounded-sm overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            <img
                                src={collection.image}
                                alt={collection.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                            <div className="absolute inset-0 flex flex-col justify-end p-6">
                                <p className="text-zinc-300 text-xs tracking-widest mb-2 uppercase font-light">
                                    {collection.count}
                                </p>
                                <h3 className="text-white text-2xl font-serif mb-1">{collection.name}</h3>
                                <p className="text-zinc-400 text-sm" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 300 }}>{collection.subtitle}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Featured Books */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-32">
                <div className="text-center mb-16">
                    <p className="text-zinc-500 text-sm tracking-widest mb-3 uppercase font-light">Curated Selection</p>
                    <h3 className="text-5xl font-serif text-zinc-900 mb-4" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                        엄선된 도서
                    </h3>
                    <p className="text-zinc-600 text-lg max-w-2xl mx-auto" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 }}>
                        좋은 책들로만 엄선하여 골랐습니다.
                    </p>
                </div>

                {loadingBooks && (
                    <div className="text-center text-zinc-500">불러오는 중…</div>
                )}

                {!loadingBooks && errorBooks && (
                    <div className="text-center text-red-600">로드 실패: {errorBooks}</div>
                )}

                {!loadingBooks && !errorBooks && books.length === 0 && (
                    <div className="text-center text-zinc-500">표시할 도서가 없습니다.</div>
                )}

                {!loadingBooks && !errorBooks && books.length > 0 && (
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {books.map((book) => (
                            <div
                                key={book.id}
                                className="group bg-white rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                onClick={() => navigate(`/book/${book.id}`)}
                            >
                                <div className="relative aspect-[2/3] overflow-hidden bg-zinc-100">
                                    <img
                                        src={book.imageUrl || book.image || 'https://placehold.co/600x900?text=Book'}
                                        alt={book.title}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x900?text=Book'; }}
                                    />
                                    {book.badge && (
                                        <div className={`absolute top-4 left-4 ${badges[book.badge] || 'bg-zinc-800'} text-white px-3 py-1 text-xs font-light tracking-wider`}>
                                            {book.badge}
                                        </div>
                                    )}
                                    <button
                                        onClick={(e) => e.stopPropagation()}
                                        className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                                    >
                                        <Heart className="w-4 h-4 text-zinc-900" />
                                    </button>
                                </div>

                                <div className="p-6">
                                    <p className="text-zinc-500 text-xs tracking-widest mb-2 uppercase font-light">
                                        {book.author}
                                    </p>
                                    <h4 className="font-serif text-zinc-900 text-lg mb-1 group-hover:text-zinc-700 transition-colors">
                                        {book.title}
                                    </h4>
                                    {book.translator && (
                                        <p className="text-zinc-500 text-sm font-light mb-4">{book.translator}</p>
                                    )}

                                    <div className="flex items-end justify-between">
                                        <div className="text-2xl font-light text-zinc-900">
                                            ₩{Number(book.price || 0).toLocaleString()}
                                        </div>
                                        <button className="text-xs tracking-wider text-zinc-900 hover:text-zinc-600 transition-colors uppercase font-light">
                                            상세보기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/*
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="group bg-white rounded-sm overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                            onClick={() => navigate(`/book/${book.id}`)}
                        >
                            <div className="relative aspect-[2/3] overflow-hidden bg-zinc-100">
                                <img
                                    src={book.image}
                                    alt={book.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                {book.badge && (
                                    <div className={`absolute top-4 left-4 ${badges[book.badge]} text-white px-3 py-1 text-xs font-light tracking-wider`}>
                                        {book.badge}
                                    </div>
                                )}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        // 찜하기 기능
                                    }}
                                    className="absolute top-4 right-4 w-10 h-10 bg-white/95 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white"
                                >
                                    <Heart className="w-4 h-4 text-zinc-900" />
                                </button>
                            </div>

                            <div className="p-6">
                                <p className="text-zinc-500 text-xs tracking-widest mb-2 uppercase font-light">
                                    {book.author}
                                </p>
                                <h4 className="font-serif text-zinc-900 text-lg mb-1 group-hover:text-zinc-700 transition-colors">
                                    {book.title}
                                </h4>
                                <p className="text-zinc-500 text-sm font-light mb-4">{book.translator}</p>

                                <div className="flex items-end justify-between">
                                    <div className="text-2xl font-light text-zinc-900">
                                        ₩{book.price.toLocaleString()}
                                    </div>
                                    <button className="text-xs tracking-wider text-zinc-900 hover:text-zinc-600 transition-colors uppercase font-light">
                                        상세보기
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                */}
            </section>

            {/* Premium Service */}
            <section className="bg-zinc-900 text-white py-24">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-16">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Award className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="font-serif text-xl mb-3" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>큐레이션 서비스</h4>
                            <p className="text-zinc-400 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 }}>
                                전문 북큐레이터의<br />맞춤형 도서 추천
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <BookOpen className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="font-serif text-xl mb-3" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>독서 클럽</h4>
                            <p className="text-zinc-400 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 }}>
                                깊이 있는 토론과<br />문학적 교류의 장
                            </p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Star className="w-8 h-8 text-white" />
                            </div>
                            <h4 className="font-serif text-xl mb-3" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>저자와의 만남</h4>
                            <p className="text-zinc-400 leading-relaxed" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 }}>
                                작가와 독자가<br />함께하는 문학 살롱
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter */}
            <section className="max-w-4xl mx-auto px-6 lg:px-8 py-24">
                <div className="text-center">
                    <h3 className="text-4xl font-serif text-zinc-900 mb-4" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                        뉴스레터 구독
                    </h3>
                    <p className="text-zinc-600 mb-10" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 }}>
                        엄선된 신간과 문학 소식을 가장 먼저 받아보세요
                    </p>
                    <div className="flex max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="이메일을 입력하세요"
                            className="flex-1 px-6 py-4 border border-zinc-300 focus:outline-none focus:border-zinc-900 transition-colors font-light"
                        />
                        <button className="bg-zinc-900 text-white px-8 py-4 hover:bg-zinc-800 transition-colors text-sm tracking-wider font-light">
                            구독하기
                        </button>
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

export default MainPage;
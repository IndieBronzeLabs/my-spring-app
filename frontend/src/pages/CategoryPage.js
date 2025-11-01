import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, User, Feather, SlidersHorizontal, Grid, List, Star } from 'lucide-react';

function CategoryPage() {
    const { category } = useParams();
    const navigate = useNavigate();
    const [scrollY, setScrollY] = useState(0);
    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('popular');

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

    const categoryInfo = {
        literature: { name: '문학', description: '시대를 초월한 문학 작품' },
        philosophy: { name: '철학', description: '사유의 깊이를 더하는 철학서' },
        art: { name: '예술', description: '시각적 영감을 주는 예술 서적' },
        poetry: { name: '시 & 에세이', description: '언어의 예술' },
        new: { name: '신간', description: '최신 출간 도서' }
    };

    const currentCategory = categoryInfo[category] || { name: '전체', description: '모든 도서' };

    // 샘플 도서 데이터
    const allBooks = [
        {
            id: 1,
            title: "The Metamorphosis",
            author: "Franz Kafka",
            translator: "김영웅 역",
            price: 14500,
            originalPrice: 16000,
            image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=600&h=900&fit=crop",
            publisher: "민음사",
            rating: 4.8,
            reviews: 1247,
            badge: "CLASSIC",
            category: "literature"
        },
        {
            id: 2,
            title: "Norwegian Wood",
            author: "Haruki Murakami",
            translator: "양억관 역",
            price: 16800,
            image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600&h=900&fit=crop",
            publisher: "문학사상",
            rating: 4.7,
            reviews: 2341,
            badge: "BESTSELLER",
            category: "literature"
        },
        {
            id: 3,
            title: "Being and Time",
            author: "Martin Heidegger",
            translator: "이기상 역",
            price: 38000,
            image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=600&h=900&fit=crop",
            publisher: "까치",
            rating: 4.9,
            reviews: 892,
            badge: "PHILOSOPHY",
            category: "philosophy"
        },
        {
            id: 4,
            title: "The Stranger",
            author: "Albert Camus",
            translator: "김화영 역",
            price: 12000,
            image: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&h=900&fit=crop",
            publisher: "민음사",
            rating: 4.8,
            reviews: 1523,
            badge: "ESSENTIAL",
            category: "literature"
        },
        {
            id: 5,
            title: "Collected Poems",
            author: "Rainer Maria Rilke",
            translator: "김재혁 역",
            price: 24000,
            image: "https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=600&h=900&fit=crop",
            publisher: "문학동네",
            rating: 4.6,
            reviews: 678,
            badge: null,
            category: "poetry"
        },
        {
            id: 6,
            title: "1984",
            author: "George Orwell",
            translator: "정회성 역",
            price: 13500,
            image: "https://images.unsplash.com/photo-1524578271613-d550eacf6090?w=600&h=900&fit=crop",
            publisher: "민음사",
            rating: 4.9,
            reviews: 3214,
            badge: "ESSENTIAL",
            category: "literature"
        },
        {
            id: 7,
            title: "Sapiens",
            author: "Yuval Noah Harari",
            translator: "조현욱 역",
            price: 22500,
            image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&h=900&fit=crop",
            publisher: "김영사",
            rating: 4.8,
            reviews: 4567,
            badge: "BESTSELLER",
            category: "philosophy"
        },
        {
            id: 8,
            title: "The Art of Loving",
            author: "Erich Fromm",
            translator: "황문수 역",
            price: 15000,
            image: "https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=600&h=900&fit=crop",
            publisher: "문예출판사",
            rating: 4.7,
            reviews: 1890,
            badge: null,
            category: "philosophy"
        },
        {
            id: 9,
            title: "The Picture of Dorian Gray",
            author: "Oscar Wilde",
            translator: "윤혜준 역",
            price: 13200,
            image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=900&fit=crop",
            publisher: "열린책들",
            rating: 4.8,
            reviews: 2156,
            badge: "CLASSIC",
            category: "literature"
        },
        {
            id: 10,
            title: "On Photography",
            author: "Susan Sontag",
            translator: "이재원 역",
            price: 18500,
            image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=900&fit=crop",
            publisher: "이후",
            rating: 4.6,
            reviews: 734,
            badge: null,
            category: "art"
        },
        {
            id: 11,
            title: "Ways of Seeing",
            author: "John Berger",
            translator: "박범수 역",
            price: 14800,
            image: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=600&h=900&fit=crop",
            publisher: "열화당",
            rating: 4.7,
            reviews: 1023,
            badge: null,
            category: "art"
        },
        {
            id: 12,
            title: "The Death of Ivan Ilyich",
            author: "Leo Tolstoy",
            translator: "연진희 역",
            price: 11000,
            image: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=600&h=900&fit=crop",
            publisher: "민음사",
            rating: 4.9,
            reviews: 1567,
            badge: "CLASSIC",
            category: "literature"
        }
    ];

    // 필터링된 도서
    const filteredBooks = category && category !== 'all'
        ? allBooks.filter(book => book.category === category)
        : allBooks;

    const badges = {
        "CLASSIC": "bg-gradient-to-r from-amber-700 to-amber-900",
        "BESTSELLER": "bg-gradient-to-r from-blue-700 to-indigo-900",
        "PHILOSOPHY": "bg-gradient-to-r from-purple-700 to-purple-900",
        "ESSENTIAL": "bg-gradient-to-r from-gray-700 to-gray-900"
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
                                    className={`text-sm tracking-wide font-light transition-colors ${
                                        category === item.path.split('/')[2]
                                            ? 'text-zinc-900 font-medium'
                                            : 'text-zinc-700 hover:text-zinc-900'
                                    }`}
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

            {/* Category Header */}
            <section className="bg-white border-b border-zinc-200 mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <h1 className="text-5xl font-serif text-zinc-900 mb-4" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 600 }}>
                        {currentCategory.name}
                    </h1>
                    <p className="text-xl text-zinc-600" style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 }}>
                        {currentCategory.description}
                    </p>
                    <p className="text-sm text-zinc-500 mt-4">
                        {filteredBooks.length}권의 도서
                    </p>
                </div>
            </section>

            {/* Filters & Sort */}
            <section className="bg-white border-b border-zinc-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <button className="flex items-center space-x-2 px-4 py-2 border border-zinc-300 rounded-lg hover:bg-zinc-50 transition-colors">
                                <SlidersHorizontal className="w-4 h-4" />
                                <span className="text-sm">필터</span>
                            </button>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:border-zinc-900 transition-colors text-sm"
                            >
                                <option value="popular">인기순</option>
                                <option value="newest">최신순</option>
                                <option value="price-low">낮은 가격순</option>
                                <option value="price-high">높은 가격순</option>
                                <option value="rating">평점순</option>
                            </select>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
                            >
                                <Grid className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded ${viewMode === 'list' ? 'bg-zinc-900 text-white' : 'text-zinc-600 hover:bg-zinc-100'}`}
                            >
                                <List className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Books Grid/List */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                {viewMode === 'grid' ? (
                    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {filteredBooks.map((book) => (
                            <div
                                key={book.id}
                                onClick={() => navigate(`/book/${book.id}`)}
                                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
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
                                </div>

                                <div className="p-6">
                                    <p className="text-zinc-500 text-xs tracking-widest mb-2 uppercase font-light">
                                        {book.author}
                                    </p>
                                    <h3 className="font-serif text-zinc-900 text-lg mb-1 group-hover:text-zinc-700 transition-colors line-clamp-2">
                                        {book.title}
                                    </h3>
                                    <p className="text-zinc-500 text-sm font-light mb-3">{book.translator}</p>

                                    <div className="flex items-center space-x-1 mb-4">
                                        <Star className="w-4 h-4 fill-zinc-900 text-zinc-900" />
                                        <span className="text-sm font-medium text-zinc-900">{book.rating}</span>
                                        <span className="text-xs text-zinc-400">({book.reviews.toLocaleString()})</span>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <div>
                                            {book.originalPrice && (
                                                <div className="text-sm text-zinc-400 line-through mb-1">
                                                    ₩{book.originalPrice.toLocaleString()}
                                                </div>
                                            )}
                                            <div className="text-2xl font-light text-zinc-900">
                                                ₩{book.price.toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="space-y-6">
                        {filteredBooks.map((book) => (
                            <div
                                key={book.id}
                                onClick={() => navigate(`/book/${book.id}`)}
                                className="bg-white rounded-lg shadow-md p-6 flex gap-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                            >
                                <div className="w-32 h-48 flex-shrink-0 bg-zinc-100 rounded overflow-hidden">
                                    <img
                                        src={book.image}
                                        alt={book.title}
                                        className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                </div>

                                <div className="flex-1">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1">
                                            {book.badge && (
                                                <span className={`inline-block ${badges[book.badge]} text-white px-3 py-1 text-xs font-light tracking-wider mb-3`}>
                          {book.badge}
                        </span>
                                            )}
                                            <h3 className="font-serif text-2xl text-zinc-900 mb-2">{book.title}</h3>
                                            <p className="text-zinc-600 mb-1">{book.author}</p>
                                            <p className="text-sm text-zinc-500">{book.translator}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center space-x-1 mb-4">
                                        <Star className="w-5 h-5 fill-zinc-900 text-zinc-900" />
                                        <span className="text-lg font-medium text-zinc-900">{book.rating}</span>
                                        <span className="text-sm text-zinc-400">({book.reviews.toLocaleString()} 리뷰)</span>
                                    </div>

                                    <div className="flex items-end justify-between">
                                        <div>
                                            {book.originalPrice && (
                                                <div className="text-lg text-zinc-400 line-through mb-1">
                                                    ₩{book.originalPrice.toLocaleString()}
                                                </div>
                                            )}
                                            <div className="text-3xl font-light text-zinc-900">
                                                ₩{book.price.toLocaleString()}
                                            </div>
                                        </div>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                alert('장바구니에 담았습니다!');
                                            }}
                                            className="bg-zinc-900 text-white px-8 py-3 rounded-lg hover:bg-zinc-800 transition-colors"
                                        >
                                            장바구니 담기
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
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
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center text-sm">
                        <p className="text-zinc-500 font-light">
                            © 2024 BIBLIOTHECA. All rights reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default CategoryPage;
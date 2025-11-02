// src/pages/CategoryPage.jsx
import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Heart, User, Feather, SlidersHorizontal, Grid, List, Star } from 'lucide-react';

function CategoryPage() {
    const { category } = useParams(); // 라우트: /category/:category  (예: history, science, economy, humanity)
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState('grid');
    const [sortBy, setSortBy] = useState('newest'); // 기본 최신순
    const [categories, setCategories] = useState([]);
    const [catLoading, setCatLoading] = useState(true);
    const [catError, setCatError] = useState('');

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [page, setPage] = useState(0);
    const size = 12;
    const [total, setTotal] = useState(0);
    const [hasMore, setHasMore] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    // 정렬 파라미터 매핑 (백엔드 허용 필드 기준: id/title/author/price/publisher/isbn/status)
    const sortParam = useMemo(() => {
        switch (sortBy) {
            case 'newest':
                return 'id,desc';
            case 'price-low':
                return 'price,asc';
            case 'price-high':
                return 'price,desc';
            case 'title':
                return 'title,asc';
            default:
                return 'id,desc'; // popular 등 미정의 → 최신
        }
    }, [sortBy]);

    // 카테고리 목록 (이름 표기용)
    useEffect(() => {
        setCatLoading(true);
        fetch('/api/categories?withCounts=1&status=ACTIVE')
            .then(r => r.json())
            .then(data => setCategories(Array.isArray(data) ? data : []))
            .catch(err => setCatError(err.message || '카테고리 로드 실패'))
            .finally(() => setCatLoading(false));
    }, []);

    const currentCategory = useMemo(() => {
        if (!Array.isArray(categories)) return null;
        return categories.find(c => c.code === category) || null;
    }, [categories, category]);

    // 도서 초기 로드 (카테고리/정렬 바뀔 때 리셋)
    useEffect(() => {
        const init = async () => {
            setLoading(true);
            setBooks([]);
            setError('');
            setPage(0);
            try {
                const res = await fetch(`/api/books?category=${encodeURIComponent(category)}&page=0&size=${size}&sort=${encodeURIComponent(sortParam)}`);
                const data = await res.json();
                const items = Array.isArray(data?.content) ? data.content : [];
                setBooks(items);
                const totalElements = Number(data?.totalElements ?? 0);
                setTotal(totalElements);
                setHasMore(items.length < totalElements);
            } catch (e) {
                setError('도서 목록을 불러오는 중 오류가 발생했습니다.');
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        init();
    }, [category, sortParam]);

    const loadMore = async () => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
        try {
            const next = page + 1;
            const res = await fetch(`/api/books?category=${encodeURIComponent(category)}&page=${next}&size=${size}&sort=${encodeURIComponent(sortParam)}`);
            const data = await res.json();
            const items = Array.isArray(data?.content) ? data.content : [];
            setBooks(prev => {
                const merged = [...prev, ...items];
                setHasMore(merged.length < total);
                return merged;
            });
            setPage(next);
        } catch (e) {
            console.error(e);
        } finally {
            setLoadingMore(false);
        }
    };

    const badges = {
        CLASSIC: 'bg-gradient-to-r from-amber-700 to-amber-900',
        BESTSELLER: 'bg-gradient-to-r from-blue-700 to-indigo-900',
        PHILOSOPHY: 'bg-gradient-to-r from-purple-700 to-purple-900',
        ESSENTIAL: 'bg-gradient-to-r from-gray-700 to-gray-900'
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
                                <h1 className="text-2xl font-serif tracking-wider text-zinc-900">BIBLIOTHECA</h1>
                                <p className="text-xs tracking-widest font-light text-zinc-500">FINE LITERATURE</p>
                            </div>
                        </Link>

                        {/* 헤더 네비를 DB 카테고리로 동기화 */}
                        <nav className="hidden lg:flex items-center space-x-10">
                            {catLoading && [1,2,3,4].map(i => (
                                <span key={i} className="w-14 h-4 bg-zinc-200 rounded animate-pulse" />
                            ))}
                            {!catLoading && !catError && categories.map((c) => (
                                <Link
                                    key={c.id}
                                    to={`/category/${c.code}`}
                                    className={`text-sm tracking-wide font-light transition-colors ${
                                        category === c.code ? 'text-zinc-900 font-medium' : 'text-zinc-700 hover:text-zinc-900'
                                    }`}
                                >
                                    {c.name}
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
                                <span className="absolute -top-1 -right-1 w-4 h-4 bg-zinc-900 rounded-full text-white text-xs flex items-center justify-center font-medium">3</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>

            {/* Category Header */}
            <section className="bg-white border-b border-zinc-200 mt-20">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
                    <h1
                        className="text-5xl font-serif text-zinc-900 mb-4"
                        style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 600 }}
                    >
                        {currentCategory ? currentCategory.name : '카테고리'}
                    </h1>
                    <p
                        className="text-xl text-zinc-600"
                        style={{ fontFamily: "'Noto Sans KR', sans-serif", fontWeight: 300 }}
                    >
                        {currentCategory ? `${currentCategory.name} 분야의 도서` : '이 분야의 도서 목록입니다.'}
                    </p>
                    <p className="text-sm text-zinc-500 mt-4">{total}권의 도서</p>
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
                                <option value="newest">최신순</option>
                                <option value="price-low">낮은 가격순</option>
                                <option value="price-high">높은 가격순</option>
                                <option value="title">제목순</option>
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

            {/* Books */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
                {loading && <div className="text-center text-zinc-500">불러오는 중…</div>}
                {error && <div className="text-center text-red-600">{error}</div>}

                {!loading && !error && books.length === 0 && (
                    <div className="text-center text-zinc-500">표시할 도서가 없습니다.</div>
                )}

                {!loading && !error && books.length > 0 && (
                    viewMode === 'grid' ? (
                        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8">
                            {books.map((book) => (
                                <div
                                    key={book.id}
                                    onClick={() => navigate(`/book/${book.id}`)}
                                    className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer"
                                >
                                    <div className="relative aspect-[2/3] overflow-hidden bg-zinc-100">
                                        <img
                                            src={book.imageUrl || 'https://placehold.co/600x900?text=Book'}
                                            alt={book.title}
                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x900?text=Book'; }}
                                        />
                                        {book.badge && (
                                            <div className={`absolute top-4 left-4 ${badges[book.badge] || 'bg-zinc-800'} text-white px-3 py-1 text-xs font-light tracking-wider`}>
                                                {book.badge}
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-6">
                                        <p className="text-zinc-500 text-xs tracking-widest mb-2 uppercase font-light">{book.author}</p>
                                        <h3 className="font-serif text-zinc-900 text-lg mb-1 group-hover:text-zinc-700 transition-colors line-clamp-2">
                                            {book.title}
                                        </h3>
                                        {book.translator && <p className="text-zinc-500 text-sm font-light mb-3">{book.translator}</p>}
                                        <div className="flex items-end justify-between">
                                            <div className="text-2xl font-light text-zinc-900">₩{Number(book.price || 0).toLocaleString()}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {books.map((book) => (
                                <div
                                    key={book.id}
                                    onClick={() => navigate(`/book/${book.id}`)}
                                    className="bg-white rounded-lg shadow-md p-6 flex gap-6 hover:shadow-xl transition-all duration-300 cursor-pointer"
                                >
                                    <div className="w-32 h-48 flex-shrink-0 bg-zinc-100 rounded overflow-hidden">
                                        <img
                                            src={book.imageUrl || 'https://placehold.co/600x900?text=Book'}
                                            alt={book.title}
                                            className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
                                            onError={(e) => { e.currentTarget.src = 'https://placehold.co/600x900?text=Book'; }}
                                        />
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                {book.badge && (
                                                    <span className={`inline-block ${badges[book.badge] || 'bg-zinc-800'} text-white px-3 py-1 text-xs font-light tracking-wider mb-3`}>
                            {book.badge}
                          </span>
                                                )}
                                                <h3 className="font-serif text-2xl text-zinc-900 mb-2">{book.title}</h3>
                                                <p className="text-zinc-600 mb-1">{book.author}</p>
                                                {book.translator && <p className="text-sm text-zinc-500">{book.translator}</p>}
                                            </div>
                                        </div>

                                        <div className="flex items-center space-x-1 mb-4">
                                            <Star className="w-5 h-5 text-zinc-300" />
                                            <span className="text-sm text-zinc-400">평점 데이터 없음</span>
                                        </div>

                                        <div className="flex items-end justify-between">
                                            <div className="text-3xl font-light text-zinc-900">
                                                ₩{Number(book.price || 0).toLocaleString()}
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
                    )
                )}

                {/* 더보기 */}
                {!loading && !error && books.length > 0 && (
                    <div className="mt-12 flex justify-center">
                        {hasMore ? (
                            <button
                                onClick={loadMore}
                                disabled={loadingMore || !hasMore}
                                className="px-8 py-3 border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors text-sm tracking-wider font-light disabled:opacity-60"
                            >
                                {loadingMore ? '불러오는 중…' : '더보기'}
                            </button>
                        ) : (
                            <div className="text-zinc-400 text-sm">모든 도서를 다 보셨습니다.</div>
                        )}
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
                        <p className="text-zinc-500 font-light">© 2024 BIBLIOTHECA. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default CategoryPage;

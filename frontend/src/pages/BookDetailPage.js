// src/pages/BookDetailPage.js
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
    ShoppingBag, Search, Heart, User, Feather,
    Star, Minus, Plus, Share2
} from 'lucide-react';

function BookDetailPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    // UI 상태
    const [scrollY, setScrollY] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [tab, setTab] = useState('description'); // description | toc | author | reviews

    // 데이터 상태
    const [book, setBook] = useState(null);                 // 기본 도서
    const [detail, setDetail] = useState(null);             // book_details
    const [toc, setToc] = useState([]);                     // book_toc_items[]
    const [authorNotes, setAuthorNotes] = useState(null);   // book_author_notes
    const [reviews, setReviews] = useState([]);             // book_reviews[]
    const [rvPage, setRvPage] = useState(0);
    const [rvHasMore, setRvHasMore] = useState(false);

    // 로딩/에러
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');

    useEffect(() => {
        const link = document.createElement('link');
        link.href =
            'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700&family=Noto+Sans+KR:wght@300;400;500;600;700&display=swap';
        link.rel = 'stylesheet';
        document.head.appendChild(link);
    }, []);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 통합 응답 시도 → 실패 시 폴백으로 개별 호출
    useEffect(() => {
        let aborted = false;
        const fetchAll = async () => {
            setLoading(true);
            setErr('');
            try {
                // 1) full 응답 우선
                const fullRes = await fetch(`/api/books/${id}/full`);
                if (fullRes.ok) {
                    const full = await fullRes.json();
                    if (aborted) return;

                    setBook(full.book ?? null);
                    setDetail(full.detail ?? null);
                    setToc(Array.isArray(full.toc) ? full.toc : []);
                    setAuthorNotes(full.authorNotes ?? null);

                    const rv = full.reviews ?? { content: [], hasNext: false, page: 0 };
                    setReviews(Array.isArray(rv.content) ? rv.content : []);
                    setRvHasMore(Boolean(rv.hasNext));
                    setRvPage(Number(rv.page ?? 0));
                    setLoading(false);
                    return;
                }

                // 2) 폴백: 개별 엔드포인트 병렬
                const [bRes, dRes, tRes, aRes, rRes] = await Promise.allSettled([
                    fetch(`/api/books/${id}`),
                    fetch(`/api/books/${id}/detail`),
                    fetch(`/api/books/${id}/toc`),
                    fetch(`/api/books/${id}/author-notes`),
                    fetch(`/api/books/${id}/reviews?page=0&size=10&sort=created_at,desc`)
                ]);

                if (aborted) return;

                // book
                if (bRes.status === 'fulfilled' && bRes.value.ok) {
                    setBook(await bRes.value.json());
                } else {
                    throw new Error('도서 정보를 불러오지 못했습니다.');
                }

                // detail
                if (dRes.status === 'fulfilled' && dRes.value.ok) {
                    setDetail(await dRes.value.json());
                } else {
                    setDetail(null);
                }

                // toc
                if (tRes.status === 'fulfilled' && tRes.value.ok) {
                    const arr = await tRes.value.json();
                    setToc(Array.isArray(arr) ? arr : []);
                } else {
                    setToc([]);
                }

                // author notes
                if (aRes.status === 'fulfilled' && aRes.value.ok) {
                    setAuthorNotes(await aRes.value.json());
                } else {
                    setAuthorNotes(null);
                }

                // reviews
                if (rRes.status === 'fulfilled' && rRes.value.ok) {
                    const rv = await rRes.value.json();
                    const items = Array.isArray(rv?.content) ? rv.content : [];
                    setReviews(items);
                    setRvHasMore(Boolean(rv?.hasNext));
                    setRvPage(Number(rv?.page ?? 0));
                } else {
                    setReviews([]);
                    setRvHasMore(false);
                    setRvPage(0);
                }

            } catch (e) {
                if (!aborted) setErr(e.message || '로드 실패');
            } finally {
                if (!aborted) setLoading(false);
            }
        };

        fetchAll();
        return () => { aborted = true; };
    }, [id]);

    // 리뷰 더보기
    const loadMoreReviews = async () => {
        if (!rvHasMore) return;
        try {
            const next = rvPage + 1;
            const res = await fetch(`/api/books/${id}/reviews?page=${next}&size=10&sort=created_at,desc`);
            if (!res.ok) return;
            const data = await res.json();
            const items = Array.isArray(data?.content) ? data.content : [];
            setReviews(prev => [...prev, ...items]);
            setRvHasMore(Boolean(data?.hasNext));
            setRvPage(Number(data?.page ?? next));
        } catch (e) {
            console.error(e);
        }
    };

    const price = useMemo(() => Number(book?.price ?? 0), [book]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-zinc-500">
                불러오는 중…
            </div>
        );
    }
    if (err || !book) {
        return (
            <div className="min-h-screen flex items-center justify-center text-red-600">
                {err || '도서를 찾을 수 없습니다.'}
            </div>
        );
    }

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

                        <nav className="hidden lg:flex items-center space-x-10">
                            {[
                                { name: '역사', path: '/category/history' },
                                { name: '과학', path: '/category/science' },
                                { name: '경제', path: '/category/economy' },
                                { name: '인문', path: '/category/humanity' }
                            ].map((item) => (
                                <Link key={item.name} to={item.path} className="text-sm tracking-wide font-light text-zinc-700 hover:text-zinc-900">
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

            {/* Book Section */}
            <section className="max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
                <div className="grid md:grid-cols-2 gap-16">
                    {/* Image */}
                    <div className="sticky top-32 h-fit">
                        <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                            <img
                                src={book.imageUrl || book.image || 'https://placehold.co/800x1200?text=Book'}
                                alt={book.title}
                                className="w-full aspect-[2/3] object-cover"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/800x1200?text=Book'; }}
                            />
                        </div>
                    </div>

                    {/* Info */}
                    <div>
                        <div className="mb-6">
                            <p className="text-zinc-500 text-sm tracking-widest uppercase mb-2">
                                {book?.category?.name || book?.category?.code || '카테고리'}
                            </p>
                            <h1 className="text-4xl font-serif text-zinc-900 mb-4" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 600 }}>
                                {book.title}
                            </h1>
                            <p className="text-xl text-zinc-600 mb-2">{book.author}</p>
                            {book.translator && <p className="text-sm text-zinc-500">{book.translator}</p>}
                        </div>

                        {/* Rating (있으면 표시) */}
                        {Number.isFinite(book.rating) && (
                            <div className="flex items-center space-x-4 mb-8 pb-8 border-b border-zinc-200">
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(book.rating) ? 'fill-zinc-900 text-zinc-900' : 'text-zinc-300'}`} />
                                    ))}
                                </div>
                                <span className="text-lg font-medium text-zinc-900">{book.rating}</span>
                                {Number.isFinite(book.reviewCount) && <span className="text-sm text-zinc-500">({book.reviewCount.toLocaleString()} 리뷰)</span>}
                            </div>
                        )}

                        {/* Details */}
                        <div className="space-y-3 mb-8 pb-8 border-b border-zinc-200">
                            <div className="flex justify-between">
                                <span className="text-zinc-500">출판사</span>
                                <span className="text-zinc-900 font-light">{book.publisher || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">출간일</span>
                                <span className="text-zinc-900 font-light">{detail?.publication_date || '-'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">페이지</span>
                                <span className="text-zinc-900 font-light">{detail?.pages ? `${detail.pages}쪽` : '-'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-zinc-500">ISBN</span>
                                <span className="text-zinc-900 font-light">{book.isbn || '-'}</span>
                            </div>
                            {detail?.binding && (
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">제본</span>
                                    <span className="text-zinc-900 font-light">{detail.binding}</span>
                                </div>
                            )}
                            {detail?.language && (
                                <div className="flex justify-between">
                                    <span className="text-zinc-500">언어</span>
                                    <span className="text-zinc-900 font-light">{detail.language}</span>
                                </div>
                            )}
                        </div>

                        {/* Price */}
                        <div className="mb-8">
                            {book.originalPrice && (
                                <div className="text-lg text-zinc-400 line-through mb-2">
                                    ₩{Number(book.originalPrice).toLocaleString()}
                                </div>
                            )}
                            <div className="text-4xl font-light text-zinc-900 mb-2">
                                ₩{price.toLocaleString()}
                            </div>
                            {book.originalPrice && (
                                <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded text-sm font-medium">
                                    {Math.round((1 - price / Number(book.originalPrice)) * 100)}% 할인
                                </div>
                            )}
                        </div>

                        {/* Quantity */}
                        <div className="mb-8">
                            <label className="block text-sm text-zinc-600 mb-3">수량</label>
                            <div className="flex items-center space-x-4">
                                <div className="flex items-center border border-zinc-300 rounded-lg">
                                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-zinc-100 transition-colors">
                                        <Minus className="w-4 h-4" />
                                    </button>
                                    <span className="px-8 text-lg font-medium">{quantity}</span>
                                    <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-zinc-100 transition-colors">
                                        <Plus className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="text-zinc-500">
                                    총 <span className="text-xl font-medium text-zinc-900">₩{(price * quantity).toLocaleString()}</span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-4 mb-6">
                            <button
                                onClick={() => alert(`${book.title} ${quantity}권을 장바구니에 담았습니다.`)}
                                className="flex-1 bg-zinc-900 text-white py-4 rounded-lg hover:bg-zinc-800 transition-colors font-light tracking-wider"
                            >
                                장바구니 담기
                            </button>
                            <button
                                onClick={() => navigate('/checkout')}
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

            {/* Tabs */}
            <section className="bg-white border-t border-zinc-200">
                <div className="max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="flex border-b border-zinc-200">
                        {[
                            { id: 'description', label: '상세 정보' },
                            { id: 'toc', label: `목차${toc.length ? ` (${toc.length})` : ''}` },
                            { id: 'author', label: '저자 소개' },
                            { id: 'reviews', label: `리뷰${reviews.length ? ` (${reviews.length})` : ''}` }
                        ].map(t => (
                            <button
                                key={t.id}
                                onClick={() => setTab(t.id)}
                                className={`px-8 py-4 font-light tracking-wide transition-colors ${
                                    tab === t.id ? 'border-b-2 border-zinc-900 text-zinc-900' : 'text-zinc-500 hover:text-zinc-900'
                                }`}
                            >
                                {t.label}
                            </button>
                        ))}
                    </div>

                    <div className="py-16">
                        {/* 상세 정보 */}
                        {tab === 'description' && (
                            <div className="max-w-3xl">
                                <h3 className="text-2xl font-serif text-zinc-900 mb-6" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                    책 소개
                                </h3>
                                <div className="text-zinc-700 leading-relaxed whitespace-pre-line" style={{ lineHeight: '1.8' }}>
                                    {detail?.description || '소개 정보가 없습니다.'}
                                </div>

                                {/* ⭐ 수정: keywords 처리 */}
                                {detail?.keywords && (
                                    <div className="mt-6 flex flex-wrap gap-2">
                                        {(() => {
                                            try {
                                                // JSON 문자열이면 파싱
                                                const parsed = JSON.parse(detail.keywords);
                                                if (Array.isArray(parsed)) {
                                                    return parsed.map((k, i) => (
                                                        <span key={i} className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
                                    #{k}
                                </span>
                                                    ));
                                                }
                                            } catch (e) {
                                                // JSON이 아니면 그냥 문자열로 표시
                                                return (
                                                    <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-1 rounded">
                                {detail.keywords}
                            </span>
                                                );
                                            }
                                        })()}
                                    </div>
                                )}

                            </div>
                        )}

                        {/* 목차 */}
                        {tab === 'toc' && (
                            <div className="max-w-3xl">
                                <h3 className="text-2xl font-serif text-zinc-900 mb-6" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                    목차
                                </h3>
                                {toc.length === 0 ? (
                                    <div className="text-zinc-500">목차 정보가 없습니다.</div>
                                ) : (
                                    <ul className="space-y-3">
                                        {toc
                                            .sort((a, b) => (a.seq ?? 0) - (b.seq ?? 0))
                                            .map((item) => (
                                                <li key={`${item.book_id}-${item.seq}`} className="flex items-start">
                                                    <span className="text-zinc-400 mr-4">{String(item.seq).padStart(2, '0')}</span>
                                                    <span className="text-zinc-700">{item.title}</span>
                                                    {item.page_from && (
                                                        <span className="text-zinc-400 ml-3 text-sm">
                              p.{item.page_from}
                                                            {item.page_to ? `–${item.page_to}` : ''}
                            </span>
                                                    )}
                                                </li>
                                            ))}
                                    </ul>
                                )}
                            </div>
                        )}

                        {/* 저자 소개 */}
                        {tab === 'author' && (
                            <div className="max-w-3xl">
                                <h3 className="text-2xl font-serif text-zinc-900 mb-6" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                    저자 소개
                                </h3>
                                <div className="text-zinc-700 leading-relaxed whitespace-pre-line" style={{ lineHeight: '1.8' }}>
                                    {authorNotes?.author_bio || '저자 소개가 없습니다.'}
                                </div>

                                {authorNotes?.translator_bio && (
                                    <>
                                        <h4 className="text-xl font-serif text-zinc-900 mt-10 mb-4">역자 소개</h4>
                                        <div className="text-zinc-700 leading-relaxed whitespace-pre-line" style={{ lineHeight: '1.8' }}>
                                            {authorNotes.translator_bio}
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {/* 리뷰 */}
                        {tab === 'reviews' && (
                            <div className="max-w-4xl">
                                <div className="flex items-center justify-between mb-8">
                                    <h3 className="text-2xl font-serif text-zinc-900" style={{ fontFamily: "'Noto Serif KR', serif", fontWeight: 500 }}>
                                        독자 리뷰
                                    </h3>
                                    <button className="bg-zinc-900 text-white px-6 py-3 rounded-lg hover:bg-zinc-800 transition-colors text-sm">
                                        리뷰 작성
                                    </button>
                                </div>

                                {reviews.length === 0 ? (
                                    <div className="text-zinc-500">아직 등록된 리뷰가 없습니다.</div>
                                ) : (
                                    <>
                                        <div className="space-y-6">
                                            {reviews.map((rv) => (
                                                <div key={rv.id} className="border-b border-zinc-200 pb-6">
                                                    <div className="flex items-center justify-between mb-3">
                                                        <div className="flex items-center space-x-4">
                                                            <span className="font-medium text-zinc-900">{rv.user_display || '익명'}</span>
                                                            <div className="flex items-center space-x-1">
                                                                {[...Array(5)].map((_, i) => (
                                                                    <Star
                                                                        key={i}
                                                                        className={`w-4 h-4 ${i < (rv.rating ?? 0) ? 'fill-zinc-900 text-zinc-900' : 'text-zinc-300'}`}
                                                                    />
                                                                ))}
                                                            </div>
                                                            <span className="text-sm text-zinc-400">
                                {rv.created_at ? new Date(rv.created_at).toLocaleDateString() : ''}
                              </span>
                                                        </div>
                                                        {Number.isFinite(rv.helpful_count) && (
                                                            <button className="text-sm text-zinc-500 hover:text-zinc-900">
                                                                도움됨 {rv.helpful_count}
                                                            </button>
                                                        )}
                                                    </div>
                                                    {rv.title && <div className="font-medium text-zinc-900 mb-1">{rv.title}</div>}
                                                    <p className="text-zinc-700 leading-relaxed whitespace-pre-line">{rv.content}</p>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="mt-10 flex justify-center">
                                            {rvHasMore ? (
                                                <button
                                                    onClick={loadMoreReviews}
                                                    className="px-8 py-3 border border-zinc-900 text-zinc-900 hover:bg-zinc-900 hover:text-white transition-colors text-sm tracking-wider font-light"
                                                >
                                                    리뷰 더보기
                                                </button>
                                            ) : (
                                                <div className="text-zinc-400 text-sm">모든 리뷰를 다 보셨습니다</div>
                                            )}
                                        </div>
                                    </>
                                )}
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
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                1987년부터 이어온<br />문학의 전통
                            </p>
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

export default BookDetailPage;

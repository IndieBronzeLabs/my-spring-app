import React, { useState } from 'react';
import {
    Star, ShoppingCart, Search, Heart, TrendingUp, Zap, Package,
    ChevronLeft, ChevronRight, Tag, Percent, Gift, Flame, Award,
    Home, User, Menu, X
} from 'lucide-react';

// ============ MOCK ROUTER (간단한 페이지 전환) ============
// 실제로는 react-router-dom 사용하면 됩니다
const StellarUniversalisShop = () => {
    const [currentPage, setCurrentPage] = useState('home');
    const [currentCharacter, setCurrentCharacter] = useState(0);
    const [cartCount, setCartCount] = useState(3);
    const [selectedProduct, setSelectedProduct] = useState(null);

    // 페이지 전환 함수
    const navigateTo = (page, productId = null) => {
        if (productId) {
            setSelectedProduct(products.find(p => p.id === productId));
        }
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    // ----------------------------- DATA -----------------------------
    const characters = [
        {
            id: 1,
            name: 'Violet Nocturne',
            class: 'Dark Mage',
            element: 'Dark',
            rarity: 5,
            description: '별빛 도서관의 수호자. 꿈과 현실을 넘나드는 신비로운 마법사로, 밤하늘의 비밀을 간직하고 있습니다.',
            background: 'linear-gradient(135deg, #0f172a 0%, #312e81 40%, #7c3aed 80%)',
            characterImage: '/images/violet_upper_3.png',
            mainColor: '#8B5CF6',
            emoji: '🌙',
            newProducts: 12,
            totalProducts: 48,
            fanCount: '15.2K'
        },
        {
            id: 2,
            name: 'Aurelius Rex',
            class: 'Holy Knight',
            element: 'Light',
            rarity: 5,
            description: '황금 왕국의 전설적인 기사단장. 정의와 명예를 상징하며, 빛의 검으로 우주를 수호합니다.',
            background: 'linear-gradient(135deg, #1f1500 0%, #7a5a00 40%, #ffd700 85%)',
            characterImage: '/images/aurelius_upper_3.png',
            mainColor: '#F59E0B',
            emoji: '☀️',
            newProducts: 9,
            totalProducts: 56,
            fanCount: '18.7K'
        },
        {
            id: 3,
            name: 'Astral Wanderer',
            class: 'Quantum Explorer',
            element: 'Quantum',
            rarity: 4,
            description: '시공간을 여행하는 탐험가. 미지의 세계를 탐험하며 우주의 신비를 밝혀냅니다.',
            background: 'linear-gradient(135deg, #001e1e 0%, #007b7b 45%, #40e0d0 90%)',
            characterImage: '/images/aurelius_upper_3.png',
            mainColor: '#06B6D4',
            emoji: '⭐',
            newProducts: 15,
            totalProducts: 42,
            fanCount: '12.9K'
        }
    ];

    const products = [
        {
            id: 1,
            name: 'Violet Nocturne 1/7 스케일 피규어',
            character: 'Violet Nocturne',
            category: '피규어',
            price: 189000,
            originalPrice: 249000,
            discount: 24,
            image: '🎨',
            tag: 'HOT',
            rating: 4.9,
            reviews: 234,
            stock: 15,
            description: '디테일한 조형미가 돋보이는 프리미엄 피규어. 한정 수량으로 제작되었습니다.',
            detailImages: ['🎨', '🖼️', '🎭']
        },
        {
            id: 2,
            name: 'Aurelius Rex 프리미엄 티셔츠',
            character: 'Aurelius Rex',
            category: '의류',
            price: 39900,
            originalPrice: 49900,
            discount: 20,
            image: '👕',
            tag: 'NEW',
            rating: 4.8,
            reviews: 567,
            stock: 142,
            description: '편안한 착용감의 고급 면 소재 티셔츠',
            detailImages: ['👕', '👔', '🎽']
        },
        {
            id: 3,
            name: 'Astral Wanderer 아크릴 스탠드',
            character: 'Astral Wanderer',
            category: '굿즈',
            price: 15000,
            originalPrice: 20000,
            discount: 25,
            image: '🎭',
            tag: 'SALE',
            rating: 4.7,
            reviews: 892,
            stock: 89,
            description: '책상 위를 빛내줄 아크릴 스탠드',
            detailImages: ['🎭', '🎪', '🎨']
        },
        {
            id: 4,
            name: 'Violet 마법서 아트북',
            character: 'Violet Nocturne',
            category: '아트북',
            price: 35000,
            image: '📚',
            tag: 'NEW',
            rating: 4.9,
            reviews: 445,
            stock: 67,
            description: '캐릭터 디자인과 스토리가 담긴 공식 아트북',
            detailImages: ['📚', '📖', '📕']
        },
        {
            id: 5,
            name: 'Aurelius 황금검 키링',
            character: 'Aurelius Rex',
            category: '악세서리',
            price: 12000,
            originalPrice: 15000,
            discount: 20,
            image: '🗡️',
            tag: 'BEST',
            rating: 4.6,
            reviews: 1203,
            stock: 234,
            description: '정교한 디테일의 미니어처 키링',
            detailImages: ['🗡️', '⚔️', '🔱']
        },
        {
            id: 6,
            name: 'Wanderer 우주 후드집업',
            character: 'Astral Wanderer',
            category: '의류',
            price: 69000,
            originalPrice: 89000,
            discount: 22,
            image: '🧥',
            tag: 'HOT',
            rating: 4.8,
            reviews: 334,
            stock: 45,
            description: '따뜻하고 스타일리시한 후드집업',
            detailImages: ['🧥', '🧤', '🎽']
        }
    ];

    const categories = [
        { name: '피규어', icon: '🎨', count: 24 },
        { name: '의류', icon: '👕', count: 48 },
        { name: '악세서리', icon: '💍', count: 36 },
        { name: '아트북', icon: '📚', count: 12 },
        { name: '디지털', icon: '💎', count: 18 }
    ];

    const currentChar = characters[currentCharacter];

    // ============ 페이지 컴포넌트들 ============

    // 홈 페이지
    const HomePage = () => (
        <div className="space-y-8 pb-12">
            {/* Hero Section */}
            <section className="hover-glow bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                            <div
                                className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg text-3xl"
                                style={{ background: `linear-gradient(135deg, ${currentChar.mainColor}33, ${currentChar.mainColor}77)` }}
                            >
                                {currentChar.emoji}
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">{currentChar.name}</h1>
                                <p className="text-sm" style={{ color: currentChar.mainColor }}>{currentChar.class}</p>
                            </div>
                            <div className="flex items-center gap-1 ml-auto">
                                {Array.from({ length: currentChar.rarity }).map((_, i) => (
                                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                                ))}
                            </div>
                        </div>

                        <p className="text-gray-300 text-sm leading-relaxed mb-6">
                            {currentChar.description}
                        </p>

                        <div className="flex gap-4 mb-6">
                            <div className="bg-black/30 rounded-lg px-4 py-2 border border-white/10">
                                <div className="text-xs text-gray-400">신상품</div>
                                <div className="text-xl font-bold text-white">{currentChar.newProducts}</div>
                            </div>
                            <div className="bg-black/30 rounded-lg px-4 py-2 border border-white/10">
                                <div className="text-xs text-gray-400">전체 상품</div>
                                <div className="text-xl font-bold text-white">{currentChar.totalProducts}</div>
                            </div>
                            <div className="bg-black/30 rounded-lg px-4 py-2 border border-white/10">
                                <div className="text-xs text-gray-400">팬 수</div>
                                <div className="text-xl font-bold" style={{ color: currentChar.mainColor }}>{currentChar.fanCount}</div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={() => navigateTo('shop')}
                                className="flex-1 py-3 rounded-xl text-white font-medium transition-all hover:scale-[1.02]"
                                style={{ background: `linear-gradient(90deg, ${currentChar.mainColor}, ${currentChar.mainColor}aa)` }}
                            >
                                <Package className="w-5 h-5 inline mr-2" />
                                전체 상품 보기
                            </button>
                            <button className="px-5 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors">
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Hot Products */}
            <section>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Flame className="w-6 h-6 text-orange-500" />
                        인기 상품
                    </h2>
                    <button
                        onClick={() => navigateTo('shop')}
                        className="text-sm text-white/70 hover:text-white transition-colors"
                    >
                        전체보기 →
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.slice(0, 6).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onClick={() => navigateTo('product', product.id)}
                        />
                    ))}
                </div>
            </section>
        </div>
    );

    // 상품 목록 페이지
    const ShopPage = () => (
        <div className="space-y-6 pb-12">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-white">전체 상품</h1>
                <select className="bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white text-sm">
                    <option>최신순</option>
                    <option>인기순</option>
                    <option>낮은 가격순</option>
                    <option>높은 가격순</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onClick={() => navigateTo('product', product.id)}
                    />
                ))}
            </div>
        </div>
    );

    // 상품 상세 페이지
    const ProductDetailPage = () => {
        const [quantity, setQuantity] = useState(1);

        if (!selectedProduct) return <div className="text-white">상품을 찾을 수 없습니다.</div>;

        return (
            <div className="space-y-8 pb-12">
                <button
                    onClick={() => navigateTo('shop')}
                    className="text-white/70 hover:text-white flex items-center gap-2"
                >
                    ← 목록으로
                </button>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* 상품 이미지 */}
                    <div className="space-y-4">
                        <div className="aspect-square bg-gradient-to-br from-white/10 to-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                            <span className="text-9xl">{selectedProduct.image}</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {selectedProduct.detailImages.map((img, i) => (
                                <div key={i} className="aspect-square bg-white/5 rounded-lg flex items-center justify-center border border-white/10">
                                    <span className="text-3xl">{img}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 상품 정보 */}
                    <div className="space-y-6">
                        <div>
                            <div className="text-sm text-white/60 mb-2">{selectedProduct.character}</div>
                            <h1 className="text-3xl font-bold text-white mb-4">{selectedProduct.name}</h1>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="flex items-center gap-1">
                                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                                    <span className="text-lg text-white font-medium">{selectedProduct.rating}</span>
                                </div>
                                <span className="text-white/50">리뷰 {selectedProduct.reviews}개</span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            {selectedProduct.originalPrice && (
                                <div className="text-gray-500 line-through text-lg mb-1">
                                    {selectedProduct.originalPrice.toLocaleString()}원
                                </div>
                            )}
                            <div className="flex items-center gap-3">
                                {selectedProduct.discount && (
                                    <span className="text-2xl font-bold text-red-400">{selectedProduct.discount}%</span>
                                )}
                                <span className="text-4xl font-bold text-white">
                                    {selectedProduct.price.toLocaleString()}원
                                </span>
                            </div>
                        </div>

                        <div className="border-t border-white/10 pt-6 space-y-4">
                            <div>
                                <div className="text-sm text-white/70 mb-2">수량</div>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="w-10 h-10 bg-white/10 rounded-lg hover:bg-white/20 text-white"
                                    >
                                        -
                                    </button>
                                    <span className="text-white text-lg font-medium w-12 text-center">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(quantity + 1)}
                                        className="w-10 h-10 bg-white/10 rounded-lg hover:bg-white/20 text-white"
                                    >
                                        +
                                    </button>
                                    <span className="text-white/50 text-sm ml-auto">재고: {selectedProduct.stock}개</span>
                                </div>
                            </div>

                            <div className="text-right">
                                <div className="text-sm text-white/60 mb-1">총 상품 금액</div>
                                <div className="text-3xl font-bold text-white">
                                    {(selectedProduct.price * quantity).toLocaleString()}원
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-6">
                            <button
                                onClick={() => navigateTo('cart')}
                                className="flex-1 py-4 bg-white/10 hover:bg-white/20 rounded-xl text-white font-medium transition-all"
                            >
                                장바구니
                            </button>
                            <button
                                onClick={() => navigateTo('checkout')}
                                className="flex-1 py-4 rounded-xl text-white font-medium transition-all"
                                style={{ background: `linear-gradient(90deg, ${currentChar.mainColor}, ${currentChar.mainColor}aa)` }}
                            >
                                바로구매
                            </button>
                        </div>

                        <div className="border-t border-white/10 pt-6">
                            <h3 className="text-white font-medium mb-3">상품 설명</h3>
                            <p className="text-white/70 leading-relaxed">{selectedProduct.description}</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // 장바구니 페이지
    const CartPage = () => {
        const [cartItems] = useState([
            { ...products[0], quantity: 2 },
            { ...products[1], quantity: 1 }
        ]);

        const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        return (
            <div className="space-y-6 pb-12">
                <h1 className="text-3xl font-bold text-white">장바구니</h1>

                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-4">
                        {cartItems.map((item) => (
                            <div key={item.id} className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                                <div className="flex gap-4">
                                    <div className="w-24 h-24 bg-white/5 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-4xl">{item.image}</span>
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="text-white font-medium mb-1">{item.name}</h3>
                                        <div className="text-sm text-white/60 mb-3">{item.character}</div>
                                        <div className="flex items-center gap-3">
                                            <button className="w-8 h-8 bg-white/10 rounded-lg text-white">-</button>
                                            <span className="text-white">{item.quantity}</span>
                                            <button className="w-8 h-8 bg-white/10 rounded-lg text-white">+</button>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-xl font-bold text-white mb-2">
                                            {(item.price * item.quantity).toLocaleString()}원
                                        </div>
                                        <button className="text-sm text-red-400 hover:text-red-300">삭제</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 sticky top-6">
                            <h3 className="text-white font-medium mb-4">주문 요약</h3>
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-white/70">
                                    <span>상품 금액</span>
                                    <span>{totalPrice.toLocaleString()}원</span>
                                </div>
                                <div className="flex justify-between text-white/70">
                                    <span>배송비</span>
                                    <span>3,000원</span>
                                </div>
                                <div className="border-t border-white/10 pt-3">
                                    <div className="flex justify-between text-white text-xl font-bold">
                                        <span>총 결제 금액</span>
                                        <span>{(totalPrice + 3000).toLocaleString()}원</span>
                                    </div>
                                </div>
                            </div>
                            <button
                                onClick={() => navigateTo('checkout')}
                                className="w-full py-4 rounded-xl text-white font-medium"
                                style={{ background: `linear-gradient(90deg, ${currentChar.mainColor}, ${currentChar.mainColor}aa)` }}
                            >
                                주문하기
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    // 결제 페이지
    const CheckoutPage = () => (
        <div className="space-y-6 pb-12 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-white">주문/결제</h1>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl text-white font-medium mb-4">배송 정보</h2>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-white/70 mb-2">이름</label>
                        <input
                            type="text"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                            placeholder="이름을 입력하세요"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-white/70 mb-2">전화번호</label>
                        <input
                            type="tel"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                            placeholder="010-0000-0000"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-white/70 mb-2">주소</label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                className="w-32 bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                                placeholder="우편번호"
                            />
                            <button className="px-4 py-3 bg-white/10 hover:bg-white/20 rounded-lg text-white">
                                주소검색
                            </button>
                        </div>
                        <input
                            type="text"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white mb-2"
                            placeholder="기본 주소"
                        />
                        <input
                            type="text"
                            className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white"
                            placeholder="상세 주소"
                        />
                    </div>
                </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl text-white font-medium mb-4">결제 수단</h2>
                <div className="space-y-3">
                    <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10">
                        <input type="radio" name="payment" className="w-4 h-4" />
                        <span className="text-white">신용/체크카드</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10">
                        <input type="radio" name="payment" className="w-4 h-4" />
                        <span className="text-white">카카오페이</span>
                    </label>
                    <label className="flex items-center gap-3 p-4 bg-white/5 rounded-lg cursor-pointer hover:bg-white/10">
                        <input type="radio" name="payment" className="w-4 h-4" />
                        <span className="text-white">무통장입금</span>
                    </label>
                </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl text-white font-medium mb-4">최종 결제 금액</h2>
                <div className="text-4xl font-bold text-white text-right">
                    242,900원
                </div>
            </div>

            <button
                onClick={() => {
                    alert('결제가 완료되었습니다!');
                    navigateTo('mypage');
                }}
                className="w-full py-5 rounded-xl text-white text-lg font-bold"
                style={{ background: `linear-gradient(90deg, ${currentChar.mainColor}, ${currentChar.mainColor}aa)` }}
            >
                결제하기
            </button>
        </div>
    );

    // 마이페이지
    const MyPage = () => (
        <div className="space-y-6 pb-12">
            <h1 className="text-3xl font-bold text-white">마이페이지</h1>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="text-white/70 text-sm mb-2">총 주문</div>
                    <div className="text-3xl font-bold text-white">12건</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="text-white/70 text-sm mb-2">총 결제</div>
                    <div className="text-3xl font-bold" style={{ color: currentChar.mainColor }}>1,245,000원</div>
                </div>
                <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                    <div className="text-white/70 text-sm mb-2">포인트</div>
                    <div className="text-3xl font-bold text-yellow-400">24,500P</div>
                </div>
            </div>

            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
                <h2 className="text-xl text-white font-medium mb-4">최근 주문 내역</h2>
                <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                            <div className="w-16 h-16 bg-white/10 rounded-lg flex items-center justify-center">
                                <span className="text-2xl">🎨</span>
                            </div>
                            <div className="flex-1">
                                <div className="text-white font-medium">Violet Nocturne 피규어</div>
                                <div className="text-sm text-white/60">2024.01.15</div>
                            </div>
                            <div className="text-right">
                                <div className="text-white font-medium">189,000원</div>
                                <div className="text-sm text-green-400">배송완료</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // ============ SHARED COMPONENTS ============

    // 상품 카드 컴포넌트
    const ProductCard = ({ product, onClick }) => (
        <div
            onClick={onClick}
            className="product-card bg-white/5 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer"
        >
            <div className="relative aspect-square bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center">
                <span className="text-6xl">{product.image}</span>
                {product.tag && (
                    <div
                        className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold ${
                            product.tag === 'HOT'
                                ? 'bg-red-500 text-white'
                                : product.tag === 'NEW'
                                    ? 'bg-green-500 text-white'
                                    : product.tag === 'BEST'
                                        ? 'bg-yellow-500 text-black'
                                        : 'bg-purple-500 text-white'
                        }`}
                    >
                        {product.tag}
                    </div>
                )}
                {product.discount && (
                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-lg">
                        <span className="text-red-400 font-bold text-sm">-{product.discount}%</span>
                    </div>
                )}
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        alert('찜하기!');
                    }}
                    className="absolute bottom-3 right-3 w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all"
                >
                    <Heart className="w-5 h-5 text-white" />
                </button>
            </div>

            <div className="p-4">
                <div className="text-xs text-white/60 mb-1">{product.character}</div>
                <h3 className="text-white font-medium mb-2 line-clamp-2">{product.name}</h3>

                <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-white">{product.rating}</span>
                    </div>
                    <span className="text-xs text-white/50">({product.reviews})</span>
                </div>

                <div className="mb-3">
                    {product.originalPrice && (
                        <div className="text-xs text-gray-500 line-through">
                            {product.originalPrice.toLocaleString()}원
                        </div>
                    )}
                    <div className="flex items-center gap-2">
                        {product.discount && (
                            <span className="text-red-400 font-bold">{product.discount}%</span>
                        )}
                        <span className="text-xl font-bold text-white">
                            {product.price.toLocaleString()}원
                        </span>
                    </div>
                </div>

                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        alert('장바구니에 담았습니다!');
                        setCartCount(cartCount + 1);
                    }}
                    className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-all flex items-center justify-center gap-2"
                >
                    <ShoppingCart className="w-4 h-4" />
                    장바구니
                </button>
            </div>
        </div>
    );

    // ============ MAIN LAYOUT ============
    return (
        <div className="min-h-screen relative overflow-hidden bg-slate-950">
            {/* Styles */}
            <style>{`
        @keyframes kbPanA {
          0%   { transform: scale(1.03) translate3d(-10px,-4px,0) rotate(-0.2deg); }
          25%  { transform: scale(1.06) translate3d( 10px, 6px,0) rotate( 0.1deg); }
          50%  { transform: scale(1.05) translate3d( 12px,-8px,0) rotate( 0.0deg); }
          75%  { transform: scale(1.06) translate3d( -6px, 8px,0) rotate(-0.1deg); }
          100% { transform: scale(1.03) translate3d(-10px,-4px,0) rotate(-0.2deg); }
        }
        @keyframes kbPanB {
          0%   { transform: scale(1.03) translate3d( 8px,-8px,0) rotate(0.1deg); }
          33%  { transform: scale(1.06) translate3d(-12px, 6px,0) rotate(-0.1deg); }
          66%  { transform: scale(1.05) translate3d(  6px, 8px,0) rotate(0.05deg); }
          100% { transform: scale(1.03) translate3d( 8px,-8px,0) rotate(0.1deg); }
        }
        @keyframes kbPanC {
          0%   { transform: scale(1.03) translate3d(  0px,-8px,0) rotate(0deg); }
          40%  { transform: scale(1.07) translate3d(  0px,10px,0) rotate(0.15deg); }
          70%  { transform: scale(1.05) translate3d( -6px,-4px,0) rotate(-0.1deg); }
          100% { transform: scale(1.03) translate3d(  0px,-8px,0) rotate(0deg); }
        }
        .kb-base { animation-duration: 24s; animation-timing-function: ease-in-out; animation-iteration-count: infinite; will-change: transform; }
        .kb-pan-a { animation-name: kbPanA; }
        .kb-pan-b { animation-name: kbPanB; }
        .kb-pan-c { animation-name: kbPanC; }

        @keyframes driftA { 0%{transform:translate3d(-10px,0,0) scale(1.02);} 50%{transform:translate3d(10px,6px,0) scale(1.04);} 100%{transform:translate3d(-10px,0,0) scale(1.02);} }
        .driftA{animation:driftA 28s ease-in-out infinite;will-change:transform;}

        @keyframes glowRotate {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.05); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes glowDriftX {
          0% { transform: translateX(-12px); }
          50% { transform: translateX(12px); }
          100% { transform: translateX(-12px); }
        }
        .bg-glow-conic {
          position: absolute; inset: -40%;
          background: conic-gradient(from 0deg, rgba(236, 72, 153, .22), rgba(99, 102, 241, .22), rgba(34, 211, 238, .22), rgba(236, 72, 153, .22));
          filter: blur(120px);
          animation: glowRotate 38s linear infinite;
          pointer-events: none;
          mix-blend-mode: screen;
        }
        .bg-glow-oval {
          position: absolute; width: 34rem; height: 34rem; border-radius: 9999px;
          filter: blur(90px); pointer-events: none; opacity: .28; mix-blend-mode: screen;
        }
        .bg-glow-oval.a { left: 8%; top: 12%;
          background: radial-gradient(closest-side, rgba(168,85,247,.45), transparent 70%);
          animation: glowDriftX 24s ease-in-out infinite;
        }
        .bg-glow-oval.b { right: 10%; bottom: 14%;
          background: radial-gradient(closest-side, rgba(20,184,166,.45), transparent 70%);
          animation: glowDriftX 30s ease-in-out infinite reverse;
        }

        .hover-glow { position: relative; overflow: hidden; transition: box-shadow .35s ease, transform .2s ease; }
        .hover-glow:hover { box-shadow: 0 0 32px rgba(255,255,255,.12); transform: translateY(-2px); }
        .product-card { transition: all .3s ease; }
        .product-card:hover { transform: translateY(-4px); box-shadow: 0 12px 40px rgba(0,0,0,.4); }

        @media (prefers-reduced-motion: reduce) { 
          .kb-base,.driftA,.bg-glow-conic,.bg-glow-oval { animation: none !important; transform: none !important; } 
        }
      `}</style>

            {/* Background */}
            <div className="absolute inset-0" style={{ background: currentChar.background }}>
                <div className="bg-glow-conic" />
                <div className="bg-glow-oval a" />
                <div className="bg-glow-oval b" />

                <div className={`absolute inset-0 kb-base ${['kb-pan-a', 'kb-pan-b', 'kb-pan-c'][currentCharacter % 3]}`}>
                    <img
                        src={currentChar.characterImage}
                        alt={currentChar.name}
                        className="w-full h-full object-cover opacity-100 select-none pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/60" />
                </div>

                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute w-40 h-40 rounded-full opacity-25 driftA"
                        style={{
                            left: '18%', top: '18%',
                            background: `radial-gradient(circle, ${currentChar.mainColor}33, transparent)`,
                            filter: 'blur(24px)'
                        }}
                    />
                    <div
                        className="absolute w-28 h-28 rounded-full opacity-20 driftA"
                        style={{
                            right: '12%', top: '62%',
                            background: `radial-gradient(circle, ${currentChar.mainColor}44, transparent)`,
                            filter: 'blur(20px)', animationDelay: '1.5s'
                        }}
                    />
                </div>
            </div>

            {/* Header */}
            <header className="relative z-20 bg-black/20 backdrop-blur-xl border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-8">
                            <button onClick={() => navigateTo('home')} className="flex items-center gap-3">
                                <div className="relative">
                                    <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                                        <Star className="w-6 h-6 text-white" />
                                    </div>
                                    <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_10px_rgba(250,204,21,.9)]" />
                                </div>
                                <div>
                                    <div className="text-white font-bold text-lg leading-tight">Stellar Universalis</div>
                                    <div className="text-white/60 text-xs">Official Shop</div>
                                </div>
                            </button>

                            <nav className="hidden md:flex items-center gap-6">
                                {[
                                    { label: '홈', page: 'home' },
                                    { label: '상품', page: 'shop' },
                                    { label: '장바구니', page: 'cart' },
                                    { label: '마이페이지', page: 'mypage' }
                                ].map(({ label, page }) => (
                                    <button
                                        key={page}
                                        onClick={() => navigateTo(page)}
                                        className={`text-sm font-medium transition-all relative ${
                                            currentPage === page ? 'text-white' : 'text-white/80 hover:text-white'
                                        }`}
                                    >
                                        {label}
                                        {currentPage === page && (
                                            <div
                                                className="absolute -bottom-2 left-0 right-0 h-0.5 rounded-full"
                                                style={{ background: currentChar.mainColor }}
                                            />
                                        )}
                                    </button>
                                ))}
                            </nav>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/10">
                                <Search className="w-4 h-4 text-white/60" />
                                <input
                                    type="text"
                                    placeholder="상품 검색..."
                                    className="bg-transparent border-none outline-none text-white text-sm placeholder-white/50 w-40"
                                />
                            </div>

                            <button
                                onClick={() => navigateTo('cart')}
                                className="relative hover-glow px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg text-white hover:bg-white/20 transition-all"
                            >
                                <ShoppingCart className="w-5 h-5" />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center font-bold">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            <button
                                onClick={() => navigateTo('mypage')}
                                className="hover-glow px-4 py-2 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white font-medium shadow-lg"
                            >
                                <User className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="relative z-10">
                <div className="max-w-7xl mx-auto px-6 py-8">
                    {/* Page Router */}
                    {currentPage === 'home' && <HomePage />}
                    {currentPage === 'shop' && <ShopPage />}
                    {currentPage === 'product' && <ProductDetailPage />}
                    {currentPage === 'cart' && <CartPage />}
                    {currentPage === 'checkout' && <CheckoutPage />}
                    {currentPage === 'mypage' && <MyPage />}
                </div>
            </div>

            {/* Right Sidebar - 홈과 상품 페이지에만 표시 */}
            {(currentPage === 'home' || currentPage === 'shop') && (
                <aside className="fixed right-0 top-20 w-80 h-[calc(100vh-5rem)] overflow-y-auto p-6 space-y-6 z-30 hidden xl:block">
                    {/* Character Switcher */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-white font-medium">캐릭터 선택</h3>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => setCurrentCharacter((p) => (p - 1 + characters.length) % characters.length)}
                                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all"
                                >
                                    <ChevronLeft className="w-4 h-4 text-white" />
                                </button>
                                <button
                                    onClick={() => setCurrentCharacter((p) => (p + 1) % characters.length)}
                                    className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-all"
                                >
                                    <ChevronRight className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            {characters.map((char, idx) => (
                                <button
                                    key={char.id}
                                    onClick={() => setCurrentCharacter(idx)}
                                    className={`flex-1 h-20 rounded-lg border-2 transition-all ${
                                        idx === currentCharacter
                                            ? 'border-white shadow-lg'
                                            : 'border-white/20 hover:border-white/40'
                                    }`}
                                    style={{ backgroundColor: `${char.mainColor}20` }}
                                >
                                    <div className="h-full flex flex-col items-center justify-center">
                                        <div className="text-2xl mb-1">{char.emoji}</div>
                                        <div className="text-[10px] text-white/90 leading-tight">{char.class}</div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                        <h3 className="text-white font-medium mb-4">카테고리</h3>
                        <div className="space-y-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat.name}
                                    onClick={() => navigateTo('shop')}
                                    className="w-full flex items-center justify-between p-3 bg-white/5 hover:bg-white/10 rounded-lg transition-all"
                                >
                                    <div className="flex items-center gap-3">
                                        <span className="text-xl">{cat.icon}</span>
                                        <span className="text-white text-sm">{cat.name}</span>
                                    </div>
                                    <span className="text-white/50 text-xs">{cat.count}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Special Offers */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                        <h3 className="text-white font-medium mb-4 flex items-center">
                            <Percent className="w-5 h-5 mr-2" style={{ color: currentChar.mainColor }} />
                            특별 할인
                        </h3>
                        <div className="space-y-3">
                            <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-xl p-3 border border-red-500/30">
                                <div className="text-red-400 font-bold text-sm mb-1">🔥 타임딜</div>
                                <div className="text-white text-xs mb-2">전 상품 최대 30% 할인</div>
                                <div className="text-white/70 text-xs">23:45:12 남음</div>
                            </div>
                            <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-3 border border-purple-500/30">
                                <div className="text-purple-400 font-bold text-sm mb-1">✨ 신규회원</div>
                                <div className="text-white text-xs">첫 구매 20% 추가할인</div>
                            </div>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                        <h3 className="text-white font-medium mb-4">실시간 현황</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">오늘 방문자</span>
                                <span className="text-white font-medium">8,492명</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">현재 접속</span>
                                <span className="text-green-400 font-medium">🔴 1,247명</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-400 text-sm">오늘 판매</span>
                                <span className="text-white font-medium">324개</span>
                            </div>
                        </div>
                    </div>
                </aside>
            )}
        </div>
    );
};

export default StellarUniversalisShop;